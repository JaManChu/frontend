import { useEffect, useState } from 'react';
import RecipeList from '../../../components/Recipe/RecipeList.js';
import RecipePageHeader from '../../../components/Recipe/RecipePageHeader.js';
import styled from 'styled-components';
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

export default function PopularRecipe({ limit, page }: RecipeLimitProps): JSX.Element {
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);
    const [message, setMessage] = useState<string>();
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes/popular`);
                if (response.data.code == 'OK') {
                    console.log('popular recipe response: ', response);
                    setRecipes(response.data.data);
                    setMessage(response.data.message);
                }
            } catch (err: any) {
                console.log('popular recipe 조회 err: ', err);
                setMessage(err.message);
            }
        };
        fetchRecipes();
    }, []);
    console.log('popular: ', message);

    return (
        <RecipeContainer>
            {page ? <RecipePageTitle>Popular Recipes</RecipePageTitle> : <RecipePageHeader title="Popular" />}
            <RecipeList recipes={recipes} limit={limit} page={page} />
        </RecipeContainer>
    );
}

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
