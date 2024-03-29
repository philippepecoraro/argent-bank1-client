import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import service from '../../services/service';



export const updateUser = createAsyncThunk(
    "userUpdate/update",
    async ({ firstName, lastName }, thunkAPI) => {
        try {
            const response = await service.updateUser(firstName, lastName);
            return response.data;
        } catch (error) {
            console.log('error', error)
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const initialState = {
    userUpdateInfo: {},
}

const updateSlice = createSlice({
    name: "userUpdate",
    initialState,
    reducers: {},
    extraReducers: {
        [updateUser.fulfilled]: (state, action) => {
            state.userUpdateInfo = action.payload.body;
        },
        [updateUser.rejected]: (state, action) => {
            state.userUpdateInfo = {};
        }
    }
})
const { reducer } = updateSlice;
export default reducer;