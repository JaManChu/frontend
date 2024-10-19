import { ReactNode, useState } from 'react';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import instance from '../../../utils/api/instance.js';
import fakeData from '../../../fakeData/recipeFake.js';
import useObserver from '../../../hooks/useObserver.js';

interface RecipeLimitProps {
    limit?: number;
    page?: string;
    children?: ReactNode;
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

export default function PopularRecipes({ limit, page, children }: RecipeLimitProps): JSX.Element {
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);
    const [message, setMessage] = useState<string>();
    const [offset, setOffset] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchFake = (offset: number, size: number) => {
        return fakeData.slice(offset * size, (offset + 1) * size);
    };

    const fetchRecipes = async () => {
        try {
            const response = await instance.get(`/recipes/popular?page=${offset}&size={15}`);
            if (response.data.code == 'OK') {
                setRecipes((prev) => [...prev, ...response.data.data]);
                setMessage(response.data.message);
                setOffset((prev) => prev + 1);
            }
        } catch (err: any) {
            setIsLoading(false);
            console.log('popular recipe 조회 err: ', err);
            setMessage(err.message);
            const fakeRecipe = fetchFake(offset, 2);
            setRecipes((prev) => [...prev, ...fakeRecipe]);
            setOffset((prev) => prev + 1);
        }
    };

    const handleObserver = async (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && isLoading) {
            await fetchRecipes();
        }
    };

    const target = useObserver(handleObserver);

    console.log(message);

    return (
        <S_RecipeContainer>
            {children}
            <RecipeList recipes={recipes} limit={limit} page={page} />
            {isLoading && (
                <div id="observer" ref={target}>
                    Circle
                </div>
            )}
        </S_RecipeContainer>
    );
}
