import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Player } from '@/lib/models/Player';
import { Competition } from '@/lib/models/Competition';
import { playerSchema } from '@/lib/validations/schemas';

export async function GET() {
  try {
    await dbConnect();
    
    const players = await Player.find({})
      .populate('competitionId', 'name slug status')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(players);
  } catch (error) {
    console.error('Erreur récupération joueurs:', error);
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

    await dbConnect();

    // Vérifier que la compétition existe
    const competition = await Competition.findById(body.competitionId);
    if (!competition) {
      return NextResponse.json(
        { error: 'Compétition non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier que le slug est unique dans cette compétition
    const existingPlayer = await Player.findOne({ 
      competitionId: body.competitionId,
      slug: validation.data.slug 
    });
    
    if (existingPlayer) {
      return NextResponse.json(
        { error: 'Ce slug existe déjà dans cette compétition' },
        { status: 400 }
      );
    }

    const player = new Player({
      ...validation.data,
      competitionId: body.competitionId
    });
    
    await player.save();

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error('Erreur création joueur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}