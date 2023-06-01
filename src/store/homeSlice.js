import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        genras: {},
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGenras: (state, action) => {
            state.genras = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration, getGenras } = homeSlice.actions;

export default homeSlice.reducer;