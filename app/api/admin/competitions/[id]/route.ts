import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// Supprimer une compétition
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.competition.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression compétition:", error);
    return NextResponse.json(
      { error: "Impossible de supprimer la compétition" },
      { status: 500 }
    );
  }
}

// Mettre à jour le statut
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();

    const updated = await prisma.competition.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erreur mise à jour statut compétition:", error);
    return NextResponse.json(
      { error: "Impossible de mettre à jour la compétition" },
      { status: 500 }
    );
  }
}
