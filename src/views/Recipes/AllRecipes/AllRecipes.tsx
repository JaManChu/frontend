import RecipeList from '../../../components/Recipe/RecipeList.js';
import useObserver from '../../../hooks/useObserver.js';
import Loading from '../../../components/Loading/Loading.js';
import { RecipeProps } from './AllRecipesData.js';

interface RecipeLimitProps {
    limit?: number;
    page?: string;
    recipes: RecipeProps[];
    fetchRecipes: () => void;
    isLoading: boolean;
}

export default function AllRecipes({ limit, page, recipes, fetchRecipes, isLoading }: RecipeLimitProps): JSX.Element {
    const handleObserver = async (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && !isLoading) {
            await fetchRecipes();
        }
    };

    const target = useObserver(handleObserver);

    return (
        <>
            <RecipeList recipes={recipes} limit={limit} page={page} />
            <div ref={target}>
                <Loading />
            </div>
        </>
    );
}
