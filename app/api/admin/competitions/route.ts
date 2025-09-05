import { NextResponse } from 'next/server';
import { db, competitions } from '@/lib/db';
import { competitionSchema } from '@/lib/validations/schemas';

export async function GET() {
  try {
    const allCompetitions = await db.query.competitions.findMany({
      orderBy: (competitions, { desc }) => [desc(competitions.createdAt)],
      with: {
        players: {
          columns: {
            votesConfirmed: true,
          }
        }
      }
    });

    const enrichedCompetitions = allCompetitions.map(comp => ({
      ...comp,
      playersCount: comp.players.length,
      totalVotes: comp.players.reduce((acc, player) => acc + player.votesConfirmed, 0),
      revenue: comp.players.reduce((acc, player) => acc + player.votesConfirmed, 0) * comp.votePrice
    }));

    return NextResponse.json(enrichedCompetitions);
  } catch (error) {
    console.error('Erreur récupération compétitions admin:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = competitionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.format() },
        { status: 400 }
      );
    }

    const existingCompetition = await db.query.competitions.findFirst({
      where: (competitions, { eq }) => eq(competitions.slug, validation.data.slug)
    });

    if (existingCompetition) {
      return NextResponse.json(
        { error: 'Ce slug existe déjà' },
        { status: 400 }
      );
    }

    const [competition] = await db.insert(competitions).values({
      ...validation.data,
      startDate: validation.data.startDate ? new Date(validation.data.startDate) : null,
      endDate: validation.data.endDate ? new Date(validation.data.endDate) : null,
    }).returning();

    return NextResponse.json(competition, { status: 201 });
  } catch (error) {
    console.error('Erreur création compétition:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}