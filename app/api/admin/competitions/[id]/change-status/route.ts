import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    // exemple: update du statut
    const updatedCompetition = await prisma.competition.update({
      where: { id: params.id },
      data: {
        status: body.status, // "active" | "inactive" | "finished"
      },
    });

    return NextResponse.json(updatedCompetition);
  } catch (error) {
    console.error("Erreur update competition:", error);
    return NextResponse.json(
      { error: "Erreur mise à jour compétition" },
      { status: 500 }
    );
  }
}
