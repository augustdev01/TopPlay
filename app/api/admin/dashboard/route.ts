import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(startOfToday.getDate() - 7);

    // Stats
    const [
      totalVotesAgg,
      activeCompetitions,
      totalPlayers,
      pendingTransactions,
    ] = await Promise.all([
      prisma.player.aggregate({
        _sum: { votesConfirmed: true },
      }),
      prisma.competition.count({ where: { status: "active" } }),
      prisma.player.count(),
      prisma.transaction.count({ where: { status: "pending" } }),
    ]);

    const totalVotes = totalVotesAgg._sum.votesConfirmed ?? 0;

    // Top compétition active
    const topCompetition = await prisma.competition.findFirst({
      where: { status: "active" },
      // orderBy: { votesConfirmed: "desc" },
    });

    // Recent transactions
    const recentTransactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { player: true },
    });

    // Top players
    const topPlayers = await prisma.player.findMany({
      orderBy: { votesConfirmed: "desc" },
      take: 3,
      include: { competition: true },
    });

    return NextResponse.json({
      stats: {
        totalVotes,
        totalRevenue: totalVotesAgg?._sum?.amount ?? 0,
        activeCompetitions,
        totalPlayers,
        pendingTransactions,
        // weeklyGrowth: weeklyGrowth.toFixed(1),
        topCompetition: topCompetition?.name ?? "N/A",
      },
      recentTransactions: recentTransactions.map((t: any) => ({
        id: t.id,
        playerName: `${t.player?.firstName ?? "N/A"} ${
          t.player?.lastName ?? ""
        }`,
        competition: t.competition?.name ?? "N/A",
        amount: t.amount,
        status: t.status,
        time: t.createdAt.toISOString(),
      })),
      topPlayers: topPlayers.map((p: any) => ({
        name: `${p.firstName} ${p.lastName}`,
        competition: p.competition?.name ?? "N/A",
        votes: p.votesConfirmed ?? 0,
        revenue: (p.votesConfirmed ?? 0) * (p.competition?.votePrice ?? 0),
        growth: "+0%",
      })),
    });
  } catch (error) {
    console.error("Erreur récupération dashboard:", error);
    return NextResponse.json(
      { error: "Erreur serveur dashboard" },
      { status: 500 }
    );
  }
}
