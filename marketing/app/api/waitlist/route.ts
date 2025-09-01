import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';
import { createClerkClient } from '@clerk/backend'


const prisma = new PrismaClient();
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      full_name, 
      email, 
      instagram_username, 
      interest_reason, 
      planned_usage, 
      business_instagram 
    } = body;

    // Validate required fields
    if (!full_name || !email || !instagram_username) {
      return NextResponse.json(
        { error: 'Full name, email, and Instagram username are required' },
        { status: 400 }
      );
    }

    // Check if email already exists in waitlist
    const existingEntry = await prisma.waitlist.findUnique({
      where: { email }
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    // Create Clerk user
    let clerkUserId = null;
    try {
      const clerkUser = await clerkClient.waitlistEntries.create({
        emailAddress: email,
        notify: true
      });
      clerkUserId = clerkUser.id;
    } catch (clerkError) {
      console.warn('Error creating Clerk user:', clerkError);
    }

    // Create waitlist entry
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        clerk_id: clerkUserId,
        email,
        full_name,
        instagram_username,
        interest_reason,
        planned_usage,
        business_instagram,
        status: 'pending'
      }
    });

    return NextResponse.json(
      { 
        message: 'Successfully added to waitlist',
        id: waitlistEntry.id,
        clerkUserId: clerkUserId
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}