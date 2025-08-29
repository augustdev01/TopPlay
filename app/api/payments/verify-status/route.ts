import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { Player } from '@/lib/models/Player';
import { Transaction } from '@/lib/models/Transaction';
import { verifyState } from '@/lib/auth/jwt';
import { checkOrderStatus } from '@/lib/wave/payment';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    const { state } = await request.json();

    if (!state) {
      return NextResponse.json(
        { error: 'State requis' },
        { status: 400 }
      );
    }

    // Vérifier le state JWT
    const statePayload = verifyState(state);
    if (!statePayload) {
      return NextResponse.json(
        { error: 'State invalide ou expiré' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Récupérer l'order
    const order = await Order.findById(statePayload.orderId)
      .populate('playerId', 'firstName lastName slug')
      .populate('competitionId', 'name slug');

    if (!order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }

    // Si déjà traité, retourner le statut
    if (order.status !== 'pending') {
      return NextResponse.json({
        orderId: order._id,
        status: order.status,
        player: order.playerId,
        competition: order.competitionId,
        amount: order.amount,
        transactionRef: order.waveTransactionRef
      });
    }

    // Vérifier le statut via l'API Wave
    const verificationResult = await checkOrderStatus(statePayload.orderId);

    if (verificationResult.success && verificationResult.status === 'success') {
      // Paiement confirmé - traitement automatique
      await confirmOrderPayment(
        order, 
        verificationResult.transactionRef || 'auto_verified', 
        'api_verification',
        { verified_at: new Date().toISOString() }
      );

      return NextResponse.json({
        orderId: order._id,
        status: 'paid',
        player: order.playerId,
        competition: order.competitionId,
        amount: order.amount,
        transactionRef: verificationResult.transactionRef,
        autoConfirmed: true
      });
    } else if (verificationResult.success && verificationResult.status === 'failed') {
      // Paiement échoué
      order.status = 'failed';
      await order.save();

      return NextResponse.json({
        orderId: order._id,
        status: 'failed',
        player: order.playerId,
        competition: order.competitionId,
        amount: order.amount
      });
    }

    // Toujours en attente
    return NextResponse.json({
      orderId: order._id,
      status: 'pending',
      player: order.playerId,
      competition: order.competitionId,
      amount: order.amount,
      message: 'Paiement en cours de traitement'
    });

  } catch (error) {
    console.error('Erreur vérification status:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

async function confirmOrderPayment(
  order: any, 
  transactionRef: string, 
  source: string, 
  rawData: any
) {
  const session = await mongoose.startSession();
  
  try {
    await session.withTransaction(async () => {
      // Marquer l'order comme payée
      order.status = 'paid';
      order.waveTransactionRef = transactionRef;
      order.callbackData = rawData;
      await order.save({ session });

      // Incrémenter les votes confirmés
      await Player.findByIdAndUpdate(
        order.playerId,
        { 
          $inc: { 
            votesConfirmed: 1,
            votesPending: -1
          }
        },
        { session }
      );

      // Créer l'entrée transaction
      const transaction = new Transaction({
        orderId: order._id,
        competitionId: order.competitionId,
        playerId: order.playerId,
        transactionRef,
        status: 'confirmed',
        amount: order.amount,
        currency: 'XOF',
        provider: 'WAVE',
        source,
        raw: rawData,
        validatedAt: new Date()
      });

      await transaction.save({ session });
    });
  } finally {
    await session.endSession();
  }
}