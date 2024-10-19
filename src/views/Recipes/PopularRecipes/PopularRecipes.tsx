import RecipeList from '../../../components/Recipe/RecipeList.js';
import useObserver from '../../../hooks/useObserver.js';
// import { debounce } from 'lodash';

interface RecipeLimitProps {
    limit?: number;
    page?: string;
    recipes: RecipeProps[];
    fetchRecipes: () => void;
    isLoading: boolean;
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

export default function PopularRecipes({ limit, page, recipes, fetchRecipes, isLoading }: RecipeLimitProps): JSX.Element {
    const handleObserver = async (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && !isLoading) {
            await fetchRecipes();
        }
    };

    const target = useObserver(handleObserver);

    return (
        <>
            <RecipeList recipes={recipes} limit={limit} page={page} />
            <div id="observer" ref={target}>
                Circle
            </div>
        </>
    );
}
