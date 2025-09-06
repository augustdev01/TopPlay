import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { playerSchema } from '@/lib/validations/schemas';

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        competition: {
          select: {
            name: true,
            slug: true,
            status: true,
            votePrice: true,
          }
        }
      }
    });

    const enrichedPlayers = players.map(player => ({
      ...player,
      competitionName: player.competition.name,
      competitionSlug: player.competition.slug,
      competitionStatus: player.competition.status,
      revenue: player.votesConfirmed * player.competition.votePrice
    }));

    return NextResponse.json(enrichedPlayers);
  } catch (error) {
    console.error('Erreur récupération joueurs admin:', error);
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

    const competition = await prisma.competition.findUnique({
      where: { id: body.competitionId }
    });

    if (!competition) {
      return NextResponse.json(
        { error: 'Compétition non trouvée' },
        { status: 404 }
      );
    }

    const existingPlayer = await prisma.player.findFirst({
      where: {
        competitionId: body.competitionId,
        slug: validation.data.slug
      }
    });

    if (existingPlayer) {
      return NextResponse.json(
        { error: 'Ce slug existe déjà dans cette compétition' },
        { status: 400 }
      );
    }

    const player = await prisma.player.create({
      data: {
        ...validation.data,
        competitionId: body.competitionId
      }
    });

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error('Erreur création joueur:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}