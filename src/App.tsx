import './App.css';

import Onboard from './views/onboard.tsx';
import Login from './views/login.tsx';
import Signup from './views/signup.tsx';
import Mypage from './views/mypage.tsx';
import GuestHome from './views/guestHome.tsx';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Onboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Header 추가해야하는 컴포넌트는 아래에 작성 */}
                <Route element={<Header />}>
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/guesthome" element={<GuestHome />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
