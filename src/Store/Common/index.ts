import { createSlice } from '@reduxjs/toolkit';

const common = createSlice({
  name: 'common',
  initialState: { token: null, uid: null },
  reducers: {
    updateAuthTokenRedux: (state, action) => ({
      ...state,
      token: action.payload,
    }),
    setUidRedux: (state, action) => ({
      ...state,
      uid: action.payload,
    }),
  },
});

export const { updateAuthTokenRedux, setUidRedux } = common.actions;

export default common.reducer;
