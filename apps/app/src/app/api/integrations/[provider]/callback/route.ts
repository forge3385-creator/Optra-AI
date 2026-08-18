import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { provider: string } }
) {
  const provider = params.provider;
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL(`/integrations?error=${encodeURIComponent(error)}`, request.nextUrl.origin));
  }

  if (!code) {
    return NextResponse.redirect(new URL(`/integrations?error=missing_code`, request.nextUrl.origin));
  }

  // Token exchange would occur here on server:
  // const tokens = await exchangeCodeForTokens(provider, code);
  // Store encrypted token in integration_connections table in PostgreSQL / Supabase
  // Never expose credentials to frontend

  // Redirect to integrations hub with success parameter
  const successUrl = new URL('/integrations', request.nextUrl.origin);
  successUrl.searchParams.set('connected', provider);

  return NextResponse.redirect(successUrl.toString());
}
