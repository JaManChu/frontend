import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import RecipeMetaData from './RecipeMetaData';
import styled from 'styled-components';
import axios from 'axios';

// ! main 페이지가 아닌 Latest에서 isMain을 콘솔에 찍으면 false값이 찍힘 -> 최적화 방안 생각(RecipeCard에서는 4번 : main, latest, recipeList, recipeCard인듯

interface CardProps {
    page?: string;
    recipeId: number;
    recipeName: string;
    recipeAuthor: string;
    recipeLevel: string;
    recipeCookingTime: string;
    recipeThumbnail: string;
    // rate: string;
    // desc: string;
}

export default function RecipeCard({ page = '', recipeId, recipeName, recipeThumbnail, recipeCookingTime, recipeLevel }: CardProps): JSX.Element {
    const [marked, setMarked] = useState<boolean>(false);
    console.log('bookmark card - recipeId ? : ', recipeId);
    const token = sessionStorage.getItem('token');

    const handleClickBookmark = async () => {
        try {
            if (marked) {
                setMarked(false);
            } else {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/recipes/${recipeId}/scrap`,
                    {},
                    {
                        headers: {
                            'Access-Token': `Bearer ${token}`,
                        },
                    },
                );
                if (response.status == 200) {
                    console.log('post scrap response: ', response);
                    console.log(response.data);
                    setMarked(true);
                    alert(response.data.message);
                }
            }
        } catch (err: any) {
            console.log(err);
            console.log('err.response: ', err.response);
            alert(marked ? '찜한 레시피에서 삭제하였습니다.' : '레시피를 찜하지 못했습니다.');
        }
    };

    return (
        <RecipeCardFigure page={page}>
            <img src={recipeThumbnail} alt="레시피이미지" />
            <RecipeFigcaption page={page}>
                {page == 'latest' ? <RecipePageTitle>{page.replace(/\b[a-z]/, (letter) => letter.toUpperCase())} Rcipes</RecipePageTitle> : null}
                <h4>
                    <Linked to={`/recipes/${recipeId}`}>{recipeName}</Linked>
                </h4>
                <BookmarkIcons mark={marked} onClick={handleClickBookmark}>
                    {marked ? <FaBookmark /> : <FaRegBookmark />}
                </BookmarkIcons>
                <RecipeMetaData page={page} time={recipeCookingTime} level={recipeLevel} rate="평점" />
                {page == 'popular' || page == 'recommended' ? null : <RecipeDescription>간단한 설명이 필요...?</RecipeDescription>}
                <span>
                    <Linked to={`/recipes/${recipeId}`}>view more</Linked>
                </span>
            </RecipeFigcaption>
        </RecipeCardFigure>
    );
}

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
