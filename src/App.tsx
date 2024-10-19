import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Onboard from './views/Onboard/Onboard.tsx';
import Login from './views/Login/Login.tsx';
import Signup from './views/Signup/Signup.tsx';
import Mypage from './views/Mypage/Mypage.tsx';
import GuestHome from './views/GuestHome/GuestHome.tsx';
import HeaderView from './components/Header/HeaderView.tsx';
import Home from './views/Home/Home.tsx';
import AllRecipes from './views/Recipes/AllRecipes/AllRecipes.tsx';
import PopularRecipesView from './views/Recipes/PopularRecipes/PopularRecipesView.tsx';
import RecommendedRecipes from './views/Recipes/RecommendedRecipes/RecommendedRecipes.tsx';
import DetailRecipe from './views/Recipes/DetailRecipe/DetailRecipe.tsx';
import AuthKaKao from './components/AuthKaKao.tsx';
import SearchViewRecipes from './views/Recipes/SearchRecipes/SearchViewRecipes.tsx';
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
                    <Route path="/users/login/auth/kakao" element={<AuthKaKao />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/guesthome" element={<GuestHome />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/recipes/all" element={<AllRecipes />} />
                    <Route path="/recipes/popular" element={<PopularRecipesView />} />
                    <Route path="/recipes/search" element={<SearchViewRecipes />} />
                    <Route path="/recipes/recommended" element={<RecommendedRecipes />} />
                    <Route path="/recipes/:id" element={<DetailRecipe />} />
                    <Route path="/recipes/create" element={<CreateRecipe />} />
                    <Route path="/recipes/update/:id" element={<UpdateRecipe />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
