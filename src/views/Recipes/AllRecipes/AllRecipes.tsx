import { useState } from 'react';
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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchRecipes = async () => {
        try {
            const response = await instance.get(`/recipes/popular?page=${offset}&size=15`);
            if (response.data.code == 'OK') {
                setRecipes((prev) => [...prev, ...response.data.data]);
                setMessage(response.data.message);
                setOffset((prev) => prev + 1);
            }
        } catch (err: any) {
            setIsLoading(false);
            console.log(err);
            console.log(err.message);
            setMessage(err.message);
        }
    };

    const handleObserver = async (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && isLoading) {
            await fetchRecipes();
        }
    };

    const target = useObserver(handleObserver);

    console.log('all message: ', message);

    return (
        <S_RecipeContainer>
            <RecipeList recipes={recipes} limit={limit} page={page} />
            {isLoading && (
                <div id="observer" ref={target}>
                    Circle
                </div>
            )}
        </S_RecipeContainer>
    );
}
