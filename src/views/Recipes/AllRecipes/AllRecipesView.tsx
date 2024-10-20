import AllRecipesData from './AllRecipesData';

export interface RecipeLimitProps {
    limit?: number;
    page?: string;
}

export default function AllRecipesView({ limit, page }: RecipeLimitProps) {
    return <AllRecipesData limit={limit} page={page} />;
}
