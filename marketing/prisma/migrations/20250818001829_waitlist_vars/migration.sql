/*
  Warnings:

  - Made the column `full_name` on table `Clients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `full_name` on table `Waitlist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Waitlist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Clients" ALTER COLUMN "full_name" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Waitlist" ALTER COLUMN "full_name" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
