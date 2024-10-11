import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
import { useRecipeWrite } from '../../../hooks/useRecipeWrite';
import DefaultImg from '../../../assets/img/defaultImg.jpeg';

const UpdateRecipe: React.FC = () => {
    const { recipeId } = useParams<{ recipeId: string }>(); // URL에서 recipeId를 가져옴
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
        steps,
        setSteps,
        handleDeleteIngredient,
        handleDeleteStep,
        handleImageChange,
        imagePreviews,
    } = useRecipeWrite();

    // 레시피 데이터 가져오기
    useEffect(() => {
        //api호출 추후
        // const fetchRecipeData = async () => {
        //     try {
        //         const response = await axios.get(`/recipes/${recipeId}`, {
        //             headers: {
        //                 'Access-Token': `Bearer ${sessionStorage.getItem('token')}`,
        //             },
        //         });
        //         const recipeData = response.data;
        //         // 데이터를 폼 필드에 채움
        //         setRecipeName(recipeData.recipeName);
        //         setRecipeLevel(recipeData.recipeLevel);
        //         setRecipeCookingTime(recipeData.recipeCookingTime);
        //         setIngredients(recipeData.recipeIngredient);
        //         setSteps(recipeData.recipeOrderContent);
        //     } catch (error) {
        //         console.error('Failed to fetch recipe data', error);
        //     }
        // };

        // fetchRecipeData();

        const dummyData = {
            recipeName: '더미 레시피',
            recipeLevel: 'NORMAL',
            recipeCookingTime: '30',
            recipeIngredient: [
                { ingredientName: '재료1', ingredientQuantity: '100g' },
                { ingredientName: '재료2', ingredientQuantity: '200g' },
            ],
            recipeOrderContent: [
                { order: 1, content: '단계 1 설명', picture: null },
                { order: 2, content: '단계 2 설명', picture: null },
            ],
        };

        // 더미 데이터를 상태에 설정
        setRecipeName(dummyData.recipeName);
        setRecipeLevel(dummyData.recipeLevel);
        setRecipeCookingTime(dummyData.recipeCookingTime);
        setIngredients(dummyData.recipeIngredient);
        setSteps(dummyData.recipeOrderContent);
    }, [recipeId, setRecipeName, setRecipeLevel, setRecipeCookingTime, setIngredients, setSteps]);

    const handleUpdateRecipe = async () => {
        alert('더미 데이터를 사용하여 레시피 수정 시도 (실제 서버 호출 없음)');
    };

    // // 수정된 레시피 데이터를 제출(api호출 추후)
    // const handleUpdateRecipe = async () => {
    //     try {
    //         const formData = new FormData();
    //         if (recipeId) {
    //             formData.append('recipeId', recipeId);
    //         }

    //         formData.append('recipeName', recipeName);
    //         formData.append('recipeLevel', recipeLevel);
    //         formData.append('recipeCookingTime', recipeCookingTime);
    //         ingredients.forEach((ingredient, index) => {
    //             formData.append(`recipeIngredient[${index}].ingredientName`, ingredient.ingredientName);
    //             formData.append(`recipeIngredient[${index}].ingredientQuantity`, ingredient.ingredientQuantity);
    //         });
    //         steps.forEach((step, index) => {
    //             formData.append(`recipeOrderContent[${index}].order`, String(step.order));
    //             formData.append(`recipeOrderContent[${index}].content`, step.content);
    //             if (step.picture) {
    //                 formData.append(`recipeOrderContent[${index}].picture`, step.picture);
    //             }
    //         });

    //         await axios.put('/recipes', formData, {
    //             headers: {
    //                 'Access-Token': `Bearer ${sessionStorage.getItem('token')}`,
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         alert('레시피가 성공적으로 수정되었습니다.');
    //     } catch (error) {
    //         console.error('Failed to update recipe', error);
    //         alert('레시피 수정에 실패했습니다.');
    //     }
    // };

    return (
        <RecipeWriteContainer>
            <RecipeHeader>
                <RecipeNameInput value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="레시피 이름을 수정하세요." />
            </RecipeHeader>
            <RecipeContent>
                <RecipeSteps>
                    {steps.map((step, index) => (
                        <RecipeStep key={index}>
                            <RecipeStepImage src={imagePreviews[index] || DefaultImg} alt={`Step ${index + 1}`} />
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
                        <h3>레시피 수정</h3>
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
                            placeholder="요리 시간을 수정하세요."
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
                    <SubmitButton onClick={handleUpdateRecipe}>레시피 수정</SubmitButton>
                </RecipeSidebar>
            </RecipeContent>
        </RecipeWriteContainer>
    );
};

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
    flex-shrink: 0;
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
    width: 100%;
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

export default UpdateRecipe;
