import { colors } from './colors';
const darkTheme = {
  colors: {
    ...colors,
    background: '#121212', // Dark background color very dark gray
    secondary: '#AAAAAA', //Muted or subtext
    text: '#FFFFFF',
    border: '#333333',
    label: '#FFFFFF',
    inputBorder: '#444444', // Darker border for input fields
    placeholder: '#888888', // Lighter placeholder text color
  },
};

export default darkTheme;
export type DarkTheme = typeof darkTheme;
