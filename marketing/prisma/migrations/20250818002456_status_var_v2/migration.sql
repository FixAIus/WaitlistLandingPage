-- AlterTable
ALTER TABLE "public"."Waitlist" ADD COLUMN     "invitation_expires_at" TIMESTAMP(3),
ADD COLUMN     "status" TEXT;
