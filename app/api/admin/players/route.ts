import { NextResponse } from 'next/server';
import { db, players } from '@/lib/db';
import { playerSchema } from '@/lib/validations/schemas';

export async function GET() {
  try {
    const allPlayers = await db.query.players.findMany({
      orderBy: (players, { desc }) => [desc(players.createdAt)],
      with: {
        competition: {
          columns: {
            name: true,
            slug: true,
            status: true,
            votePrice: true,
          }
        }
      }
    });

    const enrichedPlayers = allPlayers.map(player => ({
      ...player,
      competitionName: player.competition.name,
      competitionSlug: player.competition.slug,
      competitionStatus: player.competition.status,
      revenue: player.votesConfirmed * player.competition.votePrice
    }));

    return NextResponse.json(enrichedPlayers);
  } catch (error) {
    console.error('Erreur récupération joueurs admin:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = playerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.format() },
        { status: 400 }
      );
    }

    const competition = await db.query.competitions.findFirst({
      where: (competitions, { eq }) => eq(competitions.id, body.competitionId)
    });

    if (!competition) {
      return NextResponse.json(
        { error: 'Compétition non trouvée' },
        { status: 404 }
      );
    }

    const existingPlayer = await db.query.players.findFirst({
      where: (players, { and, eq }) => and(
        eq(players.competitionId, body.competitionId),
        eq(players.slug, validation.data.slug)
      )
    });

    if (existingPlayer) {
      return NextResponse.json(
        { error: 'Ce slug existe déjà dans cette compétition' },
        { status: 400 }
      );
    }

    const [player] = await db.insert(players).values({
      ...validation.data,
      competitionId: body.competitionId
    }).returning();

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error('Erreur création joueur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}