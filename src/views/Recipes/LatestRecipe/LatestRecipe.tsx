// import { useEffect, useState } from 'react';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import RecipePageHeader from '../../../components/Recipe/RecipePageHeader.js';
// import axios from 'axios';
import fakeData from '../../../fakeData/recipeFake.js';

interface RecipeLimitProps {
    limit?: number;
    page?: string;
}

export default function LatestRecipe({ limit, page }: RecipeLimitProps): JSX.Element {
    // const [recipes, setRecipes] = useState<string[]>([]);
    // useEffect(() => {
    //     const fetchRecipes = async () => {
    //         try {
    // const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes`);
    //         } catch (err) {}
    //     };
    // }, [recipes]);

    return (
        <>
            {!page && <RecipePageHeader title="Latest" />}
            <RecipeList recipes={fakeData} limit={limit} page={page} />
        </>
    );
}
