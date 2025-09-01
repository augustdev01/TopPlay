import { NextResponse } from 'next/server';
import { mockCompetitions, mockPlayers } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Simuler un délai de réseau
    await new Promise(resolve => setTimeout(resolve, 400));

    const competition = mockCompetitions.find(c => c.slug === params.slug);
    if (!competition) {
      return NextResponse.json(
        { error: 'Compétition non trouvée' },
        { status: 404 }
      );
    }

    const players = mockPlayers
      .filter(p => p.competitionId === competition._id)
      .sort((a, b) => b.votesConfirmed - a.votesConfirmed);

    return NextResponse.json(players);
    
  } catch (error) {
    console.error('Erreur récupération joueurs:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}