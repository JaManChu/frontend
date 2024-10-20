import { useState } from 'react';
import { SearchResult } from './SearchResult';
import SearchCondition from './SearchCondition';

export interface RecipeProps {
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

export default function SearchContainer(): JSX.Element {
    const [searching, setSearching] = useState<boolean>(false); // 검색중 여부
    const [recipes, setRecipes] = useState<RecipeProps[]>([]); // 레시피 데이터 저장

    return (
        <>
            <SearchCondition setSearching={setSearching} setRecipes={setRecipes} />
            <SearchResult recipes={recipes} searching={searching} />
        </>
    );
}
