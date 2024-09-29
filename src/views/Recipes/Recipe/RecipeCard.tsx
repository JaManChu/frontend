import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStairs, FaRegClock, FaRegStar, FaRegBookmark, FaBookmark, FaBook } from 'react-icons/fa6';
import styled from 'styled-components';

const RecipeCardFigure = styled.figure`
    height: 200px;
    border: 1px solid lightgrey;
    border-radius: 8px;
    display: flex;
    position: relative;

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
const BookmarkIcons = styled.span<{ mark: boolean }>`
    position: absolute;
    top: 10px;
    right: 10px;
    &:hover {
        color: #efb63e;
        cursor: pointer;
    }
    color: ${({ mark }) => (mark ? '#efb63e' : 'inherit')};
`;

interface CardProps {
    id: string;
    title: string;
    image: string;
    time: string;
    level: string;
    rate: string;
    desc: string;
}

export default function RecipeCard(props: CardProps) {
    const [marked, setMarked] = useState<boolean>(false);

    return (
        <RecipeCardFigure>
            <img src={props.image} alt="레시피이미지" />
            <RecipeFigcaption>
                <h4>
                    <Linked to={`/recipes/${props.id}`}>{props.title}</Linked>
                </h4>
                <BookmarkIcons mark={marked} onClick={() => setMarked(!marked)}>
                    {marked ? <FaBookmark /> : <FaRegBookmark />}
                </BookmarkIcons>

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
