import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Usamos Fira Code para todo el sitio como pidió el usuario
const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "<JonaScript_ />",
  description: "Un espacio introspectivo para historias y reflexiones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${firaCode.variable}`}>
      <body className="antialiased bg-[#fafafa] text-black font-fira min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-[#fafafa] my-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
