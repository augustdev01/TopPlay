import { prisma } from "@/lib/db";
import { WaveTransactionStatus } from "@/lib/wave/payment";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("orderId");

    if (!orderId) {
      return new Response(
        JSON.stringify({ success: false, error: "orderId manquant" }),
        { status: 400 }
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: { orderId },
    });

    if (!transaction) {
      return new Response(
        JSON.stringify({ success: false, error: "Transaction introuvable" }),
        { status: 404 }
      );
    }

    const response: WaveTransactionStatus = {
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

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("Erreur Prisma checkOrderStatus:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Erreur serveur lors du check paiement",
      }),
      { status: 500 }
    );
  }
}
