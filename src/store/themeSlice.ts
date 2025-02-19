import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false,
};

function saveInLocalStorage({ key, value }: { key: string; value: string }) {
  localStorage.setItem(key, value);
}

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
      saveInLocalStorage({ key: "theme", value: `${state.darkMode}` });
    },
    setTheme(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
