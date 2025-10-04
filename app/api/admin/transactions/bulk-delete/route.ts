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

    await prisma.transaction.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({ success: true, deletedIds: ids });
  } catch (error) {
    console.error("Erreur suppression multiple transactions:", error);
    return NextResponse.json(
      { error: "Impossible de supprimer les transactions" },
      { status: 500 }
    );
  }
}
