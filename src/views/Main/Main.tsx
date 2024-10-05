import { ChangeEvent, useState } from 'react';
import Latest from '../Recipes/Latest/Latest';
import Popular from '../Recipes/Popular/Popular';
import Recommend from '../Recipes/Recommend/Recommend';
import styled from 'styled-components';
// import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
// import { useLocation } from 'react-router-dom';
import mainImage from '../../assets/img/spoon.jpg';
import Visited from '../Visited/Visited';

const MainContainer = styled.section`
    background-color: #f5f4f3;
    min-height: 100vh;
`;
const MainImage = styled.img`
    display: block;
    width: 100%;
    height: 250px;
    object-fit: cover;
`;
const SearchWrapper = styled.div`
    width: 50%;
    margin: 16px auto;
    position: relative;
`;
const SearchBox = styled.input`
    display: block;
    width: 90%;
    height: 40px;
    padding-left: 16px;
    border: transparent;
    border-radius: 16px;
    color: black;
    background-color: rgba(239, 182, 63, 0.2);
`;
const SearchIcon = styled(CiSearch)`
    position: absolute;
    right: 15%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    cursor: pointer;
`;
const RecipeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;
const VisitedPopularWrapper = styled.div`
    display: flex;
    height: auto;
`;

export default function Main() {
    const [searched, setSearched] = useState<string>('');
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    // const [message, setMessage] = useState<string>('');

    // const { pathname } = useLocation();
    // const isMain = pathname == '/main';

    const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        setSelectedIngredients(search.split(' '));
        setSearched(search);
    };

    const handleSubmit = async () => {
        if (searched === '') {
            alert('검색어를 입력해주세요');
        } else {
            alert(selectedIngredients);
        }
        // const response = await axios.get(`${process.env.REACT_APP_API_URL}/recipes/search`);
        // ! 데이터 들어오는 구조 확인 - 데이터 받아오면 setSelectedIngredients 데이터 가공해서 화면 렌더링 처리
        try {
        } catch (err: any) {
            console.log(err);
            // setMessage(err);
        }
    };

    const handleActiveEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };
    return (
        <MainContainer>
            <MainImage src={mainImage} alt="메인페이지 이미지" />
            <SearchWrapper>
                <SearchBox
                    type="text"
                    value={searched}
                    onChange={(e) => changeInputHandler(e)}
                    onKeyDown={(e) => handleActiveEnter(e)}
                    placeholder="재료를 입력해주세요."
                />
                <SearchIcon onClick={handleSubmit} />
            </SearchWrapper>
            {/* 리덕스 툴킷 도입 : 레시피페이지 전역상태관리 - RecipePageHeader + RecipeList 호출가능?  */}
            <RecipeWrapper>
                <Recommend limit={4} page="recommended" />
                <Latest limit={1} page="latest" />
                {/* Popular, Visited 분리 작업 후 VisitedWrapper는 float/position으로 css 변경처리 */}
                <VisitedPopularWrapper>
                    <Popular limit={2} page="popular" />
                    <Visited />
                </VisitedPopularWrapper>
            </RecipeWrapper>
        </MainContainer>
    );
}
