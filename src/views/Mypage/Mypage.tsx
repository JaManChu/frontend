import React from 'react';
import styled from 'styled-components';
import Modal from '../../components/Modal/Modal';
import { useModal } from './hooks/useModal';
import { useUpdateForm } from './hooks/updateForm';
const Row_layout = styled.div`
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: black;
`;

const Favorites_wrapper = styled.div`
    width: 35%;
`;

const Post_wrapper = styled.div`
    width: 35%;
`;

const Card_List = styled.div`
    width: 35%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 10px;
    margin-top: 50px;
    margin-left: 50px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 300px;
    text-align: center;
    font-size: 1.5rem;
    background-color: #ccc;
    p {
        margin-top: 10px;
    }
`;

const User_info_Wrapper = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Info_wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        margin-bottom: 50px;
        width: 150px;
        height: 150px;
    }
    p {
        margin-top: 10px;
        font-size: 1.5rem;
    }
`;

const Update_button_wrapper = styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    width: 60%;
`;

const Update_button = styled.button`
    width: 150px;
    height: 50px;
    background-color: #f59910;
    border: none;
    border-radius: 10px;
    cursor: pointer;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-left: 70px;
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

const user_info = {
    email: 'abc@naver.com',
    nickName: '제로베이스',
    img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg',
};

const Mypage: React.FC = () => {
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
        <Row_layout>
            <Favorites_wrapper>
                <Title>찜한 레시피</Title>
                <Card_List>
                    {favorites_recipe.map((recipe) => (
                        <Card>
                            <img src={recipe.img}></img>
                            <p>{recipe.name}</p>
                        </Card>
                    ))}
                </Card_List>
            </Favorites_wrapper>
            <Post_wrapper>
                <Title>작성한 게시글 목록</Title>
                <Card_List>
                    {post_list.map((post) => (
                        <Card>
                            <img src={post.img}></img>
                            <p>{post.name}</p>
                        </Card>
                    ))}
                </Card_List>
            </Post_wrapper>
            <User_info_Wrapper>
                <Info_wrapper>
                    <img src={user_info.img} alt="user-profile"></img>
                    <p>이메일:{user_info.email}</p>
                    <p>닉네임:{user_info.nickName}</p>
                </Info_wrapper>
                <Update_button_wrapper>
                    <Update_button onClick={() => setIsNickModalVisible(true)}>닉네임수정</Update_button>
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
                            <p>이메일 : {user_info.email}</p>
                            <input value={updateNick} placeholder="변경할 닉네임을 입력하세요" onChange={(e) => setUpdateNick(e.target.value)} />
                        </Modal>
                    )}
                    <Update_button onClick={() => setIsPwModalVisible(true)}>
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
                                <p>이메일 : {user_info.email}</p>
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
                    </Update_button>
                </Update_button_wrapper>
            </User_info_Wrapper>
        </Row_layout>
    );
};

export default Mypage;
