import styled from 'styled-components';
import { useRecipeWrite } from '../../../hooks/useRecipeWrite';

const CreateRecipe: React.FC = () => {
    const {
        recipeName,
        setRecipeName,
        recipeLevel,
        setRecipeLevel,
        recipeCookingTime,
        setRecipeCookingTime,
        ingredients,
        setIngredients,
        handleAddIngredient,
        handleAddStep,
        handleSubmit,
        steps,
        setSteps,
        handleDeleteIngredient,
        handleDeleteStep,
        handleImageChange,
        imagePreviews,
    } = useRecipeWrite();

    return (
        <RecipeWriteContainer>
            <RecipeHeader>
                <RecipeNameInput value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="레시피 이름을 입력하세요." />
            </RecipeHeader>

            <RecipeContent>
                <RecipeSteps>
                    {steps.map((step, index) => (
                        <RecipeStep key={index}>
                            <RecipeStepImage src={imagePreviews[index]} alt={`Step ${index + 1}`} />
                            <RecipeStepContent>
                                <StepInput
                                    value={step.content}
                                    onChange={(e) => {
                                        const newSteps = [...steps];
                                        newSteps[index].content = e.target.value;
                                        setSteps(newSteps);
                                    }}
                                    placeholder={`Step ${index + 1}`}
                                />
                                <StepFileInput type="file" onChange={(e) => handleImageChange(e, index)} />
                                <DeleteButton onClick={() => handleDeleteStep(index)}>단계 삭제</DeleteButton>
                            </RecipeStepContent>
                        </RecipeStep>
                    ))}
                    <AddButton onClick={handleAddStep}>단계 추가</AddButton>
                </RecipeSteps>

                <RecipeSidebar>
                    <RecipeDetails>
                        <h3>레시피 난이도</h3>
                        <RecipeSelect value={recipeLevel} onChange={(e) => setRecipeLevel(e.target.value)}>
                            <option value="EASY">EASY</option>
                            <option value="NORMAL">NORMAL</option>
                            <option value="HIGH">HIGH</option>
                        </RecipeSelect>

                        <h3>요리 시간 (분)</h3>
                        <RecipeInput
                            type="number"
                            value={recipeCookingTime}
                            onChange={(e) => setRecipeCookingTime(e.target.value)}
                            placeholder="요리 시간을 입력하세요."
                        />
                    </RecipeDetails>

                    <RecipeIngredients>
                        <h3>재료</h3>
                        {ingredients.map((ingredient, index) => (
                            <Ingredient key={index}>
                                <RecipeInput
                                    value={ingredient.ingredientName}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index].ingredientName = e.target.value;
                                        setIngredients(newIngredients);
                                    }}
                                    placeholder="재료 이름"
                                />
                                <RecipeInput
                                    value={ingredient.ingredientQuantity}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index].ingredientQuantity = e.target.value;
                                        setIngredients(newIngredients);
                                    }}
                                    placeholder="재료 양"
                                />
                                <DeleteButton onClick={() => handleDeleteIngredient(index)}>재료 삭제</DeleteButton>
                            </Ingredient>
                        ))}
                        <AddButton onClick={handleAddIngredient}>재료 추가</AddButton>
                    </RecipeIngredients>

                    <SubmitButton onClick={handleSubmit}>레시피 등록</SubmitButton>
                </RecipeSidebar>
            </RecipeContent>
        </RecipeWriteContainer>
    );
};

// Styled components

const RecipeWriteContainer = styled.section`
    display: flex;
    flex-direction: column;
    padding: 50px;
    width: 100%;
`;

//헤더부분
const RecipeHeader = styled.div`
    text-align: start;
    margin-bottom: 20px;
`;

const RecipeNameInput = styled.input`
    font-size: 32px;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

//컨텐츠부분
const RecipeContent = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

const RecipeSteps = styled.div`
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

const RecipeStep = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
`;

const RecipeStepImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: contain;
    border: 1px solid #ccc;
`;

const RecipeStepContent = styled.div`
    margin-top: 10px;
`;

const StepInput = styled.textarea`
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 10px;
`;

const StepFileInput = styled.input`
    margin-top: 10px;
`;

const RecipeSidebar = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: sticky;
    top: 50px;
    flex-shrink: 0; /* Prevent shrinking of the sidebar */
`;

const RecipeDetails = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const RecipeSelect = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const RecipeInput = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const RecipeIngredients = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Ingredient = styled.div`
    margin-bottom: 10px;
`;

const AddButton = styled.button`
    padding: 10px 20px;
    background-color: lightgray;
    color: black;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%; /* Fix width for consistency */
    height: 50px;
    &:hover {
        background-color: #fa7602;
    }
`;

const DeleteButton = styled.button`
    padding: 8px 16px;
    background-color: #e74c3c;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
    &:hover {
        background-color: #c0392b;
    }
`;

const SubmitButton = styled.button`
    padding: 15px;
    font-size: 16px;
    background-color: lightgray;
    border: none;
    color: black;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        background-color: #fa7602;
    }
`;

export default CreateRecipe;
