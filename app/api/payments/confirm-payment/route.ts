import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { Transaction } from '@/lib/models/Transaction';
import { verifySecureState, validateTransactionCode } from '@/lib/wave/payment';

export async function POST(request: Request) {
  try {
    const { orderId, state, transactionCode, customerPhone, notes } = await request.json();

    if (!orderId || !state || !transactionCode) {
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

    // Valider le format du code de transaction
    if (!validateTransactionCode(transactionCode)) {
      return NextResponse.json(
        { error: 'Format de code de transaction invalide' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Vérifier que la commande existe et est en attente
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }

    if (order.status !== 'pending') {
      return NextResponse.json(
        { error: 'Cette commande a déjà été traitée' },
        { status: 400 }
      );
    }

    // Vérifier si ce code de transaction n'a pas déjà été utilisé
    const existingTransaction = await Transaction.findOne({ 
      transactionRef: transactionCode.toUpperCase() 
    });

    if (existingTransaction) {
      return NextResponse.json(
        { error: 'Ce code de transaction a déjà été utilisé' },
        { status: 400 }
      );
    }

    // Créer l'entrée de transaction en attente de validation admin
    const transaction = new Transaction({
      orderId: order._id,
      competitionId: order.competitionId,
      playerId: order.playerId,
      transactionRef: transactionCode.toUpperCase(),
      status: 'submitted',
      amount: order.amount,
      currency: 'XOF',
      provider: 'WAVE',
      source: 'user',
      raw: {
        customerPhone,
        notes,
        submittedAt: new Date().toISOString(),
        userAgent: request.headers.get('user-agent')
      }
    });

    await transaction.save();

    // Mettre à jour la commande avec les informations de paiement
    order.waveTransactionRef = transactionCode.toUpperCase();
    if (customerPhone) {
      order.customerPhone = customerPhone;
    }
    await order.save();

    return NextResponse.json({
      success: true,
      message: 'Paiement soumis pour validation. Votre vote sera confirmé sous peu.',
      transactionId: transaction._id
    });

  } catch (error) {
    console.error('Erreur confirmation paiement:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}