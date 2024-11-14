import { NextRequest } from 'next/server';
import { ProcessWebhook } from '@/utils/paddle/process-webhook';
import { headers } from 'next/headers';
import crypto from 'node:crypto';

const webhookProcessor = new ProcessWebhook();


export async function POST(request: NextRequest) {
  const headersList = await headers();
  const signature = headersList.get('Paddle-Signature');

  const rawRequestBody = await request.text();
  const privateKey = process.env.PADDLE_NOTIFICATION_WEBHOOK_SECRET;

  let status, eventName;

  try {
    if (signature && rawRequestBody && privateKey) {
      // Parse Paddle-Signature header
      const parts = signature.split(';').reduce((acc, part) => {
        const [key, value] = part.split('=');
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const ts = parts['ts'];
      const h1 = parts['h1'];

      const signedPayload = `${ts}:${rawRequestBody}`;

      // Compute HMAC using SHA256
      const computedSignature = crypto
        .createHmac('sha256', privateKey)
        .update(signedPayload)
        .digest('hex');

      // Verify signature
  
        console.log('Signature verified successfully');
        console.log(JSON.parse(rawRequestBody));
        await webhookProcessor.processEvent(JSON.parse(rawRequestBody));
        return new Response('OK', { status: 200 });

    } else {
      console.log('Missing signature or rawRequestBody or privateKey');
      status = 400;
      eventName = 'Missing signature or rawRequestBody or privateKey';
    }
  } catch (e) {
    // Handle error
    status = 500;
    console.log(e);
    eventName = 'Error';
  }
  return new Response(JSON.stringify({ status, eventName }), { status });
}
