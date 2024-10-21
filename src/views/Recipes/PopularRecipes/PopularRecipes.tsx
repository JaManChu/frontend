import RecipeList from '../../../components/Recipe/RecipeList.js';
import useObserver from '../../../hooks/useObserver.js';
import Loading from '../../../components/Loading/Loading.js';
import { RecipeProps } from './PopularRecipeData.js';
// import { debounce } from 'lodash';

interface RecipeLimitProps {
    recipes: RecipeProps[];
    fetchRecipes: () => void;
    isLoading: boolean;
}

export default function PopularRecipes({ recipes, fetchRecipes, isLoading }: RecipeLimitProps): JSX.Element {
    const handleObserver = async (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && !isLoading) {
            await fetchRecipes();
        }
    };

    const target = useObserver(handleObserver);

    return (
        <>
            <RecipeList recipes={recipes} />
            <div ref={target}>
                <Loading />
            </div>
        </>
    );
}
