import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protéger les routes admin (simulation)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // En production, vérifier le token d'authentification
    // Pour la démo, on laisse passer
    return NextResponse.next();
  }

  // Rate limiting simulation pour les API publiques
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/admin/')) {
    // En production, implémenter un vrai rate limiting
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'
  ]
};