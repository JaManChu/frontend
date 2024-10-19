import { useState, useEffect } from 'react';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
import instance from '../../../utils/api/instance.js';
import PopularRecipes from './PopularRecipes';
interface RecipeLimitProps {
    limit?: number;
    page?: string;
}
interface RecipeProps {
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
    const [message, setMessage] = useState<string>();
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
                setMessage(response.data.message);
                setOffset((prev) => {
                    console.log(`New offset: ${prev + 1}`);
                    return prev + 1;
                });
            }
        } catch (err: any) {
            setMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(message);

    return (
        <S_RecipeContainer>
            <PopularRecipes limit={limit} page={page} recipes={recipes} fetchRecipes={fetchRecipes} isLoading={isLoading} />
        </S_RecipeContainer>
    );
}
