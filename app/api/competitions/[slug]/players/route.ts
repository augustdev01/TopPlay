import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { mapPlayer } from "@/lib/mappers/mappers";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Récupérer la compétition
    const competition = await prisma.competition.findUnique({
      where: { slug },
      select: { id: true, votePrice: true },
    });

    if (!competition) {
      return NextResponse.json(
        { error: "Compétition non trouvée" },
        { status: 404 }
      );
    }

    // Récupérer les joueurs de cette compétition
    const players = await prisma.player.findMany({
      where: { competitionId: competition.id },
      include: {
        competition: {
          select: { name: true, slug: true, status: true, votePrice: true },
        },
      },
      orderBy: { votesConfirmed: "desc" },
    });

    // Mapper les données pour ajouter revenue, competitionName, etc.
    const enrichedPlayers = players.map((p) => mapPlayer(p));

    return NextResponse.json(enrichedPlayers);
  } catch (error) {
    console.error("Erreur récupération joueurs:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
