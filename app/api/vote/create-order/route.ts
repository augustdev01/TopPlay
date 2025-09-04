import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { Competition } from '@/lib/models/Competition';
import { Player } from '@/lib/models/Player';
import { buildWavePaymentUrl, generateSecureState } from '@/lib/wave/payment';
import { z } from 'zod';

const voteSchema = z.object({
  competitionSlug: z.string().min(1),
  playerSlug: z.string().min(1),
  customerPhone: z.string().min(8, 'Numéro de téléphone requis')
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = voteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.format() },
        { status: 400 }
      );
    }

    const { competitionSlug, playerSlug, customerPhone } = validation.data;

    await dbConnect();

    // Vérifier que la compétition existe et est active
    const competition = await Competition.findOne({ 
      slug: competitionSlug,
      status: 'active'
    });

    if (!competition) {
      return NextResponse.json(
        { error: 'Compétition non trouvée ou inactive' },
        { status: 404 }
      );
    }

    // Vérifier que le joueur existe
    const player = await Player.findOne({
      competitionId: competition._id,
      slug: playerSlug
    });

    if (!player) {
      return NextResponse.json(
        { error: 'Joueur non trouvé' },
        { status: 404 }
      );
    }

    // Créer la commande
    const order = new Order({
      competitionId: competition._id,
      playerId: player._id,
      unitPrice: competition.votePrice,
      quantity: 1,
      amount: competition.votePrice,
      status: 'pending',
      customerPhone,
      stateToken: '', // sera rempli après
      checkoutUrl: '' // sera rempli après
    });

    await order.save();

    // Générer le state sécurisé
    const secureState = generateSecureState(order._id.toString());

    // Construire l'URL Wave Business directe
    const wavePaymentUrl = buildWavePaymentUrl({
      amount: competition.votePrice,
      orderId: order._id.toString(),
      playerName: `${player.firstName} ${player.lastName}`,
      competitionName: competition.name
    });

    // Mettre à jour l'order avec les URLs
    order.stateToken = secureState;
    order.checkoutUrl = wavePaymentUrl;
    await order.save();

    // Incrémenter votesPending pour le monitoring (optionnel)
    await Player.findByIdAndUpdate(player._id, {
      $inc: { votesPending: 1 }
    });

    return NextResponse.json({
      orderId: order._id.toString(),
      wavePaymentUrl,
      state: secureState,
      player: {
        firstName: player.firstName,
        lastName: player.lastName
      },
      competition: {
        name: competition.name
      },
      amount: competition.votePrice
    });

  } catch (error) {
    console.error('Erreur création order:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}