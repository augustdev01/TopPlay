import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { competitionSchema } from "@/lib/validations/schemas";
import { mapCompetition } from "@/lib/mappers/mappers";

export async function GET() {
  try {
    const competitions = await prisma.competition.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        players: {
          select: {
            votesConfirmed: true,
          },
        },
      },
    });

    /* const enrichedCompetitions = competitions.map(comp => {
      const totalVotes = comp.players.reduce((acc, player) => acc + player.votesConfirmed, 0);
      return {
        ...comp,
        playersCount: comp.players.length,
        totalVotes,
        revenue: totalVotes * comp.votePrice
      };
    });
 */
    const enrichedCompetitions = competitions.map((comp: any) =>
      mapCompetition(comp)
    );

    return NextResponse.json(enrichedCompetitions);
  } catch (error) {
    console.error("Erreur récupération compétitions admin:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = competitionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validation.error.format() },
        { status: 400 }
      );
    }

    const existingCompetition = await prisma.competition.findUnique({
      where: { slug: validation.data.slug },
    });

    if (existingCompetition) {
      return NextResponse.json(
        { error: "Ce slug existe déjà" },
        { status: 400 }
      );
    }

    const competition = await prisma.competition.create({
      data: {
        ...validation.data,
        startDate: validation.data.startDate
          ? new Date(validation.data.startDate)
          : null,
        endDate: validation.data.endDate
          ? new Date(validation.data.endDate)
          : null,
      },
    });

    return NextResponse.json(competition, { status: 201 });
  } catch (error) {
    console.error("Erreur création compétition:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
