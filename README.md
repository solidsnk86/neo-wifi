# Neo-WiFi App Web

## 🌍 Localización Inteligente de Puntos WiFi Públicos

**NeoWiFi** es una aplicación web diseñada para ayudar a las personas a encontrar puntos de acceso WiFi públicos y gratuitos cercanos en distintas provincias de Argentina y otros países.

El proyecto nació con un objetivo simple: facilitar el acceso a Internet cuando una persona necesita conectividad. Detrás de esa experiencia existe un importante trabajo de recopilación, normalización e integración de datos provenientes de múltiples fuentes públicas.

---

# Características

## 📍 Geolocalización Inteligente

- Obtiene la ubicación del usuario mediante la API de Geolocalización del navegador.
- Calcula distancias utilizando la fórmula de **Haversine**.
- Muestra automáticamente las **3 antenas WiFi públicas más cercanas**.
- Indica la distancia exacta entre el usuario y cada punto WiFi.

---

## Mapa Interactivo

- Visualización de antenas WiFi sobre mapas interactivos.
- Localización precisa mediante coordenadas geográficas.
- Cobertura en múltiples provincias argentinas.
- Cobertura en diversos países y ciudades internacionales.

---

# Ingeniería de Datos

Uno de los principales desafíos de NeoWiFi fue construir una base de datos geográfica unificada a partir de información publicada de maneras muy diferentes.

Para lograrlo fue necesario desarrollar procesos de integración y normalización de datos provenientes de:

- APIs públicas de organismos gubernamentales.
- Servicios REST oficiales.
- Documentación pública.
- Archivos PDF.
- Mapas oficiales.
- Relevamiento manual utilizando Google Maps cuando las coordenadas no estaban disponibles.

En numerosos casos la información publicada por distintos organismos era inconsistente o incompleta, por lo que fue necesario:

- Normalizar nombres de provincias, ciudades y países.
- Limpiar datos nulos e inconsistentes.
- Relacionar información proveniente de múltiples APIs.
- Unificar distintos formatos de coordenadas.
- Completar registros manualmente cuando la información oficial no estaba georreferenciada.

En algunas provincias fue necesario localizar manualmente las antenas utilizando referencias descriptivas (plazas, hospitales, edificios públicos, etc.) para obtener coordenadas precisas.

---

# Información Disponible

Dependiendo de la fuente de datos, NeoWiFi puede mostrar información como:

- Estado operativo de la antena.
- Cantidad de usuarios conectados.
- Nombre de la red WiFi.
- Información de redes 2.4 GHz.
- Información de redes 5 GHz.
- Dirección MAC.
- Coordenadas geográficas.
- Distancia respecto del usuario.

---

# Cobertura

Actualmente NeoWiFi reúne información de:

### 🇦🇷 Argentina

- San Luis
- Buenos Aires
- Córdoba
- Mendoza
- San Juan
- Corrientes
- Tucumán
- y otras provincias.

Además incluye información de:

- Universidades
- Hospitales
- Plazas
- Espacios Públicos
- Dependencias gubernamentales

### Internacional

También incorpora puntos WiFi públicos de diversos países y ciudades, entre ellos:

- México
- España
- Francia
- Italia
- Estados Unidos
- y nuevos lugares que continúan incorporándose.

La base de datos continúa creciendo de forma permanente.

---

# Aplicación de Escritorio

NeoWiFi también dispone de una versión para Windows desarrollada con **Electron.js**.

Esta aplicación automatiza tareas de conectividad y configuración para equipos TP-Link utilizados en redes inalámbricas del Gobierno de la Provincia de San Luis.

---

# Asistente IA

La aplicación incorpora un asistente basado en Inteligencia Artificial capaz de:

- Explicar el funcionamiento de NeoWiFi.
- Responder preguntas sobre la aplicación.
- Interpretar información geográfica.
- Informar las antenas cercanas.
- Funcionar en múltiples idiomas.
- Recibir consultas mediante voz.

---

# Tecnologías

- Next.js
- TypeScript
- Electron.js
- Leaflet
- Tailwind CSS
- API REST
- Geolocation API
- Haversine Formula
- JSON Data Processing
- Inteligencia Artificial (Grok)

---

# Sitio Web

**https://neo-wifi.com/**

---

# ❤️ Objetivo del Proyecto

NeoWiFi busca facilitar el acceso a Internet mediante la localización de puntos WiFi públicos y gratuitos.

Además del desarrollo de software, el proyecto implicó una importante tarea de investigación, recopilación y normalización de información geográfica proveniente de múltiples fuentes oficiales y públicas, con el objetivo de construir una base de datos unificada y útil para cualquier persona que necesite conectividad.

---

<div align="center">

**SolidSnk86 © 2026**

</div>