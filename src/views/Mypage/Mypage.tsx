import styled from 'styled-components';
import Modal from '../../components/Modal/Modal';
import { useModal } from './hooks/useModal';
import { useUpdateForm } from './hooks/updateForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const favorites_recipe = [
    { name: '김치볶음밥', img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg' },
    { name: '계란말이', img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg' },
    { name: '만두', img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg' },
    { name: '짜장면', img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg' },
];

const post_list = [
    { name: '게시글1', img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg' },
    { name: '게시글2', img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg' },
    { name: '게시글3', img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg' },
    { name: '게시글4', img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg' },
];

export default function Mypage(): JSX.Element {
    const [userInfo, setUserInfo] = useState({ email: '', nickname: '', img: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate('');
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
            navigate('/login');
        } else {
            setIsLoggedIn(true);
            const fetchUserInfo = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`, {
                        headers: {
                            'Access-Token': `Bearer ${sessionStorage.getItem('token')}`,
                        },
                    });
                    const { email, nickname } = response.data.data;
                    setUserInfo({
                        email: email,
                        nickname: nickname,
                        img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg',
                    });
                } catch (error) {
                    console.error('유저정보를 불러오는 데 실패했습니다', error);
                }
            };
            fetchUserInfo();
        }
    }, []);
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
                {favorites_recipe.map((scrap) => (
                    <MyFigure>
                        <img src={scrap.img} alt="스크랩 이미지"></img>
                        <MyFigcaption>{scrap.name}</MyFigcaption>
                    </MyFigure>
                ))}
            </MyScrap>
            <MyPosting>
                <Subtitle>작성한 레시피</Subtitle>
                {post_list.map((post) => (
                    <MyFigure>
                        <img src={post.img} alt="작성 레시피 이미지"></img>
                        <MyFigcaption>{post.name}</MyFigcaption>
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
