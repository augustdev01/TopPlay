import { NextResponse } from "next/server";
import { verifySecureState, validateTransactionCode } from "@/lib/wave/payment";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { orderId, state, transactionCode } = await request.json();

    if (!orderId || !state || !transactionCode) {
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

    // Valider le format du code Wave
    if (!validateTransactionCode(transactionCode)) {
      return NextResponse.json(
        { error: "Format de code invalide" },
        { status: 400 }
      );
    }

    const txCode = transactionCode.toUpperCase();

    // Vérifier la commande
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order || order.status !== "pending") {
      return NextResponse.json(
        { error: "Commande introuvable ou déjà traitée" },
        { status: 400 }
      );
    }

    // Vérifier si le code a déjà été utilisé
    const existing = await prisma.transaction.findUnique({
      where: { transactionRef: txCode },
    });
    if (existing) {
      return NextResponse.json({ error: "Code déjà utilisé" }, { status: 400 });
    }

    // Récupérer joueur et compétition
    const [player, competition] = await Promise.all([
      prisma.player.findUnique({ where: { id: order.playerId } }),
      prisma.competition.findUnique({ where: { id: order.competitionId } }),
    ]);

    if (!player || !competition) {
      return NextResponse.json(
        { error: "Joueur ou compétition introuvable" },
        { status: 404 }
      );
    }

    // Tout exécuter dans une transaction Prisma atomique
    await prisma.$transaction(async (tx: any) => {
      // Créer la transaction confirmée
      await tx.transaction.create({
        data: {
          orderId: order.id,
          playerId: order.playerId,
          competitionId: order.competitionId,
          playerName: player.firstName + " " + player.lastName,
          competition: competition.name,
          transactionRef: txCode,
          status: "confirmed",
          amount: order.amount,
          currency: "XOF",
          provider: "WAVE",
          source: "user",
          raw: {
            submittedAt: new Date().toISOString(),
            userAgent: request.headers.get("user-agent"),
          },
          customerPhone: order.customerPhone ?? undefined,
          validatedAt: new Date(),
        },
      });

      // Mettre à jour commande
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: "paid",
          waveTransactionRef: txCode,
        },
      });

      // Mettre à jour joueur
      await tx.player.update({
        where: { id: player.id },
        data: {
          votesConfirmed: { increment: 1 },
          votesPending: { decrement: 1 },
        },
      });
    });

    return NextResponse.json({
      success: true,
      message: "Vote confirmé avec succès !",
    });
  } catch (error) {
    console.error("Erreur confirmation paiement:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
