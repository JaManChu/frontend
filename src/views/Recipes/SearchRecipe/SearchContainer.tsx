import { SearchResult } from './SearchResult';
import SearchCondition from './SearchCondition';
import useSearchRecipe from '../../../hooks/useSearchRecipe';

export default function SearchContainer(): JSX.Element {
    const {
        handleChange,
        handleSubmit,
        handleKeyDown,
        searching,
        recipes,
        searchIngredients,
        ingredientsList,
        handleChangeLevel,
        handleChangeTime,
        level,
        time,
    } = useSearchRecipe();

    return (
        <>
            <SearchCondition
                value={searchIngredients}
                onChange={handleChange}
                handleSubmit={handleSubmit}
                handleKeyDown={handleKeyDown}
                handleChangeLevel={handleChangeLevel}
                handleChangeTime={handleChangeTime}
                ingredientsList={ingredientsList}
                level={level}
                time={time}
            />
            <SearchResult recipes={recipes} searching={searching} />
        </>
    );
}
