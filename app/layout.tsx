import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Elite Titan Culinary",
  description: "Maquinaria industrial para procesamiento de alimentos.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-white text-black pt-[76px]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
