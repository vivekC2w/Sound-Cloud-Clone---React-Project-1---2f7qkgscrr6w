import { createSlice } from '@reduxjs/toolkit';

const objectSlice = createSlice({
  name: 'object',
  initialState: null, 
  reducers: {
    setObject: (state, action) => {
      return action.payload;
    },
    clearObject: (state) => {
      return null;
    },
  },
});

export const { setObject, clearObject } = objectSlice.actions;
export default objectSlice.reducer;
