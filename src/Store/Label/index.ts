import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
  name: 'label',
  initialState: { labelId: 'test2' },
  reducers: {
    setLabel: (state, action) => ({
      ...state,
      labelId: action.payload,
    }),
  },
});

export const { setLabel } = loader.actions;

export default loader.reducer;
