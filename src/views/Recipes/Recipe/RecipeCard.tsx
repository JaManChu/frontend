import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStairs, FaRegClock, FaRegStar, FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import styled from 'styled-components';

// main 페이지가 아닌 Latest에서 isMain을 콘솔에 찍으면 false값이 찍힘 -> 최적화 방안 생각(RecipeCard에서는 4번 : main, latest, recipeList, recipeCard인듯

const RecipeCardFigure = styled.figure<{ page: string }>`
    margin: 8px;
    height: ${({ page }) => (page ? '300px' : '200px')};
    border: 1px solid lightgrey;
    border-radius: ${(props) => (props.page == 'latest' ? '0' : '8px')};
    display: flex;
    flex-direction: ${(props) => (props.page == 'popular' || props.page == 'recommended' ? 'column' : 'row')};
    position: relative;

    img {
        min-width: 200px;
        width: ${(props) => (props.page == 'latest' ? '50%' : props.page == 'recommended' || props.page == 'popular' ? '100%' : '30%')};
        height: ${(props) => (props.page == 'recommended' ? '60%' : '100%')};
        border-right: ${(props) => (props.page == 'popular' || props.page == 'recommended' ? 'none' : '1px solid lightgrey')};
        border-bottom: ${(props) => (props.page == 'popular' || props.page == 'recommended' ? '1px solid lightgrey' : 'none')};
        flex-shrink: 0;
    }
`;
const RecipeFigcaption = styled.figcaption<{ page: string }>`
    padding: 16px;
    text-align: center;
    background-color: ${(props) => (props.page === 'latest' ? '#D9D9D9' : ' transparent')};
`;
const RecipePageTitle = styled.h2`
    margin: 16px;
    color: #622b18;
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
    page?: string;
    id: string;
    title: string;
    image: string;
    time: string;
    level: string;
    rate: string;
    desc: string;
}

export default function RecipeCard({ page = '', id, title, image, time, level, rate, desc }: CardProps) {
    const [marked, setMarked] = useState<boolean>(false);

    return (
        <RecipeCardFigure page={page}>
            <img src={image} alt="레시피이미지" />
            <RecipeFigcaption page={page}>
                {page == 'latest' ? <RecipePageTitle>{page.replace(/\b[a-z]/, (letter) => letter.toUpperCase())} Rcipes</RecipePageTitle> : null}
                <h4>
                    <Linked to={`/recipes/${id}`}>{title}</Linked>
                </h4>
                <BookmarkIcons mark={marked} onClick={() => setMarked(!marked)}>
                    {marked ? <FaBookmark /> : <FaRegBookmark />}
                </BookmarkIcons>
                {page != 'popular' ? (
                    <RecipeInfo>
                        <FaRegClock />
                        <RecipeInfoItem>{time}</RecipeInfoItem>
                        <FaStairs />
                        <RecipeInfoItem>{level}</RecipeInfoItem>
                        <FaRegStar />
                        <RecipeInfoItem>{rate}</RecipeInfoItem>
                    </RecipeInfo>
                ) : null}
                {page == 'popular' || page == 'recommended' ? null : <RecipeDescription>{desc}</RecipeDescription>}
                <span>
                    <Linked to={`/recipes/${id}`}>view more</Linked>
                </span>
            </RecipeFigcaption>
        </RecipeCardFigure>
    );
}
