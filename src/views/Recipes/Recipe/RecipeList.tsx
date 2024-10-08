import RecipeCard from './RecipeCard';
import styled from 'styled-components';

interface RecipeProps {
    id: string;
    title: string;
    image: string;
    time: string;
    level: string;
    rate: string;
    desc: string;
}
interface RecipeListProps {
    recipes: RecipeProps[];
    limit?: number;
    page?: string;
}
export default function RecipeList({ recipes, limit, page }: RecipeListProps): JSX.Element {
    const displayRecipes = limit ? recipes.slice(0, limit) : recipes;

    return (
        <RecipeUlist page={page}>
            {/* 데이터 연동하면 ...recipe로 코드 변경 필요 */}
            {displayRecipes.map((recipe: RecipeProps) => (
                <li key={recipe.id}>
                    <RecipeCard key={recipe.id} {...recipe} page={page} />
                </li>
            ))}
        </RecipeUlist>
    );
}

const RecipeUlist = styled.ul<{ page?: string }>`
    list-style: none;
    display: grid;
    gap: 16px;
    padding: ${(props) => (props.page == 'latest' ? '0px' : props.page == 'recommended' || props.page == 'popular' ? '8px 50px 50px' : '30px;')};
    grid-template-columns: ${(props) => (props.page == 'latest' ? '1fr' : props.page == 'recommended' ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)')};
`;
