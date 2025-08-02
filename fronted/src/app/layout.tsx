// filepath: c:\Users\Goliva\Desktop\Modular\supabase-login-app\src\app\layout.tsx
export const metadata = {
  title: 'CandiGo',
  description: 'Informate con CandiGo',
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