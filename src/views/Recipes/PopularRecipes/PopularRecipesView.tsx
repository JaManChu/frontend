import PopularRecipeData from './PopularRecipeData.js';

// import { debounce } from 'lodash';

export interface RecipeLimitProps {
    limit?: number;
    page?: string;
}

export default function PopularRecipesView({ limit, page }: RecipeLimitProps): JSX.Element {
    return (
        <>
            <PopularRecipeData limit={limit} page={page} />
        </>
    );
}
