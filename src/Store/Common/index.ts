import { createSlice } from '@reduxjs/toolkit';
import { THEME } from '../../Shared/Constants';

const common = createSlice({
  name: 'common',
  initialState: { token: null, uid: null, theme: THEME.SYSTEM },
  reducers: {
    updateAuthTokenRedux: (state, action) => ({
      ...state,
      token: action.payload,
    }),
    setUidRedux: (state, action) => ({
      ...state,
      uid: action.payload,
    }),
    updateTheme: (state, action) => ({
      ...state,
      theme: action.payload,
    }),
  },
});

export const { updateAuthTokenRedux, setUidRedux, updateTheme } =
  common.actions;

export default common.reducer;
