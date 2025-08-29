import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { Competition } from '@/lib/models/Competition';
import { Player } from '@/lib/models/Player';
import { signState } from '@/lib/auth/jwt';
import { buildWaveCheckoutUrl } from '@/lib/wave/payment';
import { voteSchema } from '@/lib/validations/schemas';

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

    const { competitionSlug, playerSlug, customerPhone, customerEmail } = validation.data;

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
      customerEmail,
      stateToken: '', // sera rempli après
      checkoutUrl: '' // sera rempli après
    });

    await order.save();

    // Créer le state signé
    const stateToken = signState({
      orderId: order._id.toString(),
      competitionId: competition._id.toString(),
      playerId: player._id.toString(),
      amount: competition.votePrice
    });

    // Construire l'URL Wave
    const redirectUrl = `${process.env.APP_BASE_URL}/paiement/retour`;
    const callbackUrl = `${process.env.APP_BASE_URL}/api/payments/wave/callback`;
    
    const checkoutUrl = buildWaveCheckoutUrl({
      amount: competition.votePrice,
      currency: 'XOF',
      description: `Vote pour ${player.firstName} ${player.lastName} - ${competition.name}`,
      state: stateToken,
      redirectUrl,
      callbackUrl
    });

    // Mettre à jour l'order avec les URLs
    order.stateToken = stateToken;
    order.checkoutUrl = checkoutUrl;
    await order.save();

    // Incrémenter votesPending pour le monitoring (optionnel)
    await Player.findByIdAndUpdate(player._id, {
      $inc: { votesPending: 1 }
    });

    return NextResponse.json({
      orderId: order._id.toString(),
      checkoutUrl,
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