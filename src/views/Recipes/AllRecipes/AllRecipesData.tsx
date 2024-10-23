import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import instance from '../../../utils/api/instance.js';
import { showModal } from '../../../redux/reducer/modalSlice.js';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
import AllRecipes from './AllRecipes.js';
import Navibar from '../../../components/Navibar/Navibar.js';
import { RecipeLimitProps } from './AllRecipesView.js';
import fakeData from '../../../fakeData/recipeFake.js';

export interface RecipeProps {
    recipeId: number;
    recipeName: string;
    recipeAuthor: string;
    recipeLevel: string;
    recipeCookingTime: string;
    recipeThumbnail: string;
    recipeRating: string;
}
export default function AllRecipesData({ limit }: RecipeLimitProps) {
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await instance.get(`/recipes?page=${offset}&size=15`);
            if (response.data.code == 'OK') {
                const newRecipes: RecipeProps[] = response.data.data;
                const uniqueRecipes = newRecipes.filter(
                    (newRecipe) => !recipes.some((existingRecipe) => existingRecipe.recipeId === newRecipe.recipeId),
                );
                setRecipes((prev) => [...prev, ...uniqueRecipes]);
                setOffset((prev) => prev + 1);
            }
        } catch (err: any) {
            console.log('전체레시피 error: ', err);
            setRecipes(fakeData);
            dispatch(showModal({ isOpen: true, content: '전체 레시피 조회에 실패했습니다. 잠시 후 다시 시도해주세요.', onConfirm: null }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S_RecipeContainer>
            <AllRecipes limit={limit} recipes={recipes} fetchRecipes={fetchRecipes} isLoading={isLoading} />
            <Navibar />
        </S_RecipeContainer>
    );
}
