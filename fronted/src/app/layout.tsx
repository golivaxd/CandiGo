export const metadata = {
  title: 'CandiGo',
  description: 'Informate con CandiGo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Favicon usando bb.webp */}
        <link rel="icon" type="image/webp" href="/b.webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}
