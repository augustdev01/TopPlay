import { NextResponse } from 'next/server';
import { mockCompetitions } from '@/lib/mock-data';

export async function GET() {
  try {
    // Simuler un délai de réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(mockCompetitions);
    
  } catch (error) {
    console.error('Erreur récupération compétitions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}