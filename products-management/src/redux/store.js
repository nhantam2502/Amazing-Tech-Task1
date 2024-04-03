import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./Slices/ProductSlice";

const store = configureStore({
    reducer: {
        product_list: ProductSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;