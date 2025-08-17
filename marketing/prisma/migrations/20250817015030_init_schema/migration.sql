-- CreateTable
CREATE TABLE "public"."Waitlist" (
    "id" TEXT NOT NULL,
    "clerk_id" TEXT,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "full_name" TEXT,
    "last_name" TEXT,
    "instagram_username" TEXT,
    "interest_reason" TEXT,
    "planned_usage" TEXT,
    "business_instagram" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "joinedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Clients" (
    "id" TEXT NOT NULL,
    "clerk_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "full_name" TEXT,
    "last_name" TEXT,
    "profile_image_url" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_clerk_id_key" ON "public"."Waitlist"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_email_key" ON "public"."Waitlist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_clerk_id_key" ON "public"."Clients"("clerk_id");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "public"."Clients"("email");
