/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Waitlist` table. All the data in the column will be lost.
  - You are about to drop the column `joinedAt` on the `Waitlist` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Waitlist` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Clients" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Waitlist" DROP COLUMN "createdAt",
DROP COLUMN "joinedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "joined_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);
