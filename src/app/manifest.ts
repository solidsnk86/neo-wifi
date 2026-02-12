import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Neo Wifi - Configuración Automatizada TP-Link',
    short_name: 'Neo Wifi',
    description: 'Configura y optimiza tus dispositivos TP-Link de forma rápida y sencilla.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#fde047',
    icons: [
      {
        src: '/assets/neo-wifi-favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/assets/neo-wifi-app-card.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/neo-wifi-app-card.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
