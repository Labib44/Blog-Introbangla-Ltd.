import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "../api/apiSlice";
import filterSlice from "../filter/filterSlice";

const store = configureStore({
    reducer: {
        [projectApi.reducerPath]: projectApi.reducer,
        filter: filterSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware)
});


export default store;