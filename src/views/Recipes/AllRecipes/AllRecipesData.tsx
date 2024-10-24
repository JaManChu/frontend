import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import instance from '../../../utils/api/instance.js';
import { showModal } from '../../../redux/reducer/modalSlice.js';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
import AllRecipes from './AllRecipes.js';
import Navibar from '../../../components/Navibar/Navibar.js';
import { RecipeLimitProps } from './AllRecipesView.js';
import { convertLevel, convertTime } from '../../../common/convertFunc.js';
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
    const [hasMore, setHasMore] = useState<boolean>(true);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        if (isLoading && !hasMore) return;
        setIsLoading(true);
        try {
            const response = await instance.get(`/recipes?page=${offset}&size=15`);

            if (response.data.code == 'OK') {
                const totalRecipes = response.data.data.totalRecipes;
                const newRecipes: RecipeProps[] = response.data.data.recipes;
                const uniqueRecipes = newRecipes.filter(
                    (newRecipe) => !recipes.some((existingRecipe) => existingRecipe.recipeId === newRecipe.recipeId),
                );
                const convertData = uniqueRecipes.map((recipe) => ({
                    ...recipe,
                    recipeLevel: convertLevel(recipe.recipeLevel),
                    recipeCookingTime: convertTime(recipe.recipeCookingTime),
                }));
                setRecipes((prev) => [...prev, ...convertData]);
                setOffset((prev) => prev + 1);

                // 현재 레시피의 총 개수와 전체 레시피 개수를 비교하여 hasMore 업데이트
                if (recipes.length + convertData.length >= totalRecipes) {
                    setHasMore(false); // 더 이상 불러올 데이터가 없으면 false로 설정
                }
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
            <AllRecipes hasMore={hasMore} limit={limit} recipes={recipes} fetchRecipes={fetchRecipes} isLoading={isLoading} />
            <Navibar />
        </S_RecipeContainer>
    );
}
