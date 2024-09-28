import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Onboard from './views/onboard.tsx';
import Login from './views/login.tsx';
import Signup from './views/signup.tsx';
import Mypage from './views/mypage.tsx';
import GuestHome from './views/guestHome.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Onboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/guesthome" element={<GuestHome />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
