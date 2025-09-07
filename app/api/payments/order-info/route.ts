import { NextResponse } from "next/server";
import { verifySecureState } from "@/lib/wave/payment";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { orderId, state } = await request.json();

    if (!orderId || !state) {
      return NextResponse.json(
        { error: "Paramètres manquants" },
        { status: 400 }
      );
    }

    // Vérifier le state sécurisé
    if (!verifySecureState(state, orderId)) {
      return NextResponse.json(
        { error: "State invalide ou expiré" },
        { status: 400 }
      );
    }

    // Récupérer la commande avec player et competition
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        player: {
          select: { firstName: true, lastName: true },
        },
        competition: {
          select: { name: true, slug: true },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Commande non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      player: {
        firstName: order.player.firstName,
        lastName: order.player.lastName,
      },
      competition: {
        name: order.competition.name,
        slug: order.competition.slug,
      },
      amount: order.amount,
      status: order.status,
    });
  } catch (error) {
    console.error("Erreur récupération order info:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
