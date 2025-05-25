import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isAuthentucated: false,
    isLoading: false,
    user: null
}

const authSlice= createSlice({
    name:"auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthentucated = true;
            state.isLoading = false;
        }
    }

})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;