// lib/mappers.ts
import { CompetitionEntity, PlayerEntity } from "@/types/entities/entities";
import { Competition, Player } from "@prisma/client";

export function mapCompetition(
  comp: Competition & { players: { votesConfirmed: number }[] }
): CompetitionEntity {
  const totalVotes = comp.players.reduce((acc, p) => acc + p.votesConfirmed, 0);

  // On "force" le type pour que TS accepte
  const status = comp.status as "draft" | "active" | "ended";

  return {
    _id: comp.id,
    name: comp.name,
    slug: comp.slug,
    status,
    votePrice: comp.votePrice,
    startDate: comp.startDate || undefined,
    endDate: comp.endDate || undefined,
    rules: comp.rules ?? undefined,
    description: comp.description ?? undefined,
    playersCount: comp.players.length,
    totalVotes,
    revenue: totalVotes * comp.votePrice,
  };
}

/* export function mapPlayer(
  player: Player & {
    competition: {
      name: string;
      slug: string;
      status: string;
      votePrice: number;
    };
  }
): PlayerEntity {
  // Forcer le type pour `status`
  const status = (["draft", "active", "ended"] as const).includes(
    player.competition.status as any
  )
    ? (player.competition.status as "draft" | "active" | "ended")
    : "draft";
  return {
    _id: player.id,
    slug: player.slug,
    firstName: player.firstName,
    lastName: player.lastName,
    age: player.age,
    team: player.team ?? undefined, // convert null → undefined
    position: player.position ?? undefined, // convert null → undefined
    bio: player.bio ?? undefined,
    photoUrl: player.photoUrl ?? undefined,
    votesConfirmed: player.votesConfirmed,
    votesPending: player.votesPending,
    createdAt: player.createdAt,
    updatedAt: player.updatedAt,
    competitionId: player.competitionId,
    competitionName: player.competition.name,
    competitionSlug: player.competition.slug,
    competitionStatus: status, // caste strict
    revenue: player.votesConfirmed * player.competition.votePrice,
  };
}
 */
export function mapPlayer(
  player: Player & {
    competition: {
      name: string;
      slug: string;
      status: string;
      votePrice: number;
    };
  }
): PlayerEntity {
  const status = (["draft", "active", "ended"] as const).includes(
    player.competition.status as any
  )
    ? (player.competition.status as "draft" | "active" | "ended")
    : "draft";

  let photoUrl: string | undefined = undefined;
  if (player.photo) {
    // transformer le buffer en base64 directement pour le front
    photoUrl = `data:image/jpeg;base64,${Buffer.from(player.photo).toString(
      "base64"
    )}`;
  }

  return {
    _id: player.id,
    slug: player.slug,
    firstName: player.firstName,
    lastName: player.lastName,
    age: player.age,
    team: player.team ?? undefined,
    position: player.position ?? undefined,
    bio: player.bio ?? undefined,
    photoUrl, // <-- ici on envoie la base64
    votesConfirmed: player.votesConfirmed,
    votesPending: player.votesPending,
    createdAt: player.createdAt,
    updatedAt: player.updatedAt,
    competitionId: player.competitionId,
    competitionName: player.competition.name,
    competitionSlug: player.competition.slug,
    competitionStatus: status,
    revenue: player.votesConfirmed * player.competition.votePrice,
  };
}
