import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { WaveTransactionStatus } from "@/lib/wave/payment";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { orderId, status, amount, customerPhone } = body;

    if (!orderId) {
      return NextResponse.json({ error: "orderId manquant" }, { status: 400 });
    }

    // Mettre à jour la transaction dans la base de données
    const updatedTransaction = await prisma.transaction.update({
      where: { orderId },
      data: {
        status,
        amount,
        customerPhone,
      },
    });

    const response: WaveTransactionStatus = {
      success: true,
      status: updatedTransaction.status as
        | "pending"
        | "success"
        | "failed"
        | "cancelled",
      amount: updatedTransaction.amount,
      transactionId: updatedTransaction.id,
      customerPhone: updatedTransaction.customerPhone ?? undefined,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Erreur callback Wave:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
