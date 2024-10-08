import styled from 'styled-components';
import { useRecipeWrite } from '../../../hooks/useRecipeWrite';

const RecipeWrite: React.FC = () => {
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
            <FormSections>
                <FormSection>
                    <Title>레시피명</Title>
                    <Input value={recipeName} onChange={(e) => setRecipeName(e.target.value)} placeholder="레시피 이름을 입력하세요." />

                    <SubTitle>레시피 난이도</SubTitle>
                    <Select value={recipeLevel} onChange={(e) => setRecipeLevel(e.target.value)}>
                        <option value="EASY">EASY</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="HIGH">HIGH</option>
                    </Select>

                    <SubTitle>요리 시간 (분)</SubTitle>
                    <Input
                        type="number"
                        value={recipeCookingTime}
                        onChange={(e) => setRecipeCookingTime(e.target.value)}
                        placeholder="요리 시간을 입력하세요."
                        min={'0'}
                    />

                    <Button onClick={handleSubmit}>레시피 등록</Button>
                </FormSection>

                <FormSection>
                    <Title>재료</Title>
                    {ingredients.map((ingredient, index) => (
                        <CardSection key={index}>
                            <SubTitle>재료 {index + 1}</SubTitle>
                            <Input
                                value={ingredient.ingredientName}
                                placeholder="재료 이름"
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].ingredientName = e.target.value;
                                    setIngredients(newIngredients);
                                }}
                            />
                            <Input
                                value={ingredient.ingredientQuantity}
                                placeholder="재료 양"
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].ingredientQuantity = e.target.value;
                                    setIngredients(newIngredients);
                                }}
                            />
                            <Button onClick={() => handleDeleteIngredient(index)}>재료 삭제</Button>
                        </CardSection>
                    ))}
                    <Button onClick={handleAddIngredient}>재료 추가</Button>
                </FormSection>

                <FormSection>
                    <Title>조리 과정</Title>
                    {steps.map((step, index) => (
                        <CardSection key={index}>
                            <SubTitle>단계 {index + 1}</SubTitle>
                            <Input
                                value={step.content}
                                placeholder="조리 과정을 입력하세요."
                                onChange={(e) => {
                                    const newSteps = [...steps];
                                    newSteps[index].content = e.target.value;
                                    setSteps(newSteps);
                                }}
                            />
                            <Input type="file" onChange={(e) => handleImageChange(e, index)} />
                            <Button onClick={() => handleDeleteStep(index)}>단계 삭제</Button>
                        </CardSection>
                    ))}
                    <Button onClick={handleAddStep}>단계 추가</Button>
                </FormSection>
            </FormSections>

            <PreviewSection>
                <Title>{recipeName} 미리보기</Title>
                <IngredientsPreview>
                    <SubTitle>재료</SubTitle>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.ingredientName} : {ingredient.ingredientQuantity}
                            </li>
                        ))}
                    </ul>
                </IngredientsPreview>
                <StepsPreview>
                    <SubTitle>조리 과정</SubTitle>

                    {steps.map((step, index) => (
                        <StepPreviewCard key={index}>
                            단계 {step.order}
                            {imagePreviews[index] && <ImgPreview src={imagePreviews[index]!} alt={`미리보기 ${index}`} />}
                            <StepContentPreview>{step.content}</StepContentPreview>
                        </StepPreviewCard>
                    ))}
                </StepsPreview>
            </PreviewSection>
        </RecipeWriteContainer>
    );
};

const RecipeWriteContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(100px 100px 1fr 1fr);
    gap: 20px;
    padding: 40px;
    width: 100%;
    max-height: 1000px;
    overflow: auto;
`;

const FormSections = styled.div`
    display: grid;
    grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 40px;
    width: 100%;
    overflow: auto;
`;
const FormSection = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    overflow: auto;
    margin-top: 40px;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 10px;
    width: auto;
    display: inline-block;
    background-color: #f8c407;
    border-radius: 10px;
`;

const SubTitle = styled.h1`
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 10px;
    display: block;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    margin-bottom: 15px;

    &:focus {
        border-color: #f59910;
        outline: none;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
    margin-bottom: 15px;

    &:focus {
        border-color: #f59910;
        outline: none;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 15px;
    font-size: 16px;
    background-color: #f59910;
    border: none;
    color: white;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #fa7602;
    }
`;

const CardSection = styled.div`
    background-color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
`;

//미리보기
const PreviewSection = styled.div`
    background-color: #f7f7f7;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    overflow: auto;
    width: 100%;
    max-height: 1000px;
    overflow: auto;
`;

const IngredientsPreview = styled.div`
    margin-top: 50px;
`;

const StepsPreview = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
`;

const StepPreviewCard = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    font-size: 1.2rem;
`;

const StepContentPreview = styled.div`
    margin-top: 10px;
`;

const ImgPreview = styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 9px;
    margin-top: 30px;
`;
//미리보기
export default RecipeWrite;
