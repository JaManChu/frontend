import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStairs, FaRegClock, FaRegStar, FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import styled from 'styled-components';

const RecipeCardFigure = styled.figure<{ isMain: boolean }>`
    border: 1px solid lightgrey;
    border-radius: ${(isMain) => (isMain ? 0 : '8px')};
    display: flex;
    position: relative;

    height: ${(isMain) => (isMain ? '300px' : '200px')};
    img {
        display: block;
        min-width: 200px;
        width: ${(isMain) => (isMain ? '50%' : '30%')};
        border-right: 1px solid lightgrey;
        flex-shrink: 0;
    }
`;
const RecipeFigcaption = styled.figcaption`
    padding: 16px;
    text-align: center;
`;
const RecipePageTitle = styled.h2`
    margin: 16px;
    font-size: 40px;
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
    isMain?: boolean;
    id: string;
    title: string;
    image: string;
    time: string;
    level: string;
    rate: string;
    desc: string;
}

export default function RecipeCard({ isMain = false, id, title, image, time, level, rate, desc }: CardProps) {
    const [marked, setMarked] = useState<boolean>(false);

    return (
        <RecipeCardFigure isMain={isMain}>
            <img src={image} alt="레시피이미지" />
            <RecipeFigcaption>
                {isMain && <RecipePageTitle>Latest Rcipes</RecipePageTitle>}
                <h4>
                    <Linked to={`/recipes/${id}`}>{title}</Linked>
                </h4>
                <BookmarkIcons mark={marked} onClick={() => setMarked(!marked)}>
                    {marked ? <FaBookmark /> : <FaRegBookmark />}
                </BookmarkIcons>
                <RecipeInfo>
                    <FaRegClock />
                    <RecipeInfoItem>{time}</RecipeInfoItem>
                    <FaStairs />
                    <RecipeInfoItem>{level}</RecipeInfoItem>
                    <FaRegStar />
                    <RecipeInfoItem>{rate}</RecipeInfoItem>
                </RecipeInfo>
                <RecipeDescription>{desc}</RecipeDescription>
                <span>{isMain ? <Linked to={`/recipes/latest`}>view more</Linked> : <Linked to={`/recipes/${id}`}>view more</Linked>}</span>
            </RecipeFigcaption>
        </RecipeCardFigure>
    );
}
