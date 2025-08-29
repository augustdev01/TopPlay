import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Competition } from '@/lib/models/Competition';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await dbConnect();

    const competition = await Competition.findOne({ slug: params.slug });
    
    if (!competition) {
      return NextResponse.json(
        { error: 'Compétition non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json(competition);
    
  } catch (error) {
    console.error('Erreur récupération compétition:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}