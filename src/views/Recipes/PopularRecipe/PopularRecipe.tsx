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
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes/popular`);
                if (response.status == 200) {
                    console.log('popular recipe response: ', response);
                    console.log(response.data);
                    setRecipes(response.data);
                    alert('레시피 조회 성공');
                }
            } catch (err) {
                console.log('popular recipe 조회 err: ', err);
                alert('레시피 조회에 싪패하였습니다.');
            }
        };
        fetchRecipes();
    }, [recipes]);

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
