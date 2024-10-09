// import { useEffect, useState } from 'react';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import RecipePageHeader from '../../../components/Recipe/RecipePageHeader.js';
import fakeData from '../../../fakeData/recipeFake.js';
import styled from 'styled-components';
// import axios from 'axios';

interface RecipeLimitProps {
    limit?: number;
    page?: string;
}
export default function RecommendedRecipe({ limit, page }: RecipeLimitProps): JSX.Element {
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
            {page ? <RecipePageTitle>Recommend Recipes</RecipePageTitle> : <RecipePageHeader title="Recommend" />}
            <RecipeList recipes={fakeData} limit={limit} page={page} />
        </>
    );
}

const RecipePageTitle = styled.h2`
    margin: 36px 16px 0px;
    color: #622b18;
    font-size: 40px;
    text-align: center;
`;
