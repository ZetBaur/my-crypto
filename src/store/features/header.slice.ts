import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { IUser } from '../../model/user.type';

interface IHeaderState {
  pageTitle: string | null;
  //   user: IUser;
}

const initialState: IHeaderState = {
  pageTitle: null,
  //   user: {
  //     name: null,
  //     image: null,
  //   },
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setPageTitle(state, action: PayloadAction<string>) {
      state.pageTitle = action.payload;
    },
  },
});

export const { setPageTitle } = headerSlice.actions;
export default headerSlice.reducer;
