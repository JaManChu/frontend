import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
// import axios from 'axios';
import { BsCartCheckFill } from 'react-icons/bs';
import fakeData from '../../../fakeData/recipeFake';
import RecipeMetaData from '../../../components/Recipe/RecipeMetaData';
import CommentsView from '../../Comments/CommentsView';

interface Props {
    id: string;
    title: string;
    image: string;
    thumbnail: string;
    time: string;
    level: string;
    rate: string;
    desc: string;
    ingredients: Record<string, string | number>[];
    overview: string;
    instructions: Record<string, number | string>[];
}

export default function DetailRecipe(): JSX.Element {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Props | null>(null);
    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes/${id}`);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // };

        // ! fakeData 필터링하는 작업(추후 삭제)
        const filtered = fakeData.filter((data) => data.id == id);
        if (filtered.length > 0) {
            setRecipe(filtered[0]);
        }
    }, []);

    if (!recipe) {
        return <div>Loading</div>;
    }
    return (
        <DetailRecipeContainer>
            <DetailRecipeName>{recipe.title}</DetailRecipeName>
            <DetailRecipeContents>
                <DetailRecipeInstruction>
                    <img src={recipe.thumbnail} alt="썸네일 이미지" />
                    {recipe.instructions.map((step, idx) => (
                        <DetailRecipeFigure key={idx}>
                            <img src={`${step.image}`} alt="단계별 이미지" />
                            <DetailRecipeFigcapton>{`${idx + 1}. ${step.content}`}</DetailRecipeFigcapton>
                        </DetailRecipeFigure>
                    ))}
                </DetailRecipeInstruction>

                <DetailRecipeInfo>
                    <DetailOverview>
                        <h3>OverView</h3>
                        <p>{recipe.overview}</p>
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
                                {recipe.ingredients.map((ingredient, idx) => (
                                    <tr key={`${ingredient.name}+${idx}`}>
                                        <td>{ingredient.name}</td>
                                        <td>{ingredient.count}</td>
                                        <td>
                                            <CartIcon />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </DetailIngredientsTable>
                    </DetailIngredientsWrapper>
                    <RecipeMetaData time={recipe.time} level={recipe.level} rate={recipe.rate} />
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
