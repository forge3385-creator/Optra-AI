import { NextRequest, NextResponse } from 'next/server';

const PROVIDER_CONFIGS: Record<string, { authUrl: string; scopes: string[] }> = {
  google_calendar: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scopes: ['https://www.googleapis.com/auth/calendar.events.readonly', 'https://www.googleapis.com/auth/calendar.events'],
  },
  google_drive: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scopes: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/drive.metadata.readonly'],
  },
  slack: {
    authUrl: 'https://slack.com/oauth/v2/authorize',
    scopes: ['chat:write', 'channels:read', 'incoming-webhook'],
  },
  gmail: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scopes: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send'],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  const provider = params.provider;
  const config = PROVIDER_CONFIGS[provider];

  if (!config) {
    return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
  }

  // Build OAuth authorization URL with state parameter for CSRF protection
  const state = Buffer.from(JSON.stringify({
    provider,
    tenantId: '11111111-1111-1111-1111-111111111111',
    timestamp: Date.now()
  })).toString('base64');

  const clientId = process.env[`${provider.toUpperCase()}_CLIENT_ID`] || `optra-demo-client-${provider}`;
  const redirectUri = `${request.nextUrl.origin}/api/integrations/${provider}/callback`;

  const authRedirect = new URL(config.authUrl);
  authRedirect.searchParams.set('client_id', clientId);
  authRedirect.searchParams.set('redirect_uri', redirectUri);
  authRedirect.searchParams.set('response_type', 'code');
  authRedirect.searchParams.set('scope', config.scopes.join(' '));
  authRedirect.searchParams.set('state', state);
  authRedirect.searchParams.set('access_type', 'offline');
  authRedirect.searchParams.set('prompt', 'consent');

  // In production with credentials set, redirect to provider:
  if (process.env[`${provider.toUpperCase()}_CLIENT_ID`]) {
    return NextResponse.redirect(authRedirect.toString());
  }

  // In dev / demo mode: simulate successful connection callback redirect
  const demoCallbackUrl = new URL(`/api/integrations/${provider}/callback`, request.nextUrl.origin);
  demoCallbackUrl.searchParams.set('code', `demo_auth_code_${Date.now()}`);
  demoCallbackUrl.searchParams.set('state', state);

  return NextResponse.redirect(demoCallbackUrl.toString());
}
