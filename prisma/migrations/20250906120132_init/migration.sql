-- CreateTable
CREATE TABLE "public"."competitions" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "votePrice" INTEGER NOT NULL DEFAULT 200,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "rules" TEXT,
    "description" TEXT,
    "wavePaymentBaseUrl" TEXT,
    "redirectUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."players" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "team" TEXT,
    "position" TEXT,
    "bio" TEXT,
    "photoUrl" TEXT,
    "votesConfirmed" INTEGER NOT NULL DEFAULT 0,
    "votesPending" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."orders" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "unitPrice" INTEGER NOT NULL DEFAULT 200,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "stateToken" TEXT NOT NULL,
    "checkoutUrl" TEXT NOT NULL,
    "waveTransactionRef" TEXT,
    "customerPhone" TEXT,
    "customerEmail" TEXT,
    "callbackData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transactions" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "competition" TEXT NOT NULL,
    "transactionRef" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'XOF',
    "provider" TEXT NOT NULL DEFAULT 'WAVE',
    "source" TEXT NOT NULL,
    "raw" JSONB,
    "validatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admins" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "competitions_slug_key" ON "public"."competitions"("slug");

-- CreateIndex
CREATE INDEX "players_votesConfirmed_idx" ON "public"."players"("votesConfirmed");

-- CreateIndex
CREATE UNIQUE INDEX "players_competitionId_slug_key" ON "public"."players"("competitionId", "slug");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "public"."orders"("status");

-- CreateIndex
CREATE INDEX "orders_playerId_idx" ON "public"."orders"("playerId");

-- CreateIndex
CREATE INDEX "orders_competitionId_idx" ON "public"."orders"("competitionId");

-- CreateIndex
CREATE INDEX "orders_waveTransactionRef_idx" ON "public"."orders"("waveTransactionRef");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_transactionRef_key" ON "public"."transactions"("transactionRef");

-- CreateIndex
CREATE INDEX "transactions_orderId_idx" ON "public"."transactions"("orderId");

-- CreateIndex
CREATE INDEX "transactions_status_idx" ON "public"."transactions"("status");

-- CreateIndex
CREATE INDEX "transactions_competitionId_idx" ON "public"."transactions"("competitionId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "public"."admins"("email");

-- AddForeignKey
ALTER TABLE "public"."players" ADD CONSTRAINT "players_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "public"."competitions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "public"."competitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "public"."competitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
