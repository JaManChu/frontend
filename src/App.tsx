import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Onboard from './views/Onboard/Onboard.tsx';
import Login from './views/Login/Login.tsx';
import Signup from './views/Signup/Signup.tsx';
import Mypage from './views/Mypage/Mypage.tsx';
import GuestHome from './views/GuestHome/GuestHome.tsx';
import HeaderView from './components/Header/HeaderView.tsx';
import Main from './views/Main/Main.tsx';
import LatestRecipe from './views/Recipes/LatestRecipe/LatestRecipe.tsx';
import PopularRecipe from './views/Recipes/PopularRecipe/PopularRecipe.tsx';
import RecommendedRecipe from './views/Recipes/RecommendedRecipe/RecommendedRecipe.tsx';
import DetailRecipe from './views/Recipes/DetailRecipe/DetailRecipe.tsx';
import AuthKaKao from './components/AuthKaKao.tsx';
import SearchView from './views/Recipes/SearchRecipe/SearchView.tsx';
import CreateRecipe from './views/Recipes/CreateRecipe/CreateRecipe.tsx';
import UpdateRecipe from './views/Recipes/UpdateRecipe/UpdateRecipe.tsx';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Onboard />} />
                <Route element={<HeaderView />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/users/login/auth/kakako" element={<AuthKaKao />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/guesthome" element={<GuestHome />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/recipes/recommended" element={<RecommendedRecipe />} />
                    <Route path="/recipes/popular" element={<PopularRecipe />} />
                    <Route path="/recipes/latest" element={<LatestRecipe />} />
                    <Route path="/recipes/:id" element={<DetailRecipe />} />
                    <Route path="/recipes/search" element={<SearchView />} />
                    <Route path="/recipes/create" element={<CreateRecipe />} />
                    <Route path="/recipes/update/:id" element={<UpdateRecipe />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
