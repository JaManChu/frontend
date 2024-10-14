import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const rootReucer = combineReducers({
    user: userReducer,
});

export default rootReucer;
