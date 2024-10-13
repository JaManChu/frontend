import SearchContainer from './SearchContainer';
import useSearchRecipe from '../../../hooks/useSearchRecipe';
import { S_RecipeContainer } from '../../../styles/RecipeContainer';

export default function SearchViewRecipes() {
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
        <S_RecipeContainer>
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
        </S_RecipeContainer>
    );
}
