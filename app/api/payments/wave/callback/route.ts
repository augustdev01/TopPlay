/* import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { Player } from '@/lib/models/Player';
import { Transaction } from '@/lib/models/Transaction';
import { verifyState } from '@/lib/auth/jwt';
import { verifyWaveSignature } from '@/lib/wave/payment';

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-wave-signature');
    const body = await request.json();

    // Vérifier la signature Wave (si fournie)
    if (signature && !verifyWaveSignature(body, signature)) {
      return NextResponse.json(
        { error: 'Signature invalide' },
        { status: 401 }
      );
    }

    const { state, transaction_id, status, amount } = body;

    if (!state) {
      return NextResponse.json(
        { error: 'State manquant' },
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
    const order = await Order.findById(statePayload.orderId);
    if (!order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }

    // Éviter le double traitement
    if (order.status !== 'pending') {
      return NextResponse.json({ message: 'Déjà traité' });
    }

    // Traiter selon le statut Wave
    if (status === 'success' && transaction_id) {
      // Paiement confirmé automatiquement
      await confirmOrderPayment(order, transaction_id, 'callback', body);

      return NextResponse.json({
        message: 'Paiement confirmé',
        status: 'success'
      });
    } else {
      // Paiement échoué
      order.status = 'failed';
      order.callbackData = body;
      await order.save();

      return NextResponse.json({
        message: 'Paiement échoué',
        status: 'failed'
      });
    }

  } catch (error) {
    console.error('Erreur callback Wave:', error);
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
} */
