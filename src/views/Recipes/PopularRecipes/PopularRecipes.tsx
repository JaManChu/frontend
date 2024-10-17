import { ReactNode, useEffect, useState } from 'react';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import instance from '../../../utils/api/instance.js';
import fakeData from '../../../fakeData/recipeFake.js';

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
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await instance.get(`/recipes/popular`);
                if (response.data.code == 'OK') {
                    console.log('popular recipe response: ', response);
                    setRecipes(response.data.data);
                    setMessage(response.data.message);
                }
            } catch (err: any) {
                console.log('popular recipe 조회 err: ', err);
                setMessage(err.message);
                setRecipes(fakeData);
            }
        };
        fetchRecipes();
    }, []);
    console.log(message);
    return (
        <S_RecipeContainer>
            {children}
            <RecipeList recipes={recipes} limit={limit} page={page} />
        </S_RecipeContainer>
    );
}
