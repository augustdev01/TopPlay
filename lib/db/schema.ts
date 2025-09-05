import { pgTable, text, integer, timestamp, boolean, uuid, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Competitions table
export const competitions = pgTable('competitions', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  status: text('status').notNull().default('draft'), // draft, active, ended
  votePrice: integer('vote_price').notNull().default(200),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  rules: text('rules'),
  description: text('description'),
  wavePaymentBaseUrl: text('wave_payment_base_url'),
  redirectUrl: text('redirect_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: uniqueIndex('competitions_slug_idx').on(table.slug),
  statusIdx: index('competitions_status_idx').on(table.status),
}));

// Players table
export const players = pgTable('players', {
  id: uuid('id').defaultRandom().primaryKey(),
  competitionId: uuid('competition_id').notNull().references(() => competitions.id, { onDelete: 'cascade' }),
  slug: text('slug').notNull(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  age: integer('age').notNull(),
  team: text('team'),
  position: text('position'),
  bio: text('bio'),
  photoUrl: text('photo_url'),
  votesConfirmed: integer('votes_confirmed').notNull().default(0),
  votesPending: integer('votes_pending').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  competitionSlugIdx: uniqueIndex('players_competition_slug_idx').on(table.competitionId, table.slug),
  competitionIdx: index('players_competition_idx').on(table.competitionId),
  votesIdx: index('players_votes_idx').on(table.votesConfirmed),
}));

// Orders table
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  competitionId: uuid('competition_id').notNull().references(() => competitions.id),
  playerId: uuid('player_id').notNull().references(() => players.id),
  unitPrice: integer('unit_price').notNull().default(200),
  quantity: integer('quantity').notNull().default(1),
  amount: integer('amount').notNull(),
  status: text('status').notNull().default('pending'), // pending, paid, failed, cancelled
  stateToken: text('state_token').notNull(),
  checkoutUrl: text('checkout_url').notNull(),
  waveTransactionRef: text('wave_transaction_ref'),
  customerPhone: text('customer_phone'),
  customerEmail: text('customer_email'),
  callbackData: text('callback_data'), // JSON string
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  statusIdx: index('orders_status_idx').on(table.status),
  playerIdx: index('orders_player_idx').on(table.playerId),
  competitionIdx: index('orders_competition_idx').on(table.competitionId),
  waveRefIdx: index('orders_wave_ref_idx').on(table.waveTransactionRef),
}));

// Transactions table
export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').notNull().references(() => orders.id),
  competitionId: uuid('competition_id').notNull().references(() => competitions.id),
  playerId: uuid('player_id').notNull().references(() => players.id),
  playerName: text('player_name').notNull(),
  competition: text('competition').notNull(),
  transactionRef: text('transaction_ref').notNull(),
  status: text('status').notNull().default('submitted'), // submitted, confirmed, rejected, auto_confirmed
  amount: integer('amount').notNull(),
  currency: text('currency').notNull().default('XOF'),
  provider: text('provider').notNull().default('WAVE'),
  source: text('source').notNull(), // callback, user_input, admin, api_verification
  raw: text('raw'), // JSON string
  validatedAt: timestamp('validated_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  orderIdx: index('transactions_order_idx').on(table.orderId),
  transactionRefIdx: uniqueIndex('transactions_ref_idx').on(table.transactionRef),
  statusIdx: index('transactions_status_idx').on(table.status),
  competitionIdx: index('transactions_competition_idx').on(table.competitionId),
}));

// Admins table
export const admins = pgTable('admins', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('admins_email_idx').on(table.email),
}));

// Relations
export const competitionsRelations = relations(competitions, ({ many }) => ({
  players: many(players),
  orders: many(orders),
  transactions: many(transactions),
}));

export const playersRelations = relations(players, ({ one, many }) => ({
  competition: one(competitions, {
    fields: [players.competitionId],
    references: [competitions.id],
  }),
  orders: many(orders),
  transactions: many(transactions),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  competition: one(competitions, {
    fields: [orders.competitionId],
    references: [competitions.id],
  }),
  player: one(players, {
    fields: [orders.playerId],
    references: [players.id],
  }),
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  order: one(orders, {
    fields: [transactions.orderId],
    references: [orders.id],
  }),
  competition: one(competitions, {
    fields: [transactions.competitionId],
    references: [competitions.id],
  }),
  player: one(players, {
    fields: [transactions.playerId],
    references: [players.id],
  }),
}));