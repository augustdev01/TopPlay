import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { mapCompetition } from "@/lib/mappers/mappers";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const competition = await prisma.competition.findUnique({
      where: { slug },
      include: {
        players: {
          select: {
            votesConfirmed: true,
            votesPending: true,
            id: true,
            slug: true,
            firstName: true,
            lastName: true,
            age: true,
            team: true,
            position: true,
            bio: true,
            photo: true, // ✅ c’est le buffer stocké dans Postgres
            competitionId: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!competition) {
      return NextResponse.json(
        { error: "Compétition non trouvée" },
        { status: 404 }
      );
    }

    const enriched = mapCompetition(competition);
    return NextResponse.json(enriched);
  } catch (error) {
    console.error("Erreur récupération compétition :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const competition = await prisma.competition.findUnique({
      where: { slug: params.slug },
    });

    if (!competition) {
      return NextResponse.json(
        { error: "Compétition non trouvée" },
        { status: 404 }
      );
    }

    // 1. Supprimer les transactions liées aux orders de cette compétition
    await prisma.transaction.deleteMany({
      where: {
        order: {
          player: {
            competitionId: competition.id,
          },
        },
      },
    });

    // 2. Supprimer les orders liés
    await prisma.order.deleteMany({
      where: {
        player: {
          competitionId: competition.id,
        },
      },
    });

    // 3. Supprimer les joueurs liés
    await prisma.player.deleteMany({
      where: { competitionId: competition.id },
    });

    // 4. Supprimer la compétition
    await prisma.competition.delete({
      where: { id: competition.id },
    });

    return NextResponse.json({
      message: `Compétition '${competition.name}' supprimée avec succès`,
    });
  } catch (error) {
    console.error("Erreur suppression compétition:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
