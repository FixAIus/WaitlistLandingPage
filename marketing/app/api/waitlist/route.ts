import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '../../../lib/generated/prisma';

const prisma = new PrismaClient();

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
      const clerkResponse = await fetch('https://api.clerk.com/v1/waitlist_entries', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          notify: true
        }),
      });

      if (clerkResponse.ok) {
        const clerkUser = await clerkResponse.json();
        clerkUserId = clerkUser.id;
      } else {
        console.warn('Failed to create Clerk user:', await clerkResponse.text());
      }
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
        business_instagram
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