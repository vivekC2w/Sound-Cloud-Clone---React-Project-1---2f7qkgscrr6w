import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./userSlice";
import searchSlice from "./searchSlice";

const store = configureStore ({
    reducer: {
        search: searchSlice,
        authentication: authenticationReducer,
    }
});

export default store;