import AllRecipesData from './AllRecipesData';

export interface RecipeLimitProps {
    limit?: number;
}

export default function AllRecipesView({ limit }: RecipeLimitProps) {
    return <AllRecipesData limit={limit} />;
}
