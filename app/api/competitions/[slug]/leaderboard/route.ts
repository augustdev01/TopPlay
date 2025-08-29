import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Competition } from '@/lib/models/Competition';
import { Player } from '@/lib/models/Player';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    // Vérifier que la compétition existe
    const competition = await Competition.findOne({ slug: params.slug });
    if (!competition) {
      return NextResponse.json(
        { error: 'Compétition non trouvée' },
        { status: 404 }
      );
    }

    // Récupérer le classement optimisé
    const leaderboard = await Player.find({ competitionId: competition._id })
      .select('slug firstName lastName team position photoUrl votesConfirmed')
      .sort({ votesConfirmed: -1 })
      .limit(100); // Limiter pour les performances

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