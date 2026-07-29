# Plan: volver de MapLibre a Leaflet

Objetivo: sacar `maplibre-gl` del camino del mapa y volver a la implementación Leaflet que ya existe en el repo.

## Cambios mínimos

1. Reemplazar el wrapper pesado de `src/components/ui/map.tsx` por una versión basada en `leaflet` o eliminarlo si ya no se usa.
2. Migrar el uso actual de `MapLibre` en `src/app/components/GeoInfo/components/MapLeaf.tsx` para que consuma `src/services/MapLeaf.ts` y las APIs de `leaflet`.
3. Quitar imports, tipos y CSS ligados a `maplibre-gl`, incluyendo la declaración en `src/leaflet.d.ts`.
4. Mantener los estilos de mapa con tiles de Leaflet: mapa normal, satélite y 3D, usando las capas que ya arma `MapLeaflet`.
5. Revisar cualquier componente que importe `Map`, `MapMarker`, `MarkerPopup` o `MapRoute` desde `src/components/ui/map.tsx` y redirigirlo al stack Leaflet.
6. Validar que el bundle deje de cargar `maplibre-gl` y que no queden referencias en `grep`.

## Orden sugerido

1. Revertir la capa UI del mapa.
2. Ajustar el componente GeoInfo para usar Leaflet.
3. Limpiar tipos/CSS/imports sobrantes.
4. Probar render, cambio de estilo y marcadores.
