import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");

    const status = searchParams.get("status");
    const competitionId = searchParams.get("competitionId");
    const date = searchParams.get("date"); // iso string
    const search = searchParams.get("search");

    const where: any = {};
    if (status) where.status = status;
    if (competitionId) where.competitionId = competitionId;
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      where.createdAt = {
        gte: start,
        lte: end,
      };
    }
    if (search) {
      where.OR = [
        { transactionRef: { contains: search, mode: "insensitive" } },
        { customerPhone: { contains: search, mode: "insensitive" } },
      ];
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        order: {
          include: {
            player: { select: { firstName: true, lastName: true } },
            competition: { select: { name: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const total = await prisma.transaction.count({ where });

    return NextResponse.json({
      transactions,
      pagination: { page, pageSize, total },
    });
  } catch (error) {
    console.error("Erreur récupération transactions:", error);
    return NextResponse.json(
      { error: "Impossible de charger les transactions" },
      { status: 500 }
    );
  }
}
