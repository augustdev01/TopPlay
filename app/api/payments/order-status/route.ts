import { prisma } from "@/lib/db";
import { WaveTransactionStatus } from "@/lib/wave/payment";

export async function checkOrderStatus(
  orderId: string
): Promise<WaveTransactionStatus> {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { orderId },
    });

    if (!transaction) {
      return {
        success: false,
        error: "Transaction introuvable",
      };
    }

    return {
      success: true,
      status: transaction.status as
        | "pending"
        | "success"
        | "failed"
        | "cancelled",
      amount: transaction.amount,
      transactionId: transaction.id,
      customerPhone: transaction.customerPhone ?? undefined,
    };
  } catch (error) {
    console.error("Erreur Prisma checkOrderStatus:", error);
    return {
      success: false,
      error: "Erreur serveur lors du check paiement",
    };
  }
}
