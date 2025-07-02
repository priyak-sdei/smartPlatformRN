import { colors } from './colors';
const darkTheme = {
  colors: {
    ...colors,
    background: '#101317',
    text: '#FFFFFF',
    primary: '#0A84FF',
    secondary: '#FFD60A',
    border: '#333333',
  },
};

export default darkTheme;
export type DarkTheme = typeof darkTheme;
