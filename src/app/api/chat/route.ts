import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    // Get OpenClaw gateway credentials from environment
    const GATEWAY_URL = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:18789';
    const GATEWAY_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN;

    if (!GATEWAY_TOKEN) {
      return NextResponse.json(
        { error: 'OpenClaw gateway not configured. Set OPENCLAW_GATEWAY_TOKEN env variable.' },
        { status: 500 }
      );
    }

    // Send message to OpenClaw gateway via sessions_send
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
      return NextResponse.json(
        { error: 'Failed to communicate with OpenClaw gateway' },
        { status: 502 }
      );
    }

    const data = await gatewayResponse.json();

    return NextResponse.json({
      success: true,
      response: data.response || 'Message sent successfully',
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}
