'use client';
import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export function useAuth(onAuth: (session: any) => void) {
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          onAuth(session);
        } else if (event === 'SIGNED_OUT') {
          onAuth(null);
        }
      }
    );

    return () => subscription?.subscription?.unsubscribe();
  }, [onAuth]);
}

