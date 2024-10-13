import { ChangeEvent, KeyboardEvent } from 'react';
import { SearchResult } from './SearchResult';
import SearchCondition from './SearchCondition';
import PopularRecipe from '../PopularRecipe/PopularRecipe';
import { SelectChangeEvent } from '@mui/material/Select';

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
interface ContainerProps {
    time: string;
    level: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleSubmit: () => Promise<void>;
    handleTime: (e: SelectChangeEvent) => void;
    handleLevel: (e: SelectChangeEvent) => void;
    ingredientsList: string[];
    recipes: RecipeProps[];
    searching: boolean;
}

export default function SearchContainer({
    time,
    level,
    value,
    onChange,
    handleSubmit,
    handleKeyDown,
    handleLevel,
    handleTime,
    ingredientsList,
    recipes,
    searching,
}: ContainerProps): JSX.Element {
    return (
        <>
            <SearchCondition
                time={time}
                level={level}
                value={value}
                onChange={onChange}
                handleSubmit={handleSubmit}
                handleKeyDown={handleKeyDown}
                handleLevel={handleLevel}
                handleTime={handleTime}
                ingredientsList={ingredientsList}
            />
            <PopularRecipe page="search" />
            <SearchResult recipes={recipes} searching={searching} />
        </>
    );
}
