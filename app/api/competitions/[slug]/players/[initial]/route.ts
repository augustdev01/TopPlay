// app/api/competitions/[slug]/players/[playerSlug]/route.ts
import { prisma } from "@/lib/db";
import { mapPlayer } from "@/lib/mappers/mappers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string; playerSlug: string } }
) {
  try {
    const { slug, playerSlug } = params;

    // 1) Vérifier la compétition avec les joueurs
    const competition = await prisma.competition.findUnique({
      where: { slug },
      include: {
        players: {
          where: { slug: playerSlug },
          select: {
            id: true,
            slug: true,
            firstName: true,
            lastName: true,
            age: true,
            team: true,
            position: true,
            bio: true,
            photo: true,
            votesConfirmed: true,
            votesPending: true,
            createdAt: true,
            updatedAt: true,
            competitionId: true,
          },
        },
      },
    });

    if (!competition || competition.players.length === 0) {
      return NextResponse.json(
        { error: "Joueur ou compétition introuvable" },
        { status: 404 }
      );
    }

    // 2) Mapper le joueur pour générer photoUrl
    const player = mapPlayer({
      ...competition.players[0],
      competition: {
        name: competition.name,
        slug: competition.slug,
        status: competition.status, // ou la valeur réelle si tu l'as
        votePrice: competition.votePrice, // si nécessaire, ou récupère depuis la compétition
      },
    });

    // 3) Calculer le total des votes de la compétition
    const totalVotes = competition.players.reduce(
      (acc, p) => acc + p.votesConfirmed,
      0
    );

    const percentage =
      totalVotes > 0 ? (player.votesConfirmed / totalVotes) * 100 : 0;

    const responseBody = {
      ...player,
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
      headers: { "Cache-Control": "public, max-age=5" },
    });
  } catch (error) {
    console.error("Erreur GET player:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
