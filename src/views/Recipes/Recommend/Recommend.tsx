// import { useEffect, useState } from 'react';
import RecipeList from '../Recipe/RecipeList';
import RecipePageHeader from '../Recipe/RecipePageHeader';
// import axios from 'axios';
import fakeData from '../../../fakeData/recipeFake.js';
import styled from 'styled-components';

interface RecipeLimitProps {
    limit?: number;
    page?: string;
}
export default function Recommend({ limit, page }: RecipeLimitProps): JSX.Element {
    // const [recipes, setRecipes] = useState<string[]>([]);
    // useEffect(() => {
    //     const fetchRecipes = async () => {
    //         try {
    // const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes`);
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
