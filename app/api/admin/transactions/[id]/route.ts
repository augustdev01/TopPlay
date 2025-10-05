import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 1️⃣ Récupérer la transaction pour connaître son orderId
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      select: { orderId: true },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction introuvable" },
        { status: 404 }
      );
    }

    // 2️⃣ Supprimer d'abord la transaction
    await prisma.transaction.delete({
      where: { id },
    });

    // 3️⃣ Supprimer ensuite l’order lié
    await prisma.order.delete({
      where: { id: transaction.orderId },
    });

    return NextResponse.json({
      success: true,
      deletedTransaction: id,
      deletedOrder: transaction.orderId,
    });
  } catch (error) {
    console.error("Erreur suppression transaction + order:", error);
    return NextResponse.json(
      { error: "Impossible de supprimer la transaction et l’ordre associé" },
      { status: 500 }
    );
  }
}
