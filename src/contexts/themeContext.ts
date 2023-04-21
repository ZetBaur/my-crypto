import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material';

export const tokens = (mode: string) => ({
  ...(mode === 'dark'
    ? {
        primary: {
          DEFAULT: '#000000',
        },

        secondary: {
          DEFAULT: '#3C3C3C',
        },

        content: {
          DEFAULT: 'red',
        },

        black: {
          DEFAULT: '#000000',
        },

        white: {
          DEFAULT: '#FFFFFF',
        },

        gray: {
          DEFAULT: '#3C3C3C',
        },

        accentMain: '#0F0E0E',
        borderColor: '#3C3C3C',
        blue: '#1900D5',
      }
    : {
        primary: {
          DEFAULT: '#FFFFFF',
        },

        secondary: {
          DEFAULT: '#FFFFFF',
        },

        content: {
          DEFAULT: '#F5F5F5',
        },

        black: {
          DEFAULT: '#000000',
        },

        white: {
          DEFAULT: '#FFFFFF',
        },

        gray: {
          DEFAULT: '#3C3C3C',
        },

        accentMain: '#F7F7F7',
        borderColor: '#D1D1D1',
        blue: '#1900D5',
      }),
});

export const themeSettings: any = (mode: string) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: colors.primary.DEFAULT,
            },
            secondary: {
              main: colors.secondary.DEFAULT,
            },
          }
        : {
            primary: {
              main: colors.primary.DEFAULT,
            },
            secondary: {
              main: colors.secondary.DEFAULT,
            },
          }),
    },

    typography: {
      fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
      fontSize: 14,
      h1: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 40,
        fontWeight: 600,
      },
      h2: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 35,
        fontWeight: 600,
      },
      h3: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 30,
        fontWeight: 500,
      },
      h4: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 25,
        fontWeight: 500,
      },
      p: {
        fontFamily: ['Source Sans Pro', 'sans-serif'].join(','),
        fontSize: 20,
      },
    },
  };
};

export const ColorModeContext = createContext<{ toggleColorMode: () => void }>({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme: any = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
