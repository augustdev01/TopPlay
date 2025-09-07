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
            id: true,
            slug: true,
            firstName: true,
            lastName: true,
            age: true,
            team: true,
            position: true,
            bio: true,
            photoUrl: true,
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
