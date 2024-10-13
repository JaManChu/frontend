import { useEffect, useState } from 'react';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import axios from 'axios';

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
            }
        };

        fetchRecipes();

        return () => {};
    }, []);
    console.log('all message: ', message);

    return <RecipeList recipes={recipes} limit={limit} page={page} />;
}
