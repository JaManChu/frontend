import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Onboard from './views/Onboard/Onboard.tsx';
import Login from './views/Login/Login.tsx';
import Signup from './views/Signup/Signup.tsx';
import Mypage from './views/Mypage/Mypage.tsx';
import GuestHome from './views/GuestHome/GuestHome.tsx';
import HeaderView from './components/Header/HeaderView.tsx';
import Main from './views/Main/Main.tsx';
import Latest from './views/Recipes/LatestRecipe/LatestRecipe.tsx';
import Popular from './views/Recipes/PopularRecipe/PopularRecipe.tsx';
import Recommend from './views/Recipes/RecommendedRecipe/RecommendedRecipe.tsx';
import DetailRecipe from './views/Recipes/DetailRecipe/DetailRecipe.tsx';
import AuthKaKao from './components/AuthKaKao.tsx';
import SearchView from './views/Recipes/SearchRecipe/SearchView.tsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Onboard />} />
                <Route element={<HeaderView />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/auth/kakao/callback" element={<AuthKaKao />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/guesthome" element={<GuestHome />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/recipes/recommended" element={<Recommend />} />
                    <Route path="/recipes/popular" element={<Popular />} />
                    <Route path="/recipes/latest" element={<Latest />} />
                    <Route path="/recipes/:id" element={<DetailRecipe />} />
                    <Route path="/search-recipe" element={<SearchView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
