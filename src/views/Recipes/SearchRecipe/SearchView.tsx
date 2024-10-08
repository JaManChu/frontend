import SearchContainer from './SearchContainer';
import useSearchRecipe from '../../../hooks/useSearchRecipe';

export default function SearchView() {
    const { handleChange, handleSubmit, handleKeyDown, searching, recipes, searchIngredients, ingredientsList, handleLevel, handleTime } =
        useSearchRecipe();
    return (
        <SearchContainer
            value={searchIngredients}
            onChange={handleChange}
            handleSubmit={handleSubmit}
            handleKeyDown={handleKeyDown}
            handleLevel={handleLevel}
            handleTime={handleTime}
            ingredientsList={ingredientsList}
            recipes={recipes}
            searching={searching}
        />
    );
}
