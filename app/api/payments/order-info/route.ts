import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { verifySecureState } from '@/lib/wave/payment';

export async function POST(request: Request) {
  try {
    const { orderId, state } = await request.json();

    if (!orderId || !state) {
      return NextResponse.json(
        { error: 'Paramètres manquants' },
        { status: 400 }
      );
    }

    // Vérifier le state sécurisé
    if (!verifySecureState(state, orderId)) {
      return NextResponse.json(
        { error: 'State invalide ou expiré' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Récupérer les informations de la commande
    const order = await Order.findById(orderId)
      .populate('playerId', 'firstName lastName')
      .populate('competitionId', 'name slug');

    if (!order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      orderId: order._id,
      player: {
        firstName: order.playerId.firstName,
        lastName: order.playerId.lastName
      },
      competition: {
        name: order.competitionId.name,
        slug: order.competitionId.slug
      },
      amount: order.amount,
      status: order.status
    });

  } catch (error) {
    console.error('Erreur récupération order info:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}