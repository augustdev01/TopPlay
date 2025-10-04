import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// DELETE /api/admin/transactions/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error("Erreur suppression transaction:", error);
    return NextResponse.json(
      { error: "Impossible de supprimer la transaction" },
      { status: 500 }
    );
  }
}
