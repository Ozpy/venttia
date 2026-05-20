import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venttia | Modernización y Organización Digital para Negocios Locales",
  description: "Configuramos y conectamos Google Maps, WhatsApp y sistemas de reservas para que tu negocio local consiga más clientes, evite citas olvidadas y se vea 100% profesional sin complicaciones.",
  keywords: [
    "organización digital",
    "negocios locales",
    "optimización Google Maps",
    "reseñas Google",
    "NFC reseñas",
    "agenda digital",
    "reservas en línea",
    "WhatsApp Business profesional",
    "recordatorios WhatsApp",
    "modernizar negocio local"
  ],
  authors: [{ name: "Venttia" }],
  creator: "Venttia",
  publisher: "Venttia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Venttia | Modernización y Organización Digital para Negocios Locales",
    description: "Configuramos Google Maps, WhatsApp y reservas para que tu negocio se vea y funcione más profesional. Nos encargamos de todo el trabajo técnico por ti.",
    url: "https://venttia.com",
    siteName: "Venttia",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venttia | Modernización y Organización Digital para Negocios Locales",
    description: "Hacemos que tu negocio local se vea y funcione más profesional. Google Maps, WhatsApp y reservas bien conectados y mantenidos mes con mes.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">{children}</body>
    </html>
  );
}
