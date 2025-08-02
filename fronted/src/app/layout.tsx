// filepath: c:\Users\Goliva\Desktop\Modular\supabase-login-app\src\app\layout.tsx
export const metadata = {
  title: 'Supabase Login App',
  description: 'Aplicación de inicio de sesión con Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}