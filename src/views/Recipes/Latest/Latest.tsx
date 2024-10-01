import { useEffect, useState } from 'react';
import RecipeList from '../Recipe/RecipeList';
import RecipePageHeader from '../Recipe/RecipePageHeader';
import axios from 'axios';
import fakeData from '../../../fakeData/recipeFake.js';

interface RecipeLimitProps {
    limit?: number;
    isMain?: boolean;
}

export default function Latest({ limit, isMain }: RecipeLimitProps) {
    const [recipes, setRecipes] = useState<string[]>([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('/recipes');
            } catch (err) {}
        };
    }, [recipes]);

    return (
        <>
            {!isMain && <RecipePageHeader title="Latest" />}
            <RecipeList recipes={fakeData} limit={limit} isMain={isMain} />
        </>
    );
}
