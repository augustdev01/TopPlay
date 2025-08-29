import { z } from 'zod';

export const competitionSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  slug: z.string().min(1, 'Le slug est requis'),
  status: z.enum(['draft', 'active', 'ended']),
  votePrice: z.number().min(0, 'Le prix doit être positif'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  rules: z.string().optional(),
  description: z.string().optional(),
});

export const playerSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  slug: z.string().min(1, 'Le slug est requis'),
  age: z.number().min(1, 'L\'âge doit être positif'),
  team: z.string().optional(),
  position: z.string().optional(),
  bio: z.string().optional(),
  photoUrl: z.string().url().optional(),
});

export const voteSchema = z.object({
  competitionSlug: z.string().min(1),
  playerSlug: z.string().min(1),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email().optional(),
});

export const proofSubmissionSchema = z.object({
  orderId: z.string().min(1),
  transactionRef: z.string().min(1, 'La référence de transaction est requise'),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email().optional(),
});

export const adminLoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
});