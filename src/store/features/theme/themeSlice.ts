import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IThemeState {
  theme: string | null;
}

const initialState: IThemeState = {
  theme: null,
};

const themeSlice = createSlice({
  name: 'theme',

  initialState,

  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      state.theme = action.payload;

      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
