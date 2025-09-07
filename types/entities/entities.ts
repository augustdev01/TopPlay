// types/entities.ts
export interface CompetitionEntity {
  _id: string;
  name: string;
  slug: string;
  status: "draft" | "active" | "ended";
  votePrice: number;
  startDate?: Date;
  endDate?: Date;
  rules?: string;
  description?: string;
  playersCount: number;
  totalVotes: number;
  revenue: number;
}
export interface PlayerEntity {
  _id: string;
  firstName: string;
  lastName: string;
  slug: string;
  age: number;
  team?: string;
  position?: string;
  bio?: string;
  photoUrl?: string;
  votesConfirmed: number;
  votesPending: number;
  competitionId: string;
  competitionName: string;
  competitionSlug: string;
  competitionStatus: string;
  revenue: number;
  createdAt: Date;
  updatedAt: Date;
}
