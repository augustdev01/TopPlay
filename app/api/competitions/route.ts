import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const competitions = await prisma.competition.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        players: {
          select: {
            id: true,
            votesConfirmed: true
          }
        }
      }
    });

    const enrichedCompetitions = competitions.map(comp => {
      const totalVotes = comp.players.reduce((acc, player) => acc + player.votesConfirmed, 0);
      return {
        ...comp,
        playersCount: comp.players.length,
        totalVotes,
        revenue: totalVotes * comp.votePrice
      };
    });

    return NextResponse.json(enrichedCompetitions);
  } catch (error) {
    console.error('Erreur récupération compétitions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}