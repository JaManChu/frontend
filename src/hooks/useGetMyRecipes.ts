import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const useGetMyRecipes = () => {
    const [myRecipes, setMyRecipes] = useState([{ myRecipeId: '', myRecipeName: '', myRecipeThumbnail: '' }]);
    const [scrapedRecipes, setScrapedRecipes] = useState([{ recipeId: '', recipeName: '', recipeAuthor: '', recipeThumbnail: '' }]);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        // if (!token) {
        //     navigate('/login');
        //     return;
        // } else {
        // }
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/recipes`, {
                    headers: {
                        'access-token': `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                console.log('마이페이지 작성게시글,스크랩목록', response);
                setMyRecipes(response.data.body.myRecipe);
                setScrapedRecipes(response.data.body.scrapedRecipe);
            } catch (error) {
                console.error('게시물 정보를 불러오는데 실패하였습니다', error);
            }
        };
        fetchRecipes();
    }, [token, navigate]);

    return {
        myRecipes,
        scrapedRecipes,
    };
};
