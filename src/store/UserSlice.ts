import userApiServiceInstance from '@/services/UserApiService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/* export const loginThunkAction = createAsyncThunk('userSlice/getUser', async (values:any)=>{
    const responseData = await userApiServiceInstance.loginUser(values.email, values.password);
    return responseData;
}); */

const UserSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: null,
        // userLoading: false,
        accessToken: null,
    },
    reducers: {
        setUser: function (state, action) {
            state.user = action.payload;
        },
        setAccessToken: function (state, action) {
            state.accessToken = action.payload
        }
    },
    extraReducers: function (builder) {
        /* builder.addCase(loginThunkAction.fulfilled, (state, action)=>{
            state.user = action.payload.user;
            state.userLoading = false;
            state.accessToken = action.payload.accessToken;
        });
        builder.addCase(loginThunkAction.pending, (state)=>{
            state.userLoading = true;
        });
        builder.addCase(loginThunkAction.rejected, (state)=>{
            state.user = null;
            state.userLoading = false;
            state.accessToken = null;
        }); */
    }
});

export default UserSlice.reducer;
export const { setUser, setAccessToken } = UserSlice.actions;