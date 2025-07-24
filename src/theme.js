import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        grey: {
          100: '#ffffff',
          200: '#ffffffb3',
          300: '#E9E9E9',
          400: '#858585',
          500: '#666666',
          600: '#313131',
          700: '#272727',
          800: '#272727b3',
          900: '#000000',
        },
        primary: {
          100: '#d0d6dd',
          200: '#a1acbb',
          300: '#72839a',
          400: '#435978',
          500: '#143056',
          600: '#102645',
          700: '#0c1d34',
          800: '#081322',
          900: '#040a11',
        },
        greenAccent: {
          100: '#e1f8e5',
          200: '#c2f2cc',
          300: '#a4ebb2',
          400: '#85e599',
          500: '#67de7f',
          600: '#52b266',
          700: '#3e854c',
          800: '#295933',
          900: '#152c19',
        },
      }
    : {
        grey: {
          100: '#141414',
          200: '#272727b3',
          300: '#272727',
          400: '#313131',
          500: '#666666',
          600: '#858585',
          700: '#E9E9E9',
          800: '#ffffffb3',
          900: '#ffffff',
        },
        primary: {
          100: '#040a11',
          200: '#081322',
          300: '#0c1d34',
          400: '#102645',
          500: '#143056',
          600: '#435978',
          700: '#72839a',
          800: '#a1acbb',
          900: '#d0d6dd',
        },
        greenAccent: {
          100: '#152c19',
          200: '#295933',
          300: '#3e854c',
          400: '#52b266',
          500: '#67de7f',
          600: '#85e599',
          700: '#a4ebb2',
          800: '#c2f2cc',
          900: '#e1f8e5',
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }),
    },
    typography: {
      fontFamily: ['Albert Sans', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Albert Sans', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Albert Sans', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Albert Sans', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Albert Sans', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Albert Sans', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Albert Sans', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
