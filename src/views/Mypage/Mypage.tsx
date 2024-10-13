import styled from 'styled-components';
import { useState } from 'react';
// import Modal from '../../components/Modal/Modal';
import { useModal } from './hooks/useModal';
// import { useUpdateForm } from './hooks/updateForm';
// import { useGetMyRecipes } from '../../hooks/useGetMyRecipes';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { Button, Typography, Avatar, Grid, Pagination } from '@mui/material';
// ! 더미데이터 추후 삭제
const dummyScrapedRecipes = [
    {
        recipeId: 1,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 1',
    },
    {
        recipeId: 2,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 2',
    },
    {
        recipeId: 3,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 3',
    },
    {
        recipeId: 4,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 4',
    },
    {
        recipeId: 5,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 5',
    },
    {
        recipeId: 6,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 6',
    },
    {
        recipeId: 7,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 7',
    },
    {
        recipeId: 8,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 8',
    },
    {
        recipeId: 9,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 9',
    },
    {
        recipeId: 10,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 10',
    },
    {
        recipeId: 11,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 11',
    },
    {
        recipeId: 12,
        recipeThumbnail: 'https://via.placeholder.com/150',
        recipeName: '스크랩 레시피 12',
    },
];

const dummyMyRecipes = [
    {
        myRecipeId: 1,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 1',
    },
    {
        myRecipeId: 2,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 2',
    },
    {
        myRecipeId: 3,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 3',
    },
    {
        myRecipeId: 4,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 4',
    },
    {
        myRecipeId: 5,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 5',
    },
    {
        myRecipeId: 6,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 6',
    },
    {
        myRecipeId: 7,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 7',
    },
    {
        myRecipeId: 8,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 8',
    },
    {
        myRecipeId: 9,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 9',
    },
    {
        myRecipeId: 10,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 10',
    },
    {
        myRecipeId: 11,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 11',
    },
    {
        myRecipeId: 12,
        myRecipeThumbnail: 'https://via.placeholder.com/150',
        myRecipeName: '내 레시피 12',
    },
];

const ITEMS_PER_PAGE = 4; // 페이지당 보여줄 아이템 수

export default function Mypage(): JSX.Element {
    //스크랩, 작성 게시물 불러오는 hook
    // const { myRecipes, scrapedRecipes } = useGetMyRecipes();
    //유저 정보 hook
    const { userInfo } = useGetUserInfo();

    const {
        // isNickModalVisible,
        setIsNickModalVisible,
        // isPwModalVisible,
        setIsPwModalVisible,
        // handleNickClose,
        // handlePwClose,
        // handleNickUpdate,
        // handlePasswordUpdate,
        // updateNick,
        // setUpdateNick,
    } = useModal();

    const [myRecipesPage, setMyRecipesPage] = useState(1); // 작성한 레시피의 현재 페이지
    const [scrapedRecipesPage, setScrapedRecipesPage] = useState(1); // 스크랩된 레시피의 현재 페이지

    const totalMyRecipesPages = Math.ceil(dummyMyRecipes.length / ITEMS_PER_PAGE);
    const totalScrapedRecipesPages = Math.ceil(dummyScrapedRecipes.length / ITEMS_PER_PAGE);

    // 현재 페이지에 해당하는 아이템만 보여주도록 슬라이싱
    // myRecipesPage : 현재페이지 ITEMS_PER_PAGE : 현재페이지당 보여질 게시물 수
    // myRecipes = dummyMyRecipes.slice(0,4) => dummyMyRecipes[0]~dummyMyRecipes[3] 값 저장 .
    // 즉 현재페이지에 해당하는 게시물4개
    const myRecipes = dummyMyRecipes.slice((myRecipesPage - 1) * ITEMS_PER_PAGE, myRecipesPage * ITEMS_PER_PAGE);
    const scrapedRecipes = dummyScrapedRecipes.slice((scrapedRecipesPage - 1) * ITEMS_PER_PAGE, scrapedRecipesPage * ITEMS_PER_PAGE);

    return (
        <S_MyContainer>
            <S_Content>
                <S_MyScrap>
                    <S_Subtitle variant="h5">찜한 레시피</S_Subtitle>
                    <Grid container spacing={2}>
                        {scrapedRecipes.map((scrapedRecipe) => (
                            <Grid item xs={12} sm={6} md={6} key={scrapedRecipe.recipeId}>
                                <S_MyFigure>
                                    <img src={scrapedRecipe.recipeThumbnail} alt="스크랩 이미지" style={{ width: '100%', borderRadius: '8px' }} />
                                    <S_MyFigcaption>{scrapedRecipe.recipeName}</S_MyFigcaption>
                                </S_MyFigure>
                            </Grid>
                        ))}
                    </Grid>
                    <S_PaginationContainer>
                        <Pagination
                            count={totalScrapedRecipesPages}
                            page={scrapedRecipesPage}
                            onChange={(e, page) => setScrapedRecipesPage(page)}
                            variant="outlined"
                            color="primary"
                            shape="rounded"
                            size="large"
                            sx={{ mt: 2 }}
                        />
                    </S_PaginationContainer>
                </S_MyScrap>

                <S_MyPosting>
                    <S_Subtitle variant="h5">작성한 레시피</S_Subtitle>
                    <Grid container spacing={2}>
                        {myRecipes.map((myRecipe) => (
                            <Grid item xs={12} sm={6} md={6} key={myRecipe.myRecipeId}>
                                <S_MyFigure>
                                    <img src={myRecipe.myRecipeThumbnail} alt="작성 레시피 이미지" style={{ width: '100%', borderRadius: '8px' }} />
                                    <S_MyFigcaption>{myRecipe.myRecipeName}</S_MyFigcaption>
                                </S_MyFigure>
                            </Grid>
                        ))}
                    </Grid>
                    <S_PaginationContainer>
                        <Pagination
                            count={totalMyRecipesPages}
                            page={myRecipesPage}
                            onChange={(e, page) => setMyRecipesPage(page)}
                            variant="outlined"
                            color="primary"
                            shape="rounded"
                            size="large"
                            sx={{ mt: 2 }}
                        />
                    </S_PaginationContainer>
                </S_MyPosting>
            </S_Content>

            <S_MyInfo>
                <S_Subtitle variant="h5">내 정보</S_Subtitle>
                <S_MyInfoText>
                    <Avatar
                        alt="user-profile"
                        src={userInfo.img}
                        sx={{ width: 150, height: 150, mb: 4, boxShadow: 3, border: '3px solid #3f51b5' }}
                    />
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 1 }}>
                        이메일: {userInfo.email}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                        닉네임: {userInfo.nickname}
                    </Typography>
                </S_MyInfoText>
                <S_ButtonWrapper>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsNickModalVisible(true)}
                        sx={{
                            width: '100%',
                            mb: 2,
                            boxShadow: 3,
                        }}
                    >
                        닉네임 수정
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setIsPwModalVisible(true)}
                        sx={{
                            width: '100%',
                            mb: 2,
                            boxShadow: 3,
                        }}
                    >
                        비밀번호 수정
                    </Button>
                </S_ButtonWrapper>
            </S_MyInfo>
        </S_MyContainer>
    );
}

const S_MyContainer = styled.section`
    padding: 40px;
    display: grid;
    grid-template-columns: 7fr 3fr;
    gap: 40px;
`;

const S_Content = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
`;

const S_MyScrap = styled.div``;
const S_MyPosting = styled.div``;

const S_Subtitle = styled(Typography)`
    font-size: 20px;
    font-weight: 500;
`;

const S_MyFigure = styled.figure`
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-5px);
    }
`;

const S_MyFigcaption = styled.figcaption`
    margin-bottom: 16px;
    text-align: center;
`;

const S_MyInfo = styled.div`
    position: sticky;
    top: 50px;
    align-self: start;
`;

const S_MyInfoText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const S_ButtonWrapper = styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: space-around;
`;

const S_PaginationContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
`;
