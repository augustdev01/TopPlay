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
    const players = await prisma.player.findMany({
      where: { competitionId: competition.id },
      orderBy: { votesConfirmed: "desc" },
      take: 100,
      select: {
        id: true,
        slug: true,
        firstName: true,
        lastName: true,
        team: true,
        position: true,
        photo: true,
        votesConfirmed: true,
      },
    });

    // Total des votes pour calculer les pourcentages
    const totalVotes = players.reduce((acc, p) => acc + p.votesConfirmed, 0);

    // Ajouter le pourcentage à chaque joueur
    const leaderboard = players.map((p, index) => {
      const percentage =
        totalVotes > 0 ? (p.votesConfirmed / totalVotes) * 100 : 0;

      // Transformer photo binaire en Base64 si c’est un Buffer
      const photoUrl = p.photo
        ? `data:image/jpeg;base64,${Buffer.from(p.photo).toString("base64")}`
        : null;

      return {
        ...p,
        photoUrl: /* photoUrl */ null,
        rank: index + 1, // classement direct
        percentage: parseFloat(percentage.toFixed(2)), // 2 décimales
      };
    });

    // Générer ETag basé sur l'état du leaderboard
    const dataString = JSON.stringify(
      leaderboard.map((p: any) => ({
        id: p.id,
        votes: p.votesConfirmed,
        photoUrl: /* p.photo
          ? `data:image/jpeg;base64,${Buffer.from(p.photo).toString("base64")}`
          : */ null,
      }))
    );
    const etag = Buffer.from(dataString).toString("base64");

    const ifNoneMatch = request.headers.get("if-none-match");
    if (ifNoneMatch === etag) {
      return new NextResponse(null, { status: 304 });
    }
    console.log("data:", JSON.stringify(competition, null, 2));
    console.log("leaderboard:", JSON.stringify(leaderboard, null, 2));

    return NextResponse.json(
      {
        competition: {
          id: competition.id,
          name: competition.name,
          slug: competition.slug,
          totalVotes,
        },
        leaderboard,
      },
      {
        headers: {
          ETag: etag,
          "Cache-Control": "public, max-age=1", // cache 1s
        },
      }
    );
  } catch (error) {
    console.error("Erreur récupération classement:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
