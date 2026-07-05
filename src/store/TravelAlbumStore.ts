import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./UserSlice";

const TravelAlbumStore = configureStore({
    reducer:{
        user: userSliceReducer,
    }
});

export default TravelAlbumStore;