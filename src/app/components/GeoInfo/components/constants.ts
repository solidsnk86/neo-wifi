import L from "leaflet";

export const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_APIKEY;

export const customIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 206 300">
  <g transform="translate(2, 2)">
    <path
      d="M100 0 
           C45 0 0 45 0 100 
           C0 200 95 250 100 295 
           C105 250 200 200 200 100 
           C200 45 155 0 100 0 
           Z"
      fill="#EA4335"
      stroke="#B31412"
      stroke-width="3"
    />
  </g>
  <circle cx="100" cy="100" r="50" fill="#B31412" />
</svg>
  `,
  className: "wifi-icon",
  iconSize: [24, 24],
  iconAnchor: [11, 32],
  popupAnchor: [0, -32],
});

export const wifiSvg = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 206 300">
      <g transform="translate(2, 2)">
        <path
          d="M100 0 
               C45 0 0 45 0 100 
               C0 200 95 250 100 295 
               C105 250 200 200 200 100 
               C200 45 155 0 100 0 
               Z"
          fill="#3b82f6"
          stroke="#000"
          stroke-width="3"
        />
      </g>
      <circle
        cx="100"
        cy="90"
        r="65"
        fill="white"
        stroke="#EEEEEE"
        stroke-width="1"
      />
      <g transform="translate(46, 35) scale(4.5)">
        <path
          d="M5 12.55a11 11 0 0 1 14.08 0"
          fill="none"
          stroke="#0078D7"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.5 16.35a5 5 0 0 1 7 0"
          fill="none"
          stroke="#0078D7"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2 8.82a15 15 0 0 1 20 0"
          fill="none"
          stroke="#0078D7"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <circle
          cx="12"
          cy="20"
          r="1"
          fill="#0078D7"
          stroke="#0078D7"
          stroke-width="2"
        />
      </g>
    </svg>`,
  className: "wifi-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
