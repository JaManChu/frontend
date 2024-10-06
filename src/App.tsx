import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Onboard from './views/Onboard/Onboard.tsx';
import Login from './views/Login/Login.tsx';
import Signup from './views/Signup/Signup.tsx';
import Mypage from './views/Mypage/Mypage.tsx';
import GuestHome from './views/GuestHome/GuestHome.tsx';
import Header from './components/Header/Header.tsx';
import Main from './views/Main/Main.tsx';
import Latest from './views/Recipes/Latest/Latest.tsx';
import Popular from './views/Recipes/Popular/Popular.tsx';
import Recommend from './views/Recipes/Recommend/Recommend.tsx';
import DetailRecipe from './views/Recipes/DetailRecipe/DetailRecipe.tsx';
import AuthKaKao from './components/AuthKaKao.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Onboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/auth/kakao/callback" element={<AuthKaKao />} />
                {/* Header 추가해야하는 컴포넌트는 Header 아래에 작성 */}
                <Route element={<Header />}>
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/guesthome" element={<GuestHome />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/recipes/recommended" element={<Recommend />} />
                    <Route path="/recipes/popular" element={<Popular />} />
                    <Route path="/recipes/latest" element={<Latest />} />
                    <Route path="/recipes/:id" element={<DetailRecipe />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
