import { NextRequest } from "next/server";
import { verifyWebhook, WebhookEvent } from '@clerk/nextjs/webhooks'
import { PrismaClient } from '@/lib/generated/prisma';
import { WaitlistEntryJSON, UserJSON } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

async function handleUpdatedWaitlistEntry(evt: WebhookEvent) {
  try {
    console.log('Processing waitlist entry update:', evt.data);

    const userData = evt.data as WaitlistEntryJSON;
    const invitation = userData?.invitation as any;

    const waitlistEntry = await prisma.waitlist.update({
      where: {
        clerk_id: userData.id
      },
      data: { 
        status: userData.status,
        invitation_expires_at: invitation?.expires_at
          ? new Date(invitation.expires_at)
          : null,
      }
    });
    console.log('Successfully processed waitlist entry update:', waitlistEntry);
    
  } catch (error) {
    console.error('Error handling user waitlist entry update:', error);
    throw error;
  }
}

async function handleUserCreation(evt: WebhookEvent) {
  try {
    console.log('Processing user created:', evt.data);

    const userData = evt.data as UserJSON;
    const userEmail = userData.email_addresses?.[0]?.email_address;
    const userClerkId = userData.id;

    if (!userEmail) {
      console.error('No email address found for user:', userData.id);
      return;
    }

    // First, check if a client already exists with this clerk_id
    const existingClient = await prisma.clients.findUnique({
      where: { clerk_id: userData.id }
    });

    if (existingClient) {
      console.log('Client already exists with clerk_id:', userData.id);
      return;
    }

    // Find the waitlist entry by email
    const existingWaitlistEntry = await prisma.waitlist.findUnique({
      where: {
        email: userEmail,
        invitation_expires_at: {
          gt: new Date() // verify that the invitation is still valid
        }
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        full_name: true,
        email: true,
        clerk_id: true
      }
    });

    if (!existingWaitlistEntry) {
      console.error('User not found in the waitlist with email:', userEmail);
      return;
    }

    console.log(`Successfully fetched data from user in the waitlist: ${JSON.stringify(existingWaitlistEntry)}`);

    // Create the user in the database
    await prisma.clients.create({
      data: {
        clerk_id: userData.id,
        email: existingWaitlistEntry.email,
        first_name: existingWaitlistEntry?.first_name,
        last_name: existingWaitlistEntry?.last_name,
        full_name: existingWaitlistEntry.full_name,
        profile_image_url: userData?.image_url,
      }
    });

    // Update the waitlist entry to show that the user has joined and set the clerk_id
    await prisma.waitlist.update({
      where: {
        id: existingWaitlistEntry.id
      },
      data: {
        //clerk_id: userData.id,
        joined_at: new Date(),
      }
    });

    console.log('Successfully created client and updated waitlist entry for user:', userData.id);

  } catch (error) {
    console.error('Error handling user creation:', error);
    throw error;
  }
}

// TODO: Implement user update
// async function handleUserUpdate(evt: WebhookEvent) {
//   try {
//     console.log('Processing user update:', evt.data);

//     const userData = evt.data as UserJSON;
    
//     // Handle profile image updates
//     if (userData?.image_url) {
//       try {
//         console.log('Processing profile image update for user:', userData.id);
//         console.log('New profile image URL:', userData.image_url);
        
//         // Update the client record with the new profile image
//         await prisma.clients.update({
//           where: { clerk_id: userData.id },
//           data: { profile_image_url: userData.image_url }
//         });
        
//         console.log('Successfully updated client profile image for user:', userData.id);
//       } catch (error) {
//         console.error('Failed to update client profile image for user:', userData.id, error);
//       }
//     }
    
//     console.log('Successfully processed user update for user:', userData.id);
    
//   } catch (error) {
//     console.error('Error handling user update:', error);
//     throw error;
//   }
// }

export async function POST(request: NextRequest) {
  try {
    console.debug('Webhook endpoint hit - processing request...');
    
    const evt: WebhookEvent = await verifyWebhook(request);
    console.log('Webhook verified successfully. Event type:', evt.type);

    switch (evt.type) {
      case 'waitlistEntry.updated':
        await handleUpdatedWaitlistEntry(evt);
        break;
      case 'user.created':
        await handleUserCreation(evt);
        break;
      case 'user.updated':
      //   await handleUserUpdate(evt);
        break;
      case 'user.deleted':
        // console.log('User deleted:', evt.data);
        break;
      default:
        console.log('Unhandled webhook type:', evt.type);
    }

    console.log('Webhook processed successfully');
    return new Response('Webhook processed successfully', { status: 200 });
  } catch (err) {
    console.error('Error in webhook processing:', err);
    return new Response('Error processing webhook', { status: 400 });
  }
}