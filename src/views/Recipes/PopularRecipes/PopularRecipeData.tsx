import { useState, useEffect } from 'react';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
import instance from '../../../utils/api/instance.js';
import PopularRecipes from './PopularRecipes';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../redux/reducer/modalSlice.js';
import { RecipeLimitProps } from './PopularRecipesView.js';
export interface RecipeProps {
    recipeId: number;
    recipeName: string;
    recipeAuthor: string;
    recipeLevel: string;
    recipeCookingTime: string;
    recipeThumbnail: string;
    // rate: string;
    // desc: string;
}

export default function PopularRecipeData({ limit, page }: RecipeLimitProps): JSX.Element {
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
            console.log(`try Fetching recipes with page: ${offset}, size: 15`);
            const response = await instance.get(`/recipes/popular?page=${offset}&size=15`);

            if (response.data.code == 'OK') {
                const newRecipes: RecipeProps[] = response.data.data;
                const uniqueRecipes = newRecipes.filter(
                    (newRecipe) => !recipes.some((existingRecipe) => existingRecipe.recipeId === newRecipe.recipeId),
                );
                setRecipes((prev) => [...prev, ...uniqueRecipes]);
                setOffset((prev) => {
                    console.log(`New offset: ${prev + 1}`);
                    return prev + 1;
                });
            }
        } catch (err: any) {
            console.log(err);
            dispatch(showModal({ isOpen: true, content: '인기 레시피 조회에 실패했습니다. 잠시 후 다시 시도해주세요.', onConfirm: null }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <S_RecipeContainer>
            <PopularRecipes limit={limit} page={page} recipes={recipes} fetchRecipes={fetchRecipes} isLoading={isLoading} />
        </S_RecipeContainer>
    );
}
