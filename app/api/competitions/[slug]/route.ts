import { NextResponse } from 'next/server';
import { mockCompetitions } from '@/lib/mock-data';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Simuler un délai de réseau
    await new Promise(resolve => setTimeout(resolve, 300));

    const competition = mockCompetitions.find(c => c.slug === params.slug);
    
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