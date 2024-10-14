import { configureStore } from '@reduxjs/toolkit';
import rootReuducer from '../reducer/rootReducer';

const store = configureStore({
    reducer: rootReuducer,
});

export default store;
