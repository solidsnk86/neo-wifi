import { getCoords } from "@/utils/get-coords";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface GeolocationResponse {
    ip: string;
    city: string;
    state: string;
    country: string;
    departament: string;
    city_coords: {
        latitude: number;
        longitude: number;
    };
    center_distance: string;
    current_position: {
        latitude: number;
        longitude: number;
    };
    closest_wifi: WifiPoint;
    second_closest_wifi: WifiPoint;
    third_closest_wifi: WifiPoint;
    airport_location: {
        city: string;
        country: string;
        closest_airport: {
            airport: string;
            distance: string;
        };
    };
}

interface WifiPoint {
    antenna: string;
    name: string;
    distance: string;
    type: string;
    MAC: string;
    MAC5G: string;
    coords: {
        lat: number;
        lon: number;
    };
    users: number;
}

interface LocationSliceState {
    data: GeolocationResponse;
    loading: boolean;
    error: string | null;
}

const initialState: Partial<LocationSliceState> = {
    data: { "ip": "181.85.155.167", "city": "Richmond", "state": "Richmond", "country": "Estados Unidos", "departament": "Virginia", "city_coords": { "latitude": 37.5407, "longitude": -77.436 }, "center_distance": "144.501mts", "current_position": { "latitude": 38.7095, "longitude": -78.1539 }, "closest_wifi": { "antenna": "Centro Sociocultural Alfonso XII (Fuencarral - El Pardo)", "name": "No disponible", "distance": "6681.275mts", "type": "Dual Band 2.4Ghz | 5Ghz", "MAC": "No disponible", "MAC5G": "No disponible", "coords": { "lat": 40.519673311658686, "lon": -3.7779055687726535 }, "users": 0 }, "second_closest_wifi": { "antenna": "Centro Municipal de Mayores Alfonso XII", "name": "No disponible", "distance": "6681.294mts", "type": "Dual Band 2.4Ghz | 5Ghz", "MAC": "No disponible", "MAC5G": "No disponible", "coords": { "lat": 40.51973221668713, "lon": -3.777683378503506 }, "users": 0 }, "third_closest_wifi": { "antenna": "Espacio para mayores Las Tablas", "name": "No disponible", "distance": "6681.294mts", "type": "Dual Band 2.4Ghz | 5Ghz", "MAC": "No disponible", "MAC5G": "No disponible", "coords": { "lat": 40.51973221668713, "lon": -3.777683378503506 }, "users": 0 }, "airport_location": { "city": "Virginia", "country": "US", "closest_airport": { "airport": "Front Royal Warren County Airport", "distance": "24.714mts" } } },
    loading: false,
    error: null,
};

const locationCityFetch = createAsyncThunk("location/fetch", async () => {
    try {
        const { lat, lon } = await getCoords();
        if (!lat || !lon) return null;

        const response = await fetch(
            `https://calcagni-gabriel.vercel.app/api/geolocation?lat=${lat}&lon=${lon}`
        );
        if (!response.ok) throw new Error(`Response error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        throw error;
    }
})

export const locationSlice = createSlice({
    name: "locationInfo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(locationCityFetch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(locationCityFetch.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(locationCityFetch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error desconocido";
            });
    },
})

export default locationSlice.reducer;