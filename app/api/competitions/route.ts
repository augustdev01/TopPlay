import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const competitions = await db.query.competitions.findMany({
      orderBy: (competitions, { desc }) => [desc(competitions.createdAt)],
      with: {
        players: {
          columns: {
            id: true,
          }
        }
      }
    });

    const enrichedCompetitions = competitions.map(comp => ({
      ...comp,
      playersCount: comp.players.length,
      totalVotes: comp.players.reduce((acc: number, player: any) => acc + (player.votesConfirmed || 0), 0),
      revenue: comp.players.reduce((acc: number, player: any) => acc + (player.votesConfirmed || 0), 0) * comp.votePrice
    }));

    return NextResponse.json(enrichedCompetitions);
  } catch (error) {
    console.error('Erreur récupération compétitions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}