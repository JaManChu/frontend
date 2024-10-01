import RecipeCard from './RecipeCard';
import styled from 'styled-components';

const RecipeContainer = styled.section<{ isMain?: boolean }>`
    display: grid;
    gap: 16px;
    padding: ${(props) => (props.isMain ? '0px' : '30px;')};
    grid-template-columns: ${(props) => (props.isMain ? '1fr' : 'repeat(2, 1fr)')};
`;

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
    isMain?: boolean;
}
export default function RecipeList({ recipes, limit, isMain }: RecipeListProps) {
    const displayRecipes = limit ? recipes.slice(0, limit) : recipes;
    console.log(isMain);
    return (
        <RecipeContainer isMain={isMain}>
            {/* 데이터 연동하면 ...recipe로 코드 변경 필요 */}
            {displayRecipes.map((recipe: RecipeProps) => (
                <RecipeCard key={recipe.id} {...recipe} isMain={isMain} />
            ))}
        </RecipeContainer>
    );
}
