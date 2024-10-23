import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import { useModal } from './hooks/useModal';
import { useUpdateForm } from './hooks/updateForm';
import { useGetMyRecipes } from '../../hooks/useGetMyRecipes';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { Button, Typography, Avatar, Grid, Pagination, Box } from '@mui/material';

import { useUserUpdate } from './hooks/useUserUpdate';
import { useRecipeDelete } from '../../hooks/useRecipeDelete';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6';
import colors from '../../styles/colors';
import { useBookmark } from './hooks/useBookmark';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { userFormHandler } from '../../handler/userFormHandler';
import useAuthToken from '../../hooks/useAuthToken';
import { useNavigate } from 'react-router-dom';

export default function Mypage(): JSX.Element {
    //provider에서 kakao or 일반유저 확인하기위해 사용.
    const parsedData = JSON.parse(sessionStorage.getItem('persist:root')!);
    const userData = JSON.parse(parsedData.user);
    const parsedProvider = userData.value.provider;
    console.log(parsedProvider);

    const navigate = useNavigate();
    const token = useAuthToken();
    // 페이지 번호 상태
    const [myRecipesPage, setMyRecipesPage] = useState(1);
    const [scrapedRecipesPage, setScrapedRecipesPage] = useState(1);

    //유저 정보 hook
    const { userInfo, refetchUserInfo: refetchUserInfo } = useGetUserInfo();

    // 스크랩, 작성 게시물 불러오는 hook
    const { myRecipes, setMyRecipes, scrapedRecipes, totalMyRecipesPages, totalScrapedRecipesPages } = useGetMyRecipes(
        myRecipesPage,
        scrapedRecipesPage,
    );

    //게시물 삭제 hook
    const { handleMyRecipeDelete } = useRecipeDelete(setMyRecipes);

    //북마크 hook
    const { bookmarkRecipes, handleClickBookmark } = useBookmark();

    //유효성 검사를 위한 hook
    const {
        password,
        setPassword,
        newPassword,
        setNewPassword,
        passwordCheck,
        setPasswordCheck,
        nickname,
        setNickname,
        errors,
        touched,
        handleBlur,
        clearFieldError,
    } = useUpdateForm();

    //모달 상태관리 hook
    const {
        isModalVisible,
        setIsModalVisible,
        handleModalClose,
        handleCheckModalOpen,
        handleCheckModalClose,
        isCheckModal,
        handlePasswordModalOpen,
        handlePasswordModalClose,
        isPasswordModal,
    } = useModal();

    //회원정보수정 hook
    const { handleUpdate } = useUserUpdate(password, newPassword, passwordCheck, nickname, handleModalClose, refetchUserInfo);

    //닉네임중복확인
    const { inputMessage, clickedButEmpty } = userFormHandler();
    const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);
    const [checkFailMessage, setCheckFailMessage] = useState<string>('');

    const handleCheckNickname = async () => {
        try {
            const response: any = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/nickname-check?nickname=${nickname}`);
            console.log('mypage nickanme check, response( 204 ok 전): ', response);
            if (response.data.data === true) {
                console.log(response);
                setNicknameCheck(true);
                setCheckFailMessage(response.data.message);
            } else if (response.data.data === false) {
                setNicknameCheck(false);
                setCheckFailMessage(response.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //비밀번호확인
    const [passowordInfoCheck, setPasswordInfoCheck] = useState<boolean>(false);
    const [checkFailMsg, setCheckFailMsg] = useState<string>('');
    const handlePasswordCheck = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/auth/password-check`,
                {
                    password: password,
                },
                {
                    headers: {
                        'access-token': `Bearer ${token}`,
                    },
                    withCredentials: true,
                },
            );
            console.log('비밀번호 확인 response:', response.data);
            console.log('비밀번호 확인 response.data.data:', response.data.data);
            console.log('비밀번호 확인 response.data.message:', response.data.message);
            if (response.data.data === true) {
                console.log(response);
                setPasswordInfoCheck(true);
                setCheckFailMsg(response.data.message);
            } else if (response.data.data === false) {
                setCheckFailMsg(response.data.message);
            }
            console.log('passwordcheckmessage : ', response.data.message);
        } catch (error) {
            console.error('비밀번호 확인 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

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
                                    <M_Linked to={`/recipes/${scrapedRecipe.recipeId}`}>
                                        <S_MyFigcaption>{scrapedRecipe.recipeName}</S_MyFigcaption>
                                    </M_Linked>
                                    <M_BookmarkIcons
                                        onClick={() => handleClickBookmark(scrapedRecipe.recipeId)}
                                        mark={bookmarkRecipes[scrapedRecipe.recipeId] ?? true}
                                    >
                                        {bookmarkRecipes[scrapedRecipe.recipeId] ? <FaBookmark /> : <FaRegBookmark />}
                                    </M_BookmarkIcons>
                                </S_MyFigure>
                            </Grid>
                        ))}
                    </Grid>
                    <S_PaginationContainer>
                        <Pagination
                            count={totalScrapedRecipesPages} // 스크랩 레시피 총 페이지 수
                            page={scrapedRecipesPage}
                            onChange={(_, page) => setScrapedRecipesPage(page)} // 페이지 변경
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
                                    <Button onClick={() => handleMyRecipeDelete(myRecipe.myRecipeId)}>삭제</Button>
                                    <img src={myRecipe.myRecipeThumbnail} alt="작성 레시피 이미지" style={{ width: '100%', borderRadius: '8px' }} />
                                    <M_Linked to={`/recipes/${myRecipe.myRecipeId}`}>
                                        <S_MyFigcaption>{myRecipe.myRecipeName}</S_MyFigcaption>
                                    </M_Linked>
                                </S_MyFigure>
                            </Grid>
                        ))}
                    </Grid>
                    <S_PaginationContainer>
                        <Pagination
                            count={totalMyRecipesPages} // 작성한 레시피 총 페이지 수
                            page={myRecipesPage}
                            onChange={(_, page) => setMyRecipesPage(page)} // 페이지 변경
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
                    {parsedProvider === 'kakao' ? (
                        <Button
                            variant="contained"
                            color="error"
                            sx={{
                                width: '100%',
                                mb: 2,
                                boxShadow: 3,
                            }}
                        >
                            회원탈퇴
                        </Button>
                    ) : (
                        <>
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
                            <Button
                                variant="contained"
                                color="error"
                                sx={{
                                    width: '100%',
                                    mb: 2,
                                    boxShadow: 3,
                                }}
                            >
                                회원탈퇴
                            </Button>
                            {isModalVisible && (
                                <Modal
                                    visible={isModalVisible}
                                    onClose={handleModalClose}
                                    buttons={[
                                        { label: '수정', onClick: handleUpdate, disabled: !(nicknameCheck && passowordInfoCheck) },
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
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            handleCheckModalOpen();
                                            handleCheckNickname();
                                        }}
                                    >
                                        중복확인
                                    </Button>
                                    {isCheckModal && (
                                        <Modal
                                            visible={isCheckModal}
                                            onClose={handleCheckModalClose}
                                            buttons={[{ label: '확인', onClick: handleCheckModalClose }]}
                                        >
                                            <h2>중복 확인</h2>
                                            <p> {checkFailMessage} </p>
                                        </Modal>
                                    )}
                                    {nicknameCheck ? (
                                        <ErrorMessage visible={!!inputMessage.nickname && clickedButEmpty.nickname}>
                                            {inputMessage.nickname}
                                        </ErrorMessage>
                                    ) : (
                                        <ErrorMessage visible={true}>{checkFailMessage}</ErrorMessage>
                                    )}
                                    <S_ErrorMessage visible={!!errors.nickname && touched.nickname}>{errors.nickname}</S_ErrorMessage>
                                    <S_Input
                                        value={password}
                                        placeholder="기존 비밀번호를 입력하세요"
                                        onChange={(e) => setPassword(e.target.value)}
                                        isError={!!errors.password && touched.password}
                                        onFocus={() => clearFieldError('password')}
                                        onBlur={() => handleBlur('password')}
                                        type="password"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            handlePasswordModalOpen();
                                            handlePasswordCheck();
                                        }}
                                    >
                                        비밀번호 확인
                                    </Button>
                                    {isPasswordModal && (
                                        <Modal
                                            visible={isPasswordModal}
                                            onClose={handlePasswordModalClose}
                                            buttons={[{ label: '확인', onClick: handlePasswordModalClose }]}
                                        >
                                            <h2>비밀번호 확인</h2>
                                            <p> {checkFailMsg} </p>
                                        </Modal>
                                    )}
                                    {passowordInfoCheck ? (
                                        <ErrorMessage visible={!!inputMessage.password && clickedButEmpty.password}>
                                            {inputMessage.password}
                                        </ErrorMessage>
                                    ) : (
                                        <ErrorMessage visible={true}>{checkFailMsg}</ErrorMessage>
                                    )}
                                    <S_ErrorMessage visible={!!errors.password && touched.password}>{errors.password}</S_ErrorMessage>
                                    <S_Input
                                        value={newPassword}
                                        placeholder="변경할 비밀번호를 입력하세요"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        isError={!!errors.newPassword && touched.newPassword}
                                        onFocus={() => clearFieldError('newpassword')}
                                        onBlur={() => handleBlur('newpassword')}
                                        type="password"
                                    />
                                    <S_ErrorMessage visible={!!errors.newpassword && touched.newpassword}>{errors.newpassword}</S_ErrorMessage>
                                    <S_Input
                                        value={passwordCheck}
                                        placeholder="변경할 비밀번호를 한번 더 입력하세요"
                                        onChange={(e) => setPasswordCheck(e.target.value)}
                                        isError={!!errors.passwordCheck && touched.passwordCheck}
                                        onFocus={() => clearFieldError('passwordCheck')}
                                        onBlur={() => handleBlur('passwordCheck')}
                                        type="password"
                                    />
                                    <S_ErrorMessage visible={!!errors.passwordCheck && touched.passwordCheck}>{errors.passwordCheck}</S_ErrorMessage>
                                </Modal>
                            )}
                        </>
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

const M_BookmarkIcons = styled(Box)<{ mark: boolean }>(({ mark }) => ({
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: mark ? colors[400] : 'inherit',
    cursor: 'pointer',
}));

const ErrorMessage = styled.p<{ visible: boolean }>`
    min-height: 20px;
    margin-top: 5px;
    color: red;
    font-size: 0.8rem;
    text-align: start;
    visibility: ${(props) => (props.visible ? 'visible' : 'none')}; /* 에러가 없을 때는 숨김 */
`;

const M_Linked = styled(Link)({
    display: 'block',
    textDecorationLine: 'none',
    color: '#000',

    '&:hover': {
        color: colors[400],
        cursor: 'pointer',
    },
});
