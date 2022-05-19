import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import type { AppProps } from 'next/app';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default CustomApp;
