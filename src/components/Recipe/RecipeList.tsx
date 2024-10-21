// import RecipeCard from './RecipeCard';
import RecipeNewCard from './RecipeNewCard';
import styled from 'styled-components';

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
interface RecipeListProps {
    recipes: RecipeProps[];
    limit?: number;
}
export default function RecipeList({ recipes, limit }: RecipeListProps): JSX.Element {
    const mainRecipes = limit ? recipes.slice(0, limit) : recipes;
    return (
        <S_RecipeULlist>
            {mainRecipes.map((recipe: RecipeProps) => (
                <li key={recipe.recipeId}>
                    <RecipeNewCard key={recipe.recipeId} {...recipe} />
                </li>
            ))}
        </S_RecipeULlist>
    );
}

const S_RecipeULlist = styled.ul`
    list-style: none;
    display: grid;
    gap: 16px;
    padding: 30px;
    grid-template-columns: repeat(3, 1fr);
`;
