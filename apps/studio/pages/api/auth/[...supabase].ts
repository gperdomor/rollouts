import { handleAuth } from '@supabase/auth-helpers-nextjs';

export default handleAuth({
  logout: { returnTo: '/' },
  cookieOptions: { lifetime: 1 * 7 * 24 * 60 * 60 }, // Keep the user logged in for 7 days.
});
