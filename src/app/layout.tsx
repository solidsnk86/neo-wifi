import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "@/providers/themeProvider";
import { ThemeInitializer } from "./components/ThemeInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neo-wifi.vercel.app"),
  title: {
    default: "Neo - Configuración Automatizada TP-Link",
    template: "%s | Neo Wifi",
  },
  description:
    "Detecta la red WiFi 📡 más cercana y conoce tu distancia a ella. Configura automáticamente cualquier dispositivo TP-LINK CPE y Routers con nuestra app de escritorio.",
  verification: {
    google: "d63HZekGRdCdNJHUFilLobhIc-eQrbGisGKLfHO-sjo",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://neo-wifi.vercel.app/",
    siteName: "Neo Wifi",
    title: "Neo - Configuración Automatizada TP-Link",
    description:
      "Optimiza y configura tus dispositivos CPE y Routers TP-Link de forma rápida y sencilla.",
    images: [
      {
        url: "/neo-wifi-satelite.webp",
        width: 1200,
        height: 630,
        alt: "Neo Wifi Satellite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neo - Configuración Automatizada TP-Link",
    description:
      "Optimiza y configura tus dispositivos CPE y Routers TP-Link de forma rápida y sencilla.",
    images: ["/neo-wifi-satelite.webp"],
  },
  authors: [{ name: "Neo Wifi Team" }],
  keywords: [
    "TP-Link",
    "Configuración WiFi",
    "CPE",
    "Router",
    "Automatización",
    "Redes",
    "Internet",
    "Neo Wifi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="theme-color" content="#fde047" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="sunset"></div>
        <ClientProvider>
          <ThemeInitializer>{children}</ThemeInitializer>
        </ClientProvider>
      </body>
    </html>
  );
}
