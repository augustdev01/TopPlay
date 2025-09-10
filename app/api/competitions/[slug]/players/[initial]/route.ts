// app/api/competitions/[slug]/players/[playerSlug]/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string; playerSlug: string } }
) {
  try {
    const { slug, playerSlug } = params;

    // 1) Vérifier la compétition
    const competition = await prisma.competition.findUnique({
      where: { slug },
      select: { id: true, name: true, slug: true },
    });

    if (!competition) {
      return NextResponse.json(
        { error: "Compétition non trouvée" },
        { status: 404 }
      );
    }

    // 2) Récupérer le joueur pour cette compétition
    const player = await prisma.player.findFirst({
      where: {
        slug: playerSlug,
        competitionId: competition.id,
      },
      select: {
        id: true,
        slug: true,
        firstName: true,
        lastName: true,
        team: true,
        position: true,
        photoUrl: true,
        votesConfirmed: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!player) {
      return NextResponse.json(
        { error: "Joueur introuvable" },
        { status: 404 }
      );
    }

    // 3) Calculer le total des votes de la compétition
    const agg = await prisma.player.aggregate({
      where: { competitionId: competition.id },
      _sum: { votesConfirmed: true },
    });
    const totalVotes = agg._sum.votesConfirmed ?? 0;

    // 4) Calculer le pourcentage du joueur
    const percentage =
      totalVotes > 0 ? (player.votesConfirmed / totalVotes) * 100 : 0;

    // 5) Construire la réponse (on ajoute _id string pour rester compatible si frontend attend _id)
    const responseBody = {
      _id: String(player.id),
      id: player.id,
      slug: player.slug,
      firstName: player.firstName,
      lastName: player.lastName,
      team: player.team,
      position: player.position,
      photoUrl: player.photoUrl,
      votesConfirmed: player.votesConfirmed,
      percentage: Number(percentage.toFixed(2)),
      competition: {
        id: competition.id,
        name: competition.name,
        slug: competition.slug,
        totalVotes,
      },
    };

    return NextResponse.json(responseBody, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=5", // ajuste si besoin
      },
    });
  } catch (error) {
    console.error("Erreur GET player:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
