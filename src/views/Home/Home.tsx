import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import styled from 'styled-components';
import AllRecipesView from '../Recipes/AllRecipes/AllRecipesView';

export default function Home(): JSX.Element {
    const images = [
        {
            download_url: 'https://picsum.photos/200/300',
            content: '자취할때 어떻게 요리를 선택하시나요 ?',
        },
        {
            download_url: 'https://picsum.photos/200/300',
            content: '좋아하는 요리를 선택해 오늘의 요리를 추천받아보세요.',
        },
        {
            download_url: 'https://picsum.photos/200/300',
            content: '나중에 도전하고 싶은 요리는 저장해 놓을 수 있어요',
        },
        {
            download_url: 'https://picsum.photos/200/300',
            content: ' 원하는 요리를 직접 고를수도 있어요',
        },
        {
            download_url: 'https://picsum.photos/200/300',
            content: '마지막페이지',
        },
    ];
    return (
        <HomeContainer>
            <HomeMain>
                <HomeContent>
                    <h2>만개의 레시피 추천</h2>
                    <p>자취생을 위한 레시피를 추천합니다.</p>
                    <StyledLink to="/recipes/recommended">추천 레시피</StyledLink>
                </HomeContent>
                <Carousel images={images} />
            </HomeMain>
            <RecipesList>
                <h3>전체 레시피</h3>
                <AllRecipesView limit={3} />
                <StyledLink to="/recipes/all">view more</StyledLink>
            </RecipesList>
        </HomeContainer>
    );
}

const HomeContainer = styled.section``;
const HomeMain = styled.div`
    display: grid;
    grid-template-columns: 34% 65%;
`;

const HomeContent = styled.div`
    background-color: #d8dced;
    padding: 30px 70px;
    h2 {
        font-size: 40px;
        border-bottom: 3px solid #3f51b515;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }
    p {
        font-size: 20px;
        line-height: 24px;
        font-weight: 500;
        opacity: 0.8;
    }
    a {
        display: inline-block;
        padding: 12px 35px;
        margin-top: 40px;
        background-color: #3f51b5;
        color: #fff;
        border-radius: 50px;
        text-decoration: none;
        font-size: 14px;
        cursor: pointer;
    }
`;

const RecipesList = styled.section`
    margin-top: 60px;
    text-align: center;
    h3 {
        font-size: 40px;
        text-align: center;
    }
`;

const StyledLink = styled(Link)`
    display: inline-block;
    padding: 12px 35px;
    margin: 40px 0;
    background-color: #3f51b5;
    color: #fff;
    border-radius: 50px;
    text-decoration: none;
    font-size: 14px;
    cursor: pointer;
`;
