import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setTheme } from '@redux/slices/themeSlice';
import React, { createContext, ReactNode, useContext } from 'react';
import { darkTheme, lightTheme } from './index';

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
});

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component that provides the theme and toggle function
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.theme);

  // Determine the current theme based on isDark state
  const isDark = mode === 'dark';

  // Determine the current theme based on isDark state
  const toggleTheme = () => {
    dispatch(setTheme(isDark ? 'light' : 'dark'));
  };

  // Determine the current theme based on the Redux state
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
