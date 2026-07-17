import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ClientProvider } from "@/providers/themeProvider";
import { ThemeInitializer } from "./components/ThemeInitializer";
import { LocationProvider } from "./contexts/use-location";

const geistSans = Poppins({
  variable: "--font-geist-sans",
  weight: ["300", "400"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bogueBlack = localFont({
  src: [
    {
      path: "../../public/Bogue-Serif-Font-Family/Demo_Fonts/Fontspring-DEMO-bogue-light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/Bogue-Serif-Font-Family/Demo_Fonts/Fontspring-DEMO-bogue-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Bogue-Serif-Font-Family/Demo_Fonts/Fontspring-DEMO-bogue-semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/Bogue-Serif-Font-Family/Demo_Fonts/Fontspring-DEMO-bogue-bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/Bogue-Serif-Font-Family/Demo_Fonts/Fontspring-DEMO-bogue-extrabold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/Bogue-Serif-Font-Family/Demo_Fonts/Fontspring-DEMO-bogue-italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/Bogue-Serif-Font-Family/Demo_Fonts/Fontspring-DEMO-bogue-lightitalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/Bogue-Serif-Font-Family/Demo_Fonts/Fontspring-DEMO-bogue-bolditalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-bogue-black",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neo-wifi.vercel.app"),
  title: {
    default: "Neo - Configuración Automatizada TP-Link",
    template: "%s | Neo Wifi",
  },
  icons: {
    icon: "favicon.ico",
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
        url: "https://neo-wifi.vercel.app/neo-wifi-satellite.png",
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
    images: ["https://neo-wifi.vercel.app/neo-wifi-satellite.png"],
  },
  authors: [{ name: "Gabriel Calcagni" }],
  keywords: [
    "Wifi Gratis Cerca",
    "Tu antena más próxima",
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
        className={`${geistSans.variable} ${geistMono.variable} ${bogueBlack.variable} antialiased`}
      >
        <div className="sunset"></div>
        <div className="fixed inset-0 bg-dots h-svh" />
        <ClientProvider>
          <LocationProvider>
            <ThemeInitializer>{children}</ThemeInitializer>
          </LocationProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
