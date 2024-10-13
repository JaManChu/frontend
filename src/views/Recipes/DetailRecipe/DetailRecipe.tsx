import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BsCartCheckFill } from 'react-icons/bs';
import RecipeMetaData from '../../../components/Recipe/RecipeMetaData';
import CommentsView from '../../Comments/CommentsView';
import styled from 'styled-components';
import axios from 'axios';

interface Props {
    recipeId: number;
    recipeAuthor: string;
    recipeName: string;
    recipeLevel: string;
    recipeCookingTime: string;
    // rate: number;
    recipeThumbnail: string;
    recipeIngredients: Record<string, string>[];
    recipesManuals: Record<string, string>[];
    // desc: string;
    // overview: string;
}

export default function DetailRecipe(): JSX.Element {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Props | null>(null);
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/recipes/${id}`);
                if (response.data.code === 'OK') {
                    console.log('detailpage response.data.data: ', response.data.data);
                    setRecipe(response.data.data);
                    setMessage(response.data.message);
                }
            } catch (err: any) {
                console.log(err);
                console.log('err.data "detailpage": ', err.data);
                setMessage(err.response.data.message);
            }
        };
        fetchData();
    }, []);
    console.log('detailPage message:', message);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    return (
        <DetailRecipeContainer>
            <DetailRecipeName>{recipe.recipeName}</DetailRecipeName>
            <DetailRecipeContents>
                <DetailRecipeInstruction>
                    <img src={recipe.recipeThumbnail} alt="썸네일 이미지" />
                    {recipe.recipesManuals &&
                        recipe.recipesManuals.map((step, idx) => (
                            <DetailRecipeFigure key={idx}>
                                <img src={`${step.recipeOrderImage}`} alt="단계별 이미지" />
                                <DetailRecipeFigcapton>{`${idx + 1}. ${step.recipeOrderContent}`}</DetailRecipeFigcapton>
                            </DetailRecipeFigure>
                        ))}
                </DetailRecipeInstruction>

                <DetailRecipeInfo>
                    <DetailOverview>
                        <h3>OverView</h3>
                        <p>Overview text??????</p>
                    </DetailOverview>
                    <DetailIngredientsWrapper>
                        <h3>Ingredients</h3>
                        <DetailIngredientsTable>
                            <thead>
                                <tr>
                                    <th>재료</th>
                                    <th>개수</th>
                                    <th>구매</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipe.recipeIngredients &&
                                    recipe.recipeIngredients.map((ingredient, idx) => (
                                        <tr key={`${ingredient.ingredientName}+${idx}`}>
                                            <td>{ingredient.ingredientName}</td>
                                            <td>{ingredient.ingredientQuantity}</td>
                                            <td>
                                                <Link to={`${ingredient.ingredientCoupangLink}`}>
                                                    <CartIcon />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </DetailIngredientsTable>
                    </DetailIngredientsWrapper>
                    <RecipeMetaData time={recipe.recipeCookingTime} level={recipe.recipeLevel} rate="평점 필요함" />
                </DetailRecipeInfo>
            </DetailRecipeContents>
            <CommentsView />
        </DetailRecipeContainer>
    );
}

const DetailRecipeContainer = styled.section`
    padding: 50px;
    height: 100vh;
    width: 100%;
`;
const DetailRecipeName = styled.h2`
    margin: auto;
    color: #622b18;
    font-size: 32px;
    text-align: start;
`;
const DetailRecipeContents = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
`;
const DetailRecipeInstruction = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    img {
        width: 100%;
        border: 1px solid lightgray;
    }
`;
const DetailRecipeFigure = styled.figure`
    width: 40%;
    flex-grow: 1;
    img {
        display: block;
        height: 200px;
        border: 1px solid;
    }
`;
const DetailRecipeFigcapton = styled.figcaption`
    margin-bottom: 16px;
    line-height: 2rem;
`;
const DetailRecipeInfo = styled.div`
    flex-shrink: 0;
    width: 30%;
    position: sticky;
    height: auto;
    top: 20px;
`;
const DetailOverview = styled.div`
    margin: 0px 16px 50px;
    text-align: center;
    h3 {
        font-size: 24px;
        font-weight: 400;
    }
`;
const DetailIngredientsWrapper = styled.div`
    margin: 16px;
    text-align: center;
    h3 {
        font-size: 24px;
        font-weight: 400;
    }
`;

const DetailIngredientsTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    th,
    td {
        text-align: center;
        padding: 10px;
        border: 1px solid;
    }
    th {
        background-color: #f2f2f2;
        border-bottom: 2px double #622b18;
        font-weight: normal;
    }
    td:first-child,
    td:last-child,
    th:first-child,
    th:last-child {
        border-left: none;
        border-right: none;
    }
`;

const CartIcon = styled(BsCartCheckFill)`
    &:hover {
        color: #efb63e;
    }
    cursor: pointer;
`;
