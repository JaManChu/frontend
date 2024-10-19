import { useState, useEffect } from 'react';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
import instance from '../../../utils/api/instance.js';
import useObserver from '../../../hooks/useObserver.js';

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

export default function AllRecipes({ limit, page }: RecipeLimitProps): JSX.Element {
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);
    const [message, setMessage] = useState<string>('');
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await instance.get(`/recipes/popular?page=${offset}&size=15`);
            if (response.data.code == 'OK') {
                const newRecipes: RecipeProps[] = response.data.data;
                const uniqueRecipes = newRecipes.filter(
                    (newRecipe) => !recipes.some((existingRecipe) => existingRecipe.recipeId === newRecipe.recipeId),
                );
                setRecipes((prev) => [...prev, ...uniqueRecipes]);
                setMessage(response.data.message);
                setOffset((prev) => prev + 1);
            }
        } catch (err: any) {
            console.log(err);
            console.log(err.message);
            setMessage(err.message);
        }
    };

    const handleObserver = async (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
            await fetchRecipes();
        }
    };

    const target = useObserver(handleObserver);

    console.log('all message: ', message);

    return (
        <S_RecipeContainer>
            <RecipeList recipes={recipes} limit={limit} page={page} />

            <div id="observer" ref={target}>
                Circle
            </div>
        </S_RecipeContainer>
    );
}
