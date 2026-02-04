import { NextRequest, NextResponse } from 'next/server';
import { logError, logWarn, logSuccess, logInfo } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Log authentication attempt (without logging the password itself!)
    logInfo('Authentication attempt received', { 
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    });

    // Password MUST be set via environment variable - no defaults!
    const AUTH_PASSWORD = process.env.DAXPER_AUTH_PASSWORD;

    if (!AUTH_PASSWORD) {
      logError('Authentication failed - DAXPER_AUTH_PASSWORD not configured');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (password === AUTH_PASSWORD) {
      logSuccess('Authentication successful');
      
      return NextResponse.json({
        success: true,
        token: 'session-token-' + Date.now(),
      });
    }

    // Log failed attempt (security audit trail)
    logWarn('Authentication failed - Invalid password', {
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    );
  } catch (error) {
    logError('Login API error', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
