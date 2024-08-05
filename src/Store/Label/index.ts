import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
  name: 'label',
  initialState: { labelId: '', defaultLabelId: '' },
  reducers: {
    setUpdatedLabel: (state, action) => ({
      ...state,
      labelId: action.payload,
    }),
    setDefaultLabelId: (state, action) => ({
      ...state,
      defaultLabelId: action.payload,
    }),
  },
});

export const { setUpdatedLabel, setDefaultLabelId } = loader.actions;

export default loader.reducer;
