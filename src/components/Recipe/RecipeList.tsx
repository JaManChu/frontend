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
    page?: string;
}
export default function RecipeList({ recipes, limit, page }: RecipeListProps): JSX.Element {
    const displayRecipes = limit ? recipes.slice(0, limit) : recipes;

    return (
        <S_RecipeULlist page={page}>
            {displayRecipes.map((recipe: RecipeProps) => (
                <li key={recipe.recipeId}>
                    <RecipeNewCard key={recipe.recipeId} {...recipe} page={page} />
                </li>
            ))}
        </S_RecipeULlist>
    );
}

const S_RecipeULlist = styled.ul<{ page?: string }>`
    list-style: none;
    display: grid;
    gap: 16px;
    padding: ${(props) => (props.page == 'all' ? '0px' : props.page == 'recommended' || props.page == 'popular' ? '8px 50px 50px' : '30px;')};
    grid-template-columns: ${(props) => (props.page == 'all' ? '1fr' : props.page == 'recommended' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)')};
`;
