import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import modalReducer from './modalSlice';

// createSlice로 생성한 reducer들을 combine해주고 store에 연결
const rootReucer = combineReducers({
    user: userReducer,
    modal: modalReducer,
});

// combine된 모든 reducer들의 타입을 포함
export type RootReducerType = ReturnType<typeof rootReucer>;
export default rootReucer;
