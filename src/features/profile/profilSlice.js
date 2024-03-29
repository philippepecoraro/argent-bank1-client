import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import service from '../../services/service';
import { logout } from '../login/loginSlice';


export const profile = createAsyncThunk(
    "user/profile",
    async () => {
        try {
            const response = await service.profile();
            return response.data.body;
        } catch (error) {
            console.log('error', error);

        }
    }
)

const initialState = {
    user: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [profile.fulfilled]: (state, action) => {
            state.user = action.payload;
        },
        [profile.rejected]: (state) => {
            state.user = [];
        },
        [logout.fulfilled]: (state) => {
            state.user = [];
        }
    }
})

const { reducer } = userSlice;
export default reducer;