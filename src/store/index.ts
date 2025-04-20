import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import cpeInfoReducer from "./cpeInfoSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    cpeInfo: cpeInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
