import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// POST /api/admin/transactions/bulk-delete
export async function POST(req: Request) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "La liste d'IDs est invalide ou vide" },
        { status: 400 }
      );
    }

    // 1️⃣ Récupérer les transactions pour obtenir leurs orderIds
    const transactions = await prisma.transaction.findMany({
      where: { id: { in: ids } },
      select: { id: true, orderId: true },
    });

    const orderIds = transactions.map((t) => t.orderId).filter(Boolean);

    // 2️⃣ Supprimer les transactions
    await prisma.transaction.deleteMany({
      where: { id: { in: ids } },
    });

    // 3️⃣ Supprimer les orders associés
    if (orderIds.length > 0) {
      await prisma.order.deleteMany({
        where: { id: { in: orderIds } },
      });
    }

    return NextResponse.json({
      success: true,
      deletedTransactions: ids,
      deletedOrders: orderIds,
    });
  } catch (error) {
    console.error("Erreur suppression multiple transactions:", error);
    return NextResponse.json(
      {
        error:
          "Impossible de supprimer les transactions et les orders associés",
      },
      { status: 500 }
    );
  }
}
