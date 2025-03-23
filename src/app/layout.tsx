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
  title: "Neo-Wifi",
  description:
    "Obtiene información de tu WiFi 📡 más cercano y a que distancia te encuentras del más cercano en tu ciudad con ésta aplicación y configura de manera automatizada cualquier dispositivo inlámbrico TP-LINK CPE con la app de escritorio.",
  openGraph: {
    type: "website",
    url: "https://neo-wifi.vercel.app/",
    title: "Neo-WiFi",
    images: [
      {
        url: "https://raw.githubusercontent.com/solidsnk86/neo-wifi/refs/heads/master/public/assets/neo-wifi-app-card.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <ThemeInitializer>{children}</ThemeInitializer>
        </ClientProvider>
      </body>
    </html>
  );
}
