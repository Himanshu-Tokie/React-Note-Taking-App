import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
  name: 'Alert',
  initialState: { isAlert: false },
  reducers: {
    setShowAlert: (state, action) => ({
      ...state,
      isAlert: action.payload,
    }),
  },
});

export const { setShowAlert } = loader.actions;

export default loader.reducer;
