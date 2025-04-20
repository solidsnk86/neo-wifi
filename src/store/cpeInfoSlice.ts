// store/cpeInfoSlice.ts
import { CpeInfoProps } from "@/types/definitions";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CpeInfoState {
  data: CpeInfoProps;
  loading: boolean;
  error: string | null;
}

const initialState: CpeInfoState = {
  data: {
    mode: "",
    devInfo: "",
    devVer: "",
    is2G: false,
    username: "",
    version: "",
  },
  loading: false,
  error: null,
};

// Thunk para hacer el fetch
export const fetchCpeInfo = createAsyncThunk("cpeInfo/fetch", async () => {
  const res = await fetch("/api/cpe-info");
  if (!res.ok) throw new Error("Error al obtener la info del CPE");
  return await res.json();
});

export const cpeInfoSlice = createSlice({
  name: "cpeInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCpeInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCpeInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCpeInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error desconocido";
      });
  },
});

export default cpeInfoSlice.reducer;
