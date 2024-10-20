import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store/store.ts';
import Globalmodal from './components/Modal/Globalmodal.tsx';
import App from './App.tsx';
import './styles/App.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Globalmodal />
                <App />
            </PersistGate>
        </Provider>
    </StrictMode>,
);
