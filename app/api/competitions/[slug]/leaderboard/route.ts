import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Récupérer la compétition par slug
    const competition = await prisma.competition.findUnique({
      where: { slug: params.slug },
    });

    if (!competition) {
      return NextResponse.json(
        { error: "Compétition non trouvée" },
        { status: 404 }
      );
    }

    // Récupérer les joueurs de cette compétition triés par votes confirmés
    const leaderboard = await prisma.player.findMany({
      where: { competitionId: competition.id },
      orderBy: { votesConfirmed: "desc" },
      take: 100,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        votesConfirmed: true,
      },
    });

    // Générer ETag basé sur l'état du leaderboard
    const dataString = JSON.stringify(
      leaderboard.map((p: any) => ({ id: p.id, votes: p.votesConfirmed }))
    );
    const etag = Buffer.from(dataString).toString("base64");

    const ifNoneMatch = request.headers.get("if-none-match");
    if (ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304 });
    }

    return NextResponse.json(leaderboard, {
      headers: {
        ETag: etag,
        "Cache-Control": "public, max-age=1", // cache 1s
      },
    });
  } catch (error) {
    console.error("Erreur récupération classement:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
