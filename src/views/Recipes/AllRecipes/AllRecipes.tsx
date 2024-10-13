import { useEffect, useState } from 'react';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
import axios from 'axios';
import fakeData from '../../../fakeData/recipeFake.js';

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

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes`);
                if (response.data.code == 'OK') {
                    setRecipes(response.data.data);
                    setMessage(response.data.message);
                }
            } catch (err: any) {
                console.log(err);
                console.log(err.message);
                setMessage(err.message);
                setRecipes(fakeData);
            }
        };

        fetchRecipes();

        return () => {};
    }, []);
    console.log('all message: ', message);

    return (
        <S_RecipeContainer>
            <RecipeList recipes={recipes} limit={limit} page={page} />
        </S_RecipeContainer>
    );
}
