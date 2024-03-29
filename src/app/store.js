import { configureStore } from "@reduxjs/toolkit";
import userProfilReducer from '../features/profile/profilSlice';
import authLoginReducer from '../features/login/loginSlice';
import userUpdateReducer from '../features/update/updateSlice';


const store = configureStore({
    reducer: {
        user: userProfilReducer,
        login: authLoginReducer,
        update: userUpdateReducer
    },
})

export default store;