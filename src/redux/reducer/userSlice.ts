import { createSlice } from '@reduxjs/toolkit';

// create
const userSlice = createSlice({
    name: 'user',
    initialState: { value: { isLoggedIn: false, nickname: '' } },
    reducers: {
        loginSuccess: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { loginSuccess } = userSlice.actions;
export default userSlice.reducer;
