/*
  Warnings:

  - Added the required column `type` to the `onRampTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Deposite', 'P2P');

-- AlterTable
ALTER TABLE "onRampTransactions" ADD COLUMN     "type" "TransactionType" NOT NULL;
