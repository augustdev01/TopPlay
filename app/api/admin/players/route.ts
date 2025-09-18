import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { playerSchema } from "@/lib/validations/schemas";
import { mapPlayer } from "@/lib/mappers/mappers";
import { Player } from "@prisma/client";
export async function GET() {
  try {
    const players = await prisma.player.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        competition: {
          select: {
            name: true,
            slug: true,
            status: true,
            votePrice: true,
          },
        },
      },
    });

    /*  const enrichedPlayers = players.map((player) => ({
      ...player,
      competitionName: player.competition.name,
      competitionSlug: player.competition.slug,
      competitionStatus: player.competition.status,
      revenue: player.votesConfirmed * player.competition.votePrice,
    })); */

    const enrichedPlayers = players.map(
      (
        p: Player & {
          competition: {
            name: string;
            slug: string;
            status: string;
            votePrice: number;
          };
        }
      ) => mapPlayer(p)
    );

    return NextResponse.json(enrichedPlayers);
  } catch (error) {
    console.error("Erreur récupération joueurs admin:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

/* export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = playerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validation.error.format() },
        { status: 400 }
      );
    }

    const competition = await prisma.competition.findUnique({
      where: { id: body.competitionId },
    });

    if (!competition) {
      return NextResponse.json(
        { error: "Compétition non trouvée" },
        { status: 404 }
      );
    }

    const existingPlayer = await prisma.player.findFirst({
      where: {
        competitionId: body.competitionId,
        slug: validation.data.slug,
      },
    });

    if (existingPlayer) {
      return NextResponse.json(
        { error: "Ce slug existe déjà dans cette compétition" },
        { status: 400 }
      );
    }

    const player = await prisma.player.create({
      data: {
        ...validation.data,
        competitionId: body.competitionId,
      },
    });

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error("Erreur création joueur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
} */

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("photo") as File | null;

    const entries = Array.from(formData.entries()).filter(
      ([, v]) => !(v instanceof File)
    );
    const body = Object.fromEntries(entries) as Record<string, string>;

    const validation = playerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validation.error.format() },
        { status: 400 }
      );
    }
    const data = validation.data;

    let photoBuffer: Buffer | null = null;
    if (file) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Le fichier doit être une image" },
          { status: 415 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      if (arrayBuffer.byteLength > MAX_IMAGE_BYTES) {
        return NextResponse.json(
          { error: "Image trop volumineuse (max 5MB)" },
          { status: 413 }
        );
      }

      photoBuffer = Buffer.from(arrayBuffer);
    }

    const competition = await prisma.competition.findUnique({
      where: { id: data.competitionId },
    });
    if (!competition)
      return NextResponse.json(
        { error: "Compétition non trouvée" },
        { status: 404 }
      );

    const existing = await prisma.player.findFirst({
      where: { competitionId: data.competitionId, slug: data.slug },
      select: { id: true },
    });
    if (existing)
      return NextResponse.json(
        { error: "Ce slug existe déjà" },
        { status: 409 }
      );

    const player = await prisma.player.create({
      data: {
        ...data,
        competitionId: data.competitionId,
        photo: photoBuffer,
      },
    });

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error("Erreur création joueur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const playerId = searchParams.get("id");

    if (!playerId) {
      return NextResponse.json(
        { error: "ID du joueur requis" },
        { status: 400 }
      );
    }

    // Vérifier si le joueur existe
    const player = await prisma.player.findUnique({
      where: { id: playerId },
      select: { id: true, photo: true },
    });

    if (!player) {
      return NextResponse.json({ error: "Joueur non trouvé" }, { status: 404 });
    }

    const orders = await prisma.order.findMany({
      where: { playerId },
      select: { id: true },
    });
    const orderIds = orders.map((o) => o.id);

    await prisma.$transaction([
      prisma.transaction.deleteMany({ where: { orderId: { in: orderIds } } }),
      prisma.order.deleteMany({ where: { id: { in: orderIds } } }),
      prisma.player.delete({ where: { id: playerId } }),
    ]);

    return NextResponse.json(
      { message: "Joueur supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur suppression joueur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
