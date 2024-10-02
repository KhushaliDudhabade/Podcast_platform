import { configureStore } from '@reduxjs/toolkit';

import userReducer from './../slices/userSlice'
import podcastReducer from './../slices/PodcastSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        podcasts:podcastReducer,
    },
});

export default store;