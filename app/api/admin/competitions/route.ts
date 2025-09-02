import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Competition } from '@/lib/models/Competition';
import { competitionSchema } from '@/lib/validations/schemas';

export async function GET() {
  try {
    await dbConnect();
    
    const competitions = await Competition.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(competitions);
  } catch (error) {
    console.error('Erreur récupération compétitions:', error);
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

    await dbConnect();

    // Vérifier que le slug est unique
    const existingCompetition = await Competition.findOne({ slug: validation.data.slug });
    if (existingCompetition) {
      return NextResponse.json(
        { error: 'Ce slug existe déjà' },
        { status: 400 }
      );
    }

    const competition = new Competition(validation.data);
    await competition.save();

    return NextResponse.json(competition, { status: 201 });
  } catch (error) {
    console.error('Erreur création compétition:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}