// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('supabaseUrl and supabaseKey are required.');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true, // 👈 súper importante para reset password / magic links
  },
});

// Hook para escuchar cambios de sesión
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

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, [onAuth]);
}

// SignUp (ejemplo)
export const handleSignUp = async (
  e: React.FormEvent,
  email: string,
  password: string
) => {
  e.preventDefault();
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error('Error al registrarse:', error);
    } else {
      console.log('Registro exitoso:', data);
    }
  } catch (err) {
    console.error('Error inesperado:', err);
  }
};
