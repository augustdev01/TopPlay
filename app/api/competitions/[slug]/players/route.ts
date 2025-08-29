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

    // Récupérer les joueurs
    const players = await Player.find({ competitionId: competition._id })
      .select('slug firstName lastName age team position bio photoUrl votesConfirmed')
      .sort({ votesConfirmed: -1 });

    return NextResponse.json(players);
    
  } catch (error) {
    console.error('Erreur récupération joueurs:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}