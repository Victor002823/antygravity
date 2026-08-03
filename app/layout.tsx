import "./globals.css";

export const metadata = {
  title: "Antygravity App",
  description: "Desarrollo local en Termux",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}
