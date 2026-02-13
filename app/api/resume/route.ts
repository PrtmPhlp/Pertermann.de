import { NextRequest, NextResponse } from 'next/server';

const RESUME_PASSWORD = process.env.RESUME_PASSWORD;
const RESUME_CDN_URL: string =
  process.env.RESUME_CDN_URL ||
  'https://files.pertermann.de/pertermann-cdn/resume.md';
const RESUME_CDN_USER = process.env.RESUME_CDN_USER || 'pertermann-webserver';
const RESUME_CDN_PASS = process.env.RESUME_CDN_PASS;

const RATE_LIMIT_WINDOW_MS = Number(
  process.env.RESUME_RATE_LIMIT_WINDOW_MS ?? 900000,
);
const RATE_LIMIT_MAX_ATTEMPTS = Number(
  process.env.RESUME_RATE_LIMIT_MAX_ATTEMPTS ?? 10,
);
const CDN_TIMEOUT_MS = Number(process.env.RESUME_CDN_TIMEOUT_MS ?? 5000);

type AttemptEntry = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, AttemptEntry>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? 'unknown';
  }

  const realIp = request.headers.get('x-real-ip');
  return realIp?.trim() || 'unknown';
}

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const current = attempts.get(clientId);

  if (!current || now > current.resetAt) {
    attempts.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return false;
  }

  current.count += 1;
  attempts.set(clientId, current);
  return true;
}

function getSafeResumeUrl(): URL | null {
  try {
    const url = new URL(RESUME_CDN_URL);
    if (url.protocol !== 'https:') return null;
    if (url.hostname !== 'files.pertermann.de') return null;
    return url;
  } catch {
    return null;
  }
}

function looksLikeHtmlDocument(content: string): boolean {
  return /^\s*<(?:!doctype|html|head|body)\b/i.test(content);
}

function jsonNoStore(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      Pragma: 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    },
    status,
  });
}

export async function POST(request: NextRequest) {
  if (!RESUME_PASSWORD) {
    return jsonNoStore({ error: 'Server-Konfiguration fehlt' }, 500);
  }

  try {
    const clientIp = getClientIp(request);
    if (!checkRateLimit(`resume:${clientIp}`)) {
      return jsonNoStore({ error: 'Zu viele Versuche. Später erneut.' }, 429);
    }

    const { password } = await request.json();

    if (password !== RESUME_PASSWORD) {
      return jsonNoStore({ error: 'Falsches Passwort' }, 401);
    }

    // Fetch resume from external CDN with Basic Auth
    if (!RESUME_CDN_PASS) {
      return jsonNoStore({ error: 'CDN-Konfiguration fehlt' }, 500);
    }

    const safeResumeUrl = getSafeResumeUrl();
    if (!safeResumeUrl) {
      return jsonNoStore({ error: 'Ungültige CDN-URL' }, 500);
    }

    const credentials = Buffer.from(
      `${RESUME_CDN_USER}:${RESUME_CDN_PASS}`,
    ).toString('base64');

    const cdnResponse = await fetch(safeResumeUrl, {
      cache: 'no-store',
      headers: {
        Accept: 'text/markdown,text/plain;q=0.9,*/*;q=0.1',
        Authorization: `Basic ${credentials}`,
      },
      signal: AbortSignal.timeout(CDN_TIMEOUT_MS),
    });

    if (!cdnResponse.ok) {
      console.error('CDN fetch failed:', cdnResponse.status);
      return jsonNoStore(
        { error: 'Lebenslauf konnte nicht geladen werden' },
        502,
      );
    }

    const content = await cdnResponse.text();
    const contentType = cdnResponse.headers.get('content-type') ?? '';

    if (contentType.includes('text/html') || looksLikeHtmlDocument(content)) {
      console.error('CDN returned unexpected HTML response.');
      return jsonNoStore(
        { error: 'Lebenslauf konnte nicht geladen werden' },
        502,
      );
    }

    return jsonNoStore({ content }, 200);
  } catch {
    return jsonNoStore({ error: 'Ungültige Anfrage' }, 400);
  }
}
