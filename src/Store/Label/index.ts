import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
  name: 'label',
  initialState: { labelId: '', defaultLabelId: '' },
  reducers: {
    setLabel: (state, action) => ({
      ...state,
      labelId: action.payload,
    }),
    setDefaultLabelId: (state, action) => ({
      ...state,
      defaultLabelId: action.payload,
    }),
  },
});

export const { setLabel, setDefaultLabelId } = loader.actions;

export default loader.reducer;
