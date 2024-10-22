import styled from 'styled-components';
import RecipeList from '../../../components/Recipe/RecipeList';
import useObserver from '../../../hooks/useObserver.js';
import Loading from '../../../components/Loading/Loading.js';

interface RecipeProps {
    recipeId: number;
    recipeName: string;
    recipeAuthor: string;
    recipeLevel: string;
    recipeCookingTime: string;
    recipeThumbnail: string;
    // rate: string;
    // desc: string;
    ingredients: Record<string, string | number>[];
    overview: string;
    instructions: Record<number | string, string>[];
}
interface SearchResultProps {
    recipes: RecipeProps[];
    isLoading: boolean;
    hasSearched: boolean;
    fetchRecipes: () => void;
}

export function SearchResult({ recipes, isLoading, fetchRecipes, hasSearched }: SearchResultProps) {
    const handleObserver = async (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && !isLoading) {
            await fetchRecipes();
        }
    };
    const target = useObserver(handleObserver);

    return (
        <ResultContainer>
            <RecipeList recipes={recipes} />
            {hasSearched && recipes.length > 0 && (
                <div ref={target}>
                    <Loading />
                </div>
            )}
        </ResultContainer>
    );
}

const ResultContainer = styled.section``;
