import './globals.css';

export const metadata = {
  title: 'CandiGo',
  description: 'Infórmate con CandiGo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Favicon usando Logo.Solo.png */}
        <link rel="icon" type="image/png" href="/LogoSolo.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
