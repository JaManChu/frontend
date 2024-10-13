import SearchContainer from './SearchContainer';
import useSearchRecipe from '../../../hooks/useSearchRecipe';

export default function SearchView() {
    const {
        time,
        level,
        handleChange,
        handleSubmit,
        handleKeyDown,
        searching,
        recipes,
        searchIngredients,
        ingredientsList,
        handleLevel,
        handleTime,
    } = useSearchRecipe();
    return (
        <SearchContainer
            time={time}
            level={level}
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
