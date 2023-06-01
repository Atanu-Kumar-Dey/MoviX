import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";

export default configureStore({
    reducer: {
        homeSlice,
    },
});