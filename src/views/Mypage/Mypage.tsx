import styled from 'styled-components';
import Modal from '../../components/Modal/Modal';
import { useModal } from './hooks/useModal';
import { useUpdateForm } from './hooks/updateForm';
import { useGetMyRecipes } from '../../hooks/useGetMyRecipes';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
export default function Mypage(): JSX.Element {
    //스크랩,작성게시물불러오는 hook
    const { myRecipes, scrapedRecipes } = useGetMyRecipes();

    //유저정보 hook
    const { userInfo } = useGetUserInfo();

    const {
        isNickModalVisible,
        setIsNickModalVisible,
        isPwModalVisible,
        setIsPwModalVisible,
        handleNickClose,
        handlePwClose,
        handleNickUpdate,
        handlePasswordUpdate,
        updateNick,
        setUpdateNick,
    } = useModal();

    const { password, setPassword, passwordCheck, setPasswordCheck, errors, touched, handleBlur, clearFieldError } = useUpdateForm();

    return (
        <MyContainer>
            <MyScrap>
                <Subtitle>찜한 레시피</Subtitle>
                {scrapedRecipes.map((scrapedRecipe) => (
                    <MyFigure key={scrapedRecipe.recipeId}>
                        <img src={scrapedRecipe.recipeThumbnail} alt="스크랩 이미지"></img>
                        <MyFigcaption>{scrapedRecipe.recipeName}</MyFigcaption>
                    </MyFigure>
                ))}
            </MyScrap>
            <MyPosting>
                <Subtitle>작성한 레시피</Subtitle>
                {myRecipes.map((myRecipe) => (
                    <MyFigure key={myRecipe.myRecipeId}>
                        <img src={myRecipe.myRecipeThumbnail} alt="작성 레시피 이미지"></img>
                        <MyFigcaption>{myRecipe.myRecipeName}</MyFigcaption>
                    </MyFigure>
                ))}
            </MyPosting>
            <MyInfo>
                <Subtitle>내 정보</Subtitle>
                <MyInfoText>
                    <img src={userInfo.img} alt="user-profile"></img>
                    <span>이메일:{userInfo.email}</span>
                    <span>닉네임:{userInfo.nickname}</span>
                </MyInfoText>

                <ButtonWrapper>
                    <Button onClick={() => setIsNickModalVisible(true)}>닉네임수정</Button>
                    {isNickModalVisible && (
                        <Modal
                            visible={isNickModalVisible}
                            onClose={handleNickClose}
                            buttons={[
                                { label: '확인', onClick: handleNickUpdate },
                                { label: '취소', onClick: handleNickClose },
                            ]}
                        >
                            <h1>닉네임 수정</h1>
                            <p>이메일 : {userInfo.email}</p>
                            <input value={updateNick} placeholder="변경할 닉네임을 입력하세요" onChange={(e) => setUpdateNick(e.target.value)} />
                        </Modal>
                    )}
                    <Button onClick={() => setIsPwModalVisible(true)}>
                        비밀번호 수정
                        {isPwModalVisible && (
                            <Modal
                                visible={isPwModalVisible}
                                onClose={handlePwClose}
                                buttons={[
                                    { label: '확인', onClick: handlePasswordUpdate },
                                    { label: '취소', onClick: handlePwClose },
                                ]}
                            >
                                <h1>비밀번호 수정</h1>
                                <p>이메일 : {userInfo.email}</p>
                                <Input
                                    value={password}
                                    placeholder="기존 비밀번호를 입력하세요"
                                    onChange={(e) => setPassword(e.target.value)}
                                    isError={!!errors.password && touched.password}
                                    onFocus={() => clearFieldError('password')}
                                    onBlur={() => handleBlur('password')}
                                />
                                <ErrorMessage visible={!!errors.password && touched.password}>{errors.password}</ErrorMessage>
                                <Input
                                    value={passwordCheck}
                                    placeholder="변경할 비밀번호를 입력하세요"
                                    onChange={(e) => setPasswordCheck(e.target.value)}
                                    isError={!!errors.password && touched.password}
                                    onFocus={() => clearFieldError('passwordCheck')}
                                    onBlur={() => handleBlur('passwordCheck')}
                                />
                                <ErrorMessage visible={!!errors.passwordCheck && touched.passwordCheck}>{errors.passwordCheck}</ErrorMessage>
                            </Modal>
                        )}
                    </Button>
                </ButtonWrapper>
            </MyInfo>
        </MyContainer>
    );
}

const MyContainer = styled.section`
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

const MyScrap = styled.div``;
const MyPosting = styled.div``;
const Subtitle = styled.h3`
    font-size: 20px;
    font-weight: 500;
`;
const MyFigure = styled.figure`
    img {
    }
`;
const MyFigcaption = styled.figcaption`
    margin-bottom: 16px;
`;

const MyInfo = styled.div``;

const MyInfoText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 150px;
        height: 150px;
        margin-bottom: 50px;
        border-radius: 50%;
    }
`;

const ButtonWrapper = styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: space-around;
`;

const Button = styled.button`
    min-width: 120px;
    padding: 16px;
    background-color: #f59910;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

const Input = styled.input<{ isError: boolean }>`
    width: 400px;
    height: 45px;
    color: gray;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 1rem;
    border: ${(props) => (props.isError ? '2px solid red' : '1px solid #ccc')};
`;

const ErrorMessage = styled.p<{ visible: boolean }>`
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
    margin-right: 260px;
    min-height: 20px;
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
