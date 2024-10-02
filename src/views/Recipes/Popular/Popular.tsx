import { useEffect, useState } from 'react';
import RecipeList from '../Recipe/RecipeList';
import RecipePageHeader from '../Recipe/RecipePageHeader';
import axios from 'axios';
import fakeData from '../../../fakeData/recipeFake.js';
import styled from 'styled-components';

const RecipeContainer = styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
const RecipePageTitle = styled.h2`
    margin: 36px 16px 0px;
    color: #622b18;
    font-size: 40px;
    text-align: center;
`;
interface RecipeLimitProps {
    limit?: number;
    page?: string;
}

export default function Popular({ limit, page }: RecipeLimitProps) {
    const [recipes, setRecipes] = useState<string[]>([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('/recipes');
            } catch (err) {}
        };
    }, [recipes]);

    return (
        <RecipeContainer>
            {page ? <RecipePageTitle>Popular Recipes</RecipePageTitle> : <RecipePageHeader title="Popular" />}
            <RecipeList recipes={fakeData} limit={limit} page={page} />
        </RecipeContainer>
    );
}
