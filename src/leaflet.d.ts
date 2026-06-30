/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "leaflet.fullscreen";
declare module "leaflet.fullscreen/dist/Leaflet.fullscreen.min.css";
declare module "maplibre-gl/dist/maplibre-gl.css"

import "leaflet";
import "leaflet.fullscreen";

declare module "leaflet" {
  interface MapOptions {
    fullscreenControl?: boolean | { [key: string]: any };
  }

  interface ControlOptions {
    fullscreen?: boolean | { [key: string]: any };
  }

  namespace control {
    function fullscreen(options?: ControlOptions): Control.Fullscreen;
  }

  namespace Control {
    class Fullscreen extends Control {}
  }
}
