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
      timestamp: new Date().toISOString(),
    });

    // Validate environment configuration
    if (!GATEWAY_TOKEN) {
      logError('OpenClaw gateway not configured', {
        hasUrl: !!GATEWAY_URL,
        hasToken: false,
      });
      return NextResponse.json(
        { error: 'OpenClaw gateway not configured. Set OPENCLAW_GATEWAY_TOKEN env variable.' },
        { status: 500 }
      );
    }

    if (!GATEWAY_URL) {
      logError('OpenClaw gateway URL not configured', {
        hasToken: true,
        hasUrl: false,
      });
      return NextResponse.json(
        { error: 'OpenClaw gateway URL not configured. Set OPENCLAW_GATEWAY_URL env variable.' },
        { status: 500 }
      );
    }

    // Send message to OpenClaw gateway
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
      });
      return NextResponse.json(
        { error: 'Failed to communicate with OpenClaw gateway' },
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
