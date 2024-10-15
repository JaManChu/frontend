import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initialState와 action객체에 대한 type 지정
interface UserActionState {
    isLoggedIn: boolean;
    token: string | null;
    nickname: string | null;
}
interface UserState {
    value: UserActionState;
}

// createSlice : action과 reducer를 한번에 저장 - reduer의 이름과 초기값 설정 가능
const userSlice = createSlice({
    name: 'user',
    initialState: { value: { isLoggedIn: false, token: null, nickname: null } } as UserState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<UserActionState>) => {
            state.value = action.payload;
        },
        logoutSuccess: (state) => {
            state.value = { isLoggedIn: false, token: null, nickname: null };
        },
    },
});

// 선언한 actions를 변수로 export
export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
