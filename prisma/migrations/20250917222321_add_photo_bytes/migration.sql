/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `players` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."players" DROP COLUMN "photoUrl",
ADD COLUMN     "photo" BYTEA;
