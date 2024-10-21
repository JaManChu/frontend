// import { useEffect, useState } from 'react';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import fakeData from '../../../fakeData/recipeFake.js';
import withAuth from '../../../hooks/withAuth.js';
import { S_RecipeContainer } from '../../../styles/RecipeContainer.js';
// import instance from '../../../utils/api/instance.js';

function RecommendedRecipes(): JSX.Element {
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
            <RecipeList recipes={fakeData} />
        </S_RecipeContainer>
    );
}

export default withAuth(RecommendedRecipes);
