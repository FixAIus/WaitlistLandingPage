import { NextRequest } from "next/server";
import { verifyWebhook, WebhookEvent } from '@clerk/nextjs/webhooks'

async function handleUserCreated(evt: WebhookEvent) {
  try {
    console.log('Processing user created:', evt.data);
    
    // Extract user data from the webhook event
    const userData = evt.data;
    
    // Here you can add logic to:
    // 1. Send welcome email
    // 2. Add to your CRM
    // 3. Send invitation to your platform
    // 4. Update database status
    
    console.log('Successfully processed user creation');
    
  } catch (error) {
    console.error('Error handling user creation:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Webhook endpoint hit - processing request...');
    
    const evt: WebhookEvent = await verifyWebhook(request);
    console.log('Webhook verified successfully. Event type:', evt.type);
    console.log('Event data:', JSON.stringify(evt.data, null, 2));

    switch (evt.type) {
      case 'user.created':
        await handleUserCreated(evt);
        break;
      case 'user.updated':
        console.log('User updated:', evt.data);
        break;
      case 'user.deleted':
        console.log('User deleted:', evt.data);
        break;
      case 'email.created':
        console.log('Email created/sent:', evt.data);
        break;
      case 'sms.created':
        console.log('SMS created/sent:', evt.data);
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