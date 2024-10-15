import { configureStore } from '@reduxjs/toolkit';
import rootReuducer from '../reducer/rootReducer';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

// 상태를 session에 저장하기 위함(어떤 방식으로 저장할지 정의함)
const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['user'], // session에 저장되는 reducer
};

// session만료전까지 유지되는 store지정(기존의 rootReducer의 기능 유지)
const persistedReducer = persistReducer(persistConfig, rootReuducer);

// store에서 모든 state관리
const store = configureStore({
    reducer: persistedReducer,
});

// rootReducer가 정의한 전체 상태를 반환하고, state를 사용하는 컴포넌트에서 RootState를 import
export type RootState = ReturnType<typeof store.getState>;

const persistor = persistStore(store);

export { store, persistor };
