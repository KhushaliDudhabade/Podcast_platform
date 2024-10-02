import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    podcasts: [],
};

const podcastSlice = createSlice({
    name: "podcasts",
    initialState,
    reducers: {  
        setPodcasts: (state, action) => {
            state.podcasts = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setPodcasts } = podcastSlice.actions;
export default podcastSlice.reducer;
