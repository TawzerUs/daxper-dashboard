import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Simple password authentication
    const AUTH_PASSWORD = process.env.DAXPER_AUTH_PASSWORD || 'daxper2026';

    if (password === AUTH_PASSWORD) {
        return NextResponse.json({
            success: true,
            token: 'session-token-' + Date.now(),
        });
    }

    return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
        { success: false, error: 'Server error' },
        { status: 500 }
    );
  }
}
