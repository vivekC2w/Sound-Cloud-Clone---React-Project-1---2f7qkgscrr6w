import { configureStore } from '@reduxjs/toolkit';
import objectReducer from './objectSlice';

const store = configureStore({
  reducer: {
    object: objectReducer,
  },
});

export default store;
