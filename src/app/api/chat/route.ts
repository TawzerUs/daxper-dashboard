import { NextRequest, NextResponse } from 'next/server';
import { logError, logWarn, logSuccess, logInfo } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    // Get OpenClaw gateway credentials from environment
    const GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL;
    const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN;

    // Log chat request
    logInfo('Chat message received', {
      messageLength: message?.length || 0,
      hasGatewayUrl: !!GATEWAY_URL,
      hasGatewayToken: !!GATEWAY_TOKEN,
      timestamp: new Date().toISOString(),
    });

    // Validate environment configuration
    if (!GATEWAY_TOKEN) {
      logError('OpenClaw gateway token not configured', {
        hasUrl: !!GATEWAY_URL,
      });
      return NextResponse.json(
        { 
          error: 'OpenClaw gateway token not configured. Set OPENCLAW_GATEWAY_TOKEN env variable.',
          debug: 'Gateway URL is configured but token is missing' 
        },
        { status: 500 }
      );
    }

    if (!GATEWAY_URL) {
      logError('OpenClaw gateway URL not configured', {
        hasToken: !!GATEWAY_TOKEN,
      });
      return NextResponse.json(
        { 
          error: 'OpenClaw gateway URL not configured. Set OPENCLAW_GATEWAY_URL env variable.',
          debug: 'Gateway token is configured but URL is missing' 
        },
        { status: 500 }
      );
    }

    // Check if gateway URL is localhost and provide helpful error
    if (GATEWAY_URL.includes('localhost')) {
      logWarn('Gateway URL is set to localhost - this only works in development');
      return NextResponse.json({
        error: 'Gateway URL is set to localhost. This only works when running locally with `npm run dev`. For production deployment, either:',
        details: {
          options: [
            '1. Deploy the OpenClaw gateway to a public URL (ngrok, tunnel, or public server)',
            '2. Run the dashboard locally instead of deploying to Hostinger',
            '3. Set OPENCLAW_GATEWAY_URL to your actual server address',
          ],
        }
      });
    }

    // Send message to OpenClaw gateway via sessions_send
    // Note: This requires the gateway to be running and accessible
    const gatewayResponse = await fetch(`${GATEWAY_URL}/sessions/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GATEWAY_TOKEN}`,
      },
      body: JSON.stringify({
        message: message,
        label: 'main', // Send to main agent session
      }),
    });

    if (!gatewayResponse.ok) {
      logError('Failed to communicate with OpenClaw gateway', {
        status: gatewayResponse.status,
        statusText: gatewayResponse.statusText,
        url: GATEWAY_URL,
      });
      return NextResponse.json(
        { 
          error: 'Failed to communicate with OpenClaw gateway',
          details: `The gateway at ${GATEWAY_URL} may not be running or accessible` 
        },
        { status: 502 }
      );
    }

    const data = await gatewayResponse.json();
    
    logSuccess('Message sent to OpenClaw gateway successfully');
    
    return NextResponse.json({
      success: true,
      response: data.response || 'Message sent successfully',
    });

  } catch (error) {
    logError('Chat API error', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
