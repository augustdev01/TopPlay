import { NextResponse } from 'next/server';
import { mockCompetitions, mockPlayers } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Simuler un délai de réseau
    await new Promise(resolve => setTimeout(resolve, 200));

    const competition = mockCompetitions.find(c => c.slug === params.slug);
    if (!competition) {
      return NextResponse.json(
        { error: 'Compétition non trouvée' },
        { status: 404 }
      );
    }

    const leaderboard = mockPlayers
      .filter(p => p.competitionId === competition._id)
      .sort((a, b) => b.votesConfirmed - a.votesConfirmed)
      .slice(0, 100);

    // Générer ETag pour le cache
    const dataString = JSON.stringify(leaderboard.map(p => ({ id: p._id, votes: p.votesConfirmed })));
    const etag = Buffer.from(dataString).toString('base64');
    
    // Vérifier If-None-Match pour cache 304
    const ifNoneMatch = request.headers.get('if-none-match');
    if (ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304 });
    }

    return NextResponse.json(leaderboard, {
      headers: {
        'ETag': etag,
        'Cache-Control': 'public, max-age=1', // Cache 1 seconde
      }
    });
    
  } catch (error) {
    console.error('Erreur récupération classement:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}