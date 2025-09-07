import { NextResponse } from "next/server";
import { verifyState } from "@/lib/auth/jwt";
// import { checkOrderStatus } from "@/lib/wave/payment";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { state } = await request.json();

    if (!state) {
      return NextResponse.json({ error: "State requis" }, { status: 400 });
    }

    // Vérifier le state JWT
    const statePayload = verifyState(state);
    if (!statePayload) {
      return NextResponse.json(
        { error: "State invalide ou expiré" },
        { status: 400 }
      );
    }

    // Charger l'order avec player & competition
    const order = await prisma.order.findUnique({
      where: { id: statePayload.orderId },
      include: {
        player: {
          select: { id: true, firstName: true, lastName: true, slug: true },
        },
        competition: { select: { id: true, name: true, slug: true } },
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Commande non trouvée" },
        { status: 404 }
      );
    }

    // Si déjà traité
    if (order.status !== "pending") {
      return NextResponse.json({
        orderId: order.id,
        status: order.status,
        player: order.player,
        competition: order.competition,
        amount: order.amount,
        transactionRef: order.waveTransactionRef,
      });
    }

    // Vérifier le statut via API Wave
    /*   const verificationResult = await checkOrderStatus(statePayload.orderId);

    if (verificationResult.success && verificationResult.status === "success") {
      // Paiement confirmé → traitement auto
      await confirmOrderPayment(
        order.id,
        order.playerId,
        order.competitionId,
        verificationResult.transactionRef || "auto_verified",
        "api_verification",
        { verified_at: new Date().toISOString() }
      );

      return NextResponse.json({
        orderId: order.id,
        status: "paid",
        player: order.player,
        competition: order.competition,
        amount: order.amount,
        transactionRef: verificationResult.transactionRef,
        autoConfirmed: true,
      });
    } else if (
      verificationResult.success &&
      verificationResult.status === "failed"
    ) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "failed" },
      });

      return NextResponse.json({
        orderId: order.id,
        status: "failed",
        player: order.player,
        competition: order.competition,
        amount: order.amount,
      });
    } */

    // Toujours en attente
    return NextResponse.json({
      orderId: order.id,
      status: "pending",
      player: order.player,
      competition: order.competition,
      amount: order.amount,
      message: "Paiement en cours de traitement",
    });
  } catch (error) {
    console.error("Erreur vérification status:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

async function confirmOrderPayment(
  orderId: string,
  playerId: string,
  competitionId: string,
  transactionRef: string,
  source: string,
  rawData: any
) {
  await prisma.$transaction(async (tx: any) => {
    // 1. Mettre à jour l'order
    await tx.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        waveTransactionRef: transactionRef,
        callbackData: rawData,
      },
    });

    // 2. Incrémenter les votes confirmés
    await tx.player.update({
      where: { id: playerId },
      data: {
        votesConfirmed: { increment: 1 },
        votesPending: { decrement: 1 },
      },
    });

    // 3. Créer la transaction
    await tx.transaction.create({
      data: {
        orderId,
        competitionId,
        playerId,
        playerName: "auto", // ⚠️ à remplacer par `${order.player.firstName} ${order.player.lastName}`
        competition: "auto", // ⚠️ idem, à remplacer par `order.competition.name`
        transactionRef,
        status: "confirmed",
        amount: (await tx.order.findUnique({ where: { id: orderId } }))!.amount,
        currency: "XOF",
        provider: "WAVE",
        source,
        raw: rawData,
        validatedAt: new Date(),
      },
    });
  });
}
