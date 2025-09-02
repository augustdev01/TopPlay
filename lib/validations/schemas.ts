import { z } from 'zod';

export const competitionSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  slug: z.string().min(1, 'Le slug est requis').regex(/^[a-z0-9-]+$/, 'Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets'),
  status: z.enum(['draft', 'active', 'ended']),
  votePrice: z.number().min(50, 'Le prix minimum est 50 FCFA').max(1000, 'Le prix maximum est 1000 FCFA'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  rules: z.string().optional(),
  description: z.string().optional(),
});

export const playerSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  slug: z.string().min(1, 'Le slug est requis').regex(/^[a-z0-9-]+$/, 'Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets'),
  age: z.number().min(16, 'L\'âge minimum est 16 ans').max(50, 'L\'âge maximum est 50 ans'),
  team: z.string().optional(),
  position: z.string().optional(),
  bio: z.string().optional(),
  photoUrl: z.string().url('URL invalide').optional().or(z.literal('')),
});

export const voteSchema = z.object({
  competitionSlug: z.string().min(1),
  playerSlug: z.string().min(1),
  customerPhone: z.string().min(8, 'Numéro de téléphone requis').regex(/^(\+221)?[0-9]{8,9}$/, 'Format de numéro sénégalais invalide'),
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

export const transactionValidationSchema = z.object({
  transactionRef: z.string().min(1, 'Référence de transaction requise'),
  source: z.enum(['sms', 'email', 'backoffice', 'user']),
  notes: z.string().optional(),
});