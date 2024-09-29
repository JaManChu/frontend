import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Onboard from './views/Onboard/Onboard.tsx';
import Login from './views/Login/Login.tsx';
import Signup from './views/Signup/Signup.tsx';
import Mypage from './views/Mypage/Mypage.tsx';
import GuestHome from './views/GuestHome/GuestHome.tsx';
import Header from './components/Header/Header.tsx';
import Main from './views/Main/Main.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Onboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Header 추가해야하는 컴포넌트는 Header 아래에 작성 */}
                <Route element={<Header />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/guesthome" element={<GuestHome />} />
                    <Route path="/main" element={<Main />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
