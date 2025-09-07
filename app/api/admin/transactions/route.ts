import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        order: {
          include: {
            player: true, // si tu as une relation joueur
            competition: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Erreur récupération transactions:", error);
    return NextResponse.json(
      { error: "Impossible de charger les transactions" },
      { status: 500 }
    );
  }
}
