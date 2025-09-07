import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { buildWavePaymentUrl, generateSecureState } from "@/lib/wave/payment";

const voteSchema = z.object({
  competitionSlug: z.string().min(1),
  playerSlug: z.string().min(1),
  customerPhone: z.string().min(8, "Numéro de téléphone requis"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = voteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { competitionSlug, playerSlug, customerPhone } = validation.data;

    // Vérifier que la compétition existe et est active
    const competition = await prisma.competition.findFirst({
      where: { slug: competitionSlug, status: "active" },
    });

    if (!competition) {
      return NextResponse.json(
        { error: "Compétition non trouvée ou inactive" },
        { status: 404 }
      );
    }

    // Vérifier que le joueur existe
    const player = await prisma.player.findFirst({
      where: { competitionId: competition.id, slug: playerSlug },
    });

    if (!player) {
      return NextResponse.json({ error: "Joueur non trouvé" }, { status: 404 });
    }

    // Créer la commande (order)
    const order = await prisma.order.create({
      data: {
        competitionId: competition.id,
        playerId: player.id,
        unitPrice: competition.votePrice,
        quantity: 1,
        amount: competition.votePrice,
        status: "pending",
        customerPhone,
        stateToken: "", // sera mis après
        checkoutUrl: "", // sera mis après
      },
    });

    // Générer le state sécurisé
    const secureState = generateSecureState(order.id);

    // Construire l'URL de paiement Wave
    const wavePaymentUrl = buildWavePaymentUrl({
      amount: competition.votePrice,
      orderId: order.id,
      playerName: `${player.firstName} ${player.lastName}`,
      competitionName: competition.name,
    });

    // Mettre à jour l'order avec l'URL et le state
    await prisma.order.update({
      where: { id: order.id },
      data: {
        stateToken: secureState,
        checkoutUrl: wavePaymentUrl,
      },
    });

    // Incrémenter votesPending pour le joueur
    await prisma.player.update({
      where: { id: player.id },
      data: { votesPending: { increment: 1 } },
    });

    return NextResponse.json({
      orderId: order.id,
      wavePaymentUrl,
      state: secureState,
      player: {
        firstName: player.firstName,
        lastName: player.lastName,
      },
      competition: {
        name: competition.name,
      },
      amount: competition.votePrice,
    });
  } catch (error) {
    console.error("Erreur création order:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
