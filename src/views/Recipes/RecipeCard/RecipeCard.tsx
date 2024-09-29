import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStairs, FaRegClock, FaRegStar } from 'react-icons/fa6';

const RecipeCardFigure = styled.figure`
    width: 50%;
    height: 200px;
    border: 1px solid lightgrey;
    display: flex;

    img {
        min-width: 200px;
    }
`;
const RecipeFigcaption = styled.figcaption`
    padding: 16px;
    text-align: center;
`;
const RecipeInfo = styled.div`
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const RecipeInfoItem = styled.span`
    margin: 0 8px 0 5px;
`;
const RecipeDescription = styled.p`
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
`;
const Linked = styled(Link)`
    text-decoration: none;
    color: #000;
    &:hover {
        color: #a77a17;
    }
`;

interface CardProps {
    id: number;
    title: string;
    image: string;
    time: string;
    level: string;
    rate: string;
    desc: string;
}

export default function RecipeCard(props: CardProps) {
    return (
        <RecipeCardFigure>
            <img src={props.image} alt="레시피이미지" />
            <RecipeFigcaption>
                <h4>
                    <Linked to={`/recipes/${props.id}`}>{props.title}</Linked>
                </h4>
                <RecipeInfo>
                    <FaRegClock />
                    <RecipeInfoItem>{props.time}</RecipeInfoItem>
                    <FaStairs />
                    <RecipeInfoItem>{props.level}</RecipeInfoItem>
                    <FaRegStar />
                    <RecipeInfoItem>{props.rate}</RecipeInfoItem>
                </RecipeInfo>
                <RecipeDescription>{props.desc}</RecipeDescription>
                <span>
                    <Linked to={`/recipes/${props.id}`}>view more</Linked>
                </span>
            </RecipeFigcaption>
        </RecipeCardFigure>
    );
}
