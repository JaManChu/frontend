import styled from 'styled-components';
import Modal from '../../components/Modal/Modal';
import { useModal } from './hooks/useModal';
import { useUpdateForm } from './hooks/updateForm';
import { useGetMyRecipes } from '../../hooks/useGetMyRecipes';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { Button, Typography, Avatar, Grid, Pagination } from '@mui/material';
import { useRecipesPagination } from './hooks/\busePagination';
import { useUserUpdate } from './hooks/useUserUpdate';

const ITEMS_PER_PAGE = 4; // 페이지당 보여줄 아이템 수

export default function Mypage(): JSX.Element {
    //스크랩, 작성 게시물 불러오는 hook
    const { myRecipes, scrapedRecipes } = useGetMyRecipes();

    //유효성 검사를 위한 hook
    const { password, setPassword, passwordCheck, setPasswordCheck, nickname, setNickname, errors, touched, handleBlur, clearFieldError } =
        useUpdateForm();

    //유저 정보 hook
    const { userInfo } = useGetUserInfo();

    //모달 상태관리 hook
    const { isModalVisible, setIsModalVisible, handleModalClose } = useModal();

    //게시물 수에 따른 페이지 hook
    const {
        myRecipesArr,
        scrapedRecipesArr,
        myRecipesPage,
        scrapedRecipesPage,
        totalMyRecipesPages,
        totalScrapedRecipesPages,
        setMyRecipesPage,
        setScrapedRecipesPage,
    } = useRecipesPagination(myRecipes, scrapedRecipes, ITEMS_PER_PAGE);

    //회원정보수정 hook
    const { handleUpdate } = useUserUpdate(password, passwordCheck, nickname, handleModalClose);

    return (
        <S_MyContainer>
            <S_Content>
                <S_MyScrap>
                    <S_Subtitle variant="h5">찜한 레시피</S_Subtitle>
                    <Grid container spacing={2}>
                        {scrapedRecipesArr.map((scrapedRecipe) => (
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
                            onChange={(_, page) => setScrapedRecipesPage(page)}
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
                        {myRecipesArr.map((myRecipe) => (
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
                            onChange={(_, page) => setMyRecipesPage(page)}
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
                        color="secondary"
                        onClick={() => setIsModalVisible(true)}
                        sx={{
                            width: '100%',
                            mb: 2,
                            boxShadow: 3,
                        }}
                    >
                        회원정보 수정
                    </Button>
                    {isModalVisible && (
                        <Modal
                            visible={isModalVisible}
                            onClose={handleModalClose}
                            buttons={[
                                { label: '수정', onClick: handleUpdate },
                                { label: '취소', onClick: handleModalClose },
                            ]}
                        >
                            <h1>회원정보 수정</h1>
                            <S_Input
                                value={nickname}
                                placeholder="변경할 닉네임을 입력하세요"
                                onChange={(e) => setNickname(e.target.value)}
                                isError={!!errors.nickname && touched.nickname}
                                onFocus={() => clearFieldError('nickname')}
                                onBlur={() => handleBlur('nickname')}
                            />
                            <S_ErrorMessage visible={!!errors.nickname && touched.nickname}>{errors.nickname}</S_ErrorMessage>
                            <S_Input
                                value={password}
                                placeholder="기존 비밀번호를 입력하세요"
                                onChange={(e) => setPassword(e.target.value)}
                                isError={!!errors.password && touched.password}
                                onFocus={() => clearFieldError('password')}
                                onBlur={() => handleBlur('password')}
                            />
                            <S_ErrorMessage visible={!!errors.password && touched.password}>{errors.password}</S_ErrorMessage>
                            <S_Input
                                value={passwordCheck}
                                placeholder="변경할 비밀번호를 입력하세요"
                                onChange={(e) => setPasswordCheck(e.target.value)}
                                isError={!!errors.passwordCheck && touched.passwordCheck}
                                onFocus={() => clearFieldError('passwordCheck')}
                                onBlur={() => handleBlur('passwordCheck')}
                            />
                            <S_ErrorMessage visible={!!errors.passwordCheck && touched.passwordCheck}>{errors.passwordCheck}</S_ErrorMessage>
                        </Modal>
                    )}
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

const S_ErrorMessage = styled.p<{ visible: boolean }>`
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
    margin-right: 260px;
    min-height: 20px;
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

const S_Input = styled.input<{ isError: boolean }>`
    width: 400px;
    height: 45px;
    color: gray;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 1rem;
    border: ${(props) => (props.isError ? '2px solid red' : '1px solid #ccc')};
`;
