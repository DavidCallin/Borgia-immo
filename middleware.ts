import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Exclure /studio (Sanity) ainsi que les assets et routes techniques Next.
  matcher: ['/((?!api|trpc|_next|_vercel|studio|.*\\..*).*)'],
};
