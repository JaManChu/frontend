// import { useEffect, useState } from 'react';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import fakeData from '../../../fakeData/recipeFake.js';
import withAuth from '../../../hooks/withAuth.js';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
// import axios from 'axios';

interface RecipeLimitProps {
    limit?: number;
    page?: string;
}
function RecommendedRecipes({ limit, page }: RecipeLimitProps): JSX.Element {
    // const [recipes, setRecipes] = useState<string[]>([]);
    // useEffect(() => {
    //     const fetchRecipes = async () => {
    //         try {
    // const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes`);
    //         } catch (err) {}
    //     };
    // }, [recipes]);

    return (
        <S_RecipeContainer>
            <RecipeList recipes={fakeData} limit={limit} page={page} />
        </S_RecipeContainer>
    );
}

export default withAuth(RecommendedRecipes);
