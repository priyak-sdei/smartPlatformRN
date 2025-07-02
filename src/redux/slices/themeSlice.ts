import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

type ThemeState = {
  mode: 'light' | 'dark';
};

// Use the device's color scheme as the initial state, defaulting to 'light'
const initialState: ThemeState = {
  mode: Appearance.getColorScheme() ?? 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
