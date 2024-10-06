import { Layout } from '../../styles/layout';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { useUserForm } from '../../hooks/useUserForm';
import Modal from '../../components/Modal/Modal';
import SocialKakao from './SocialKakao';
import styled from 'styled-components';
// import KakaoLoginButton from '../../components/KaKaoButton/KaKaoLoginButton';
// import axios from 'axios';

export default function Login(): JSX.Element {
    const navigate = useNavigate();
    const {
        email,
        setEmail,
        password,
        setPassword,
        nickname,
        setNickname,
        clickedButEmpty,
        handleEmptyInput,
        clearInputMessage,
        inputMessage,
        handleLogin,
    } = useUserForm();
    const { openModal, closeModal, handleConfirm, isModalVisible } = useModal();

    // const handleCheckPassword = async() => {}

    return (
        <Layout>
            <LoginContainer>
                <LoginHeader>로그인</LoginHeader>
                <form method="POST" onSubmit={handleLogin}>
                    <LoginFieldset>
                        <legend>Welcome back! Please login to your account.</legend>
                        <Input
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => handleEmptyInput('email')}
                            onFocus={() => clearInputMessage('email')}
                            showErrorMessage={!!inputMessage.email && clickedButEmpty.email}
                            placeholder="이메일을 입력해주세요."
                        />
                        <ErrorMessage visible={!!inputMessage.email && clickedButEmpty.email}>{inputMessage.email}</ErrorMessage>
                        <Input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => handleEmptyInput('password')}
                            onFocus={() => clearInputMessage('password')}
                            showErrorMessage={!!inputMessage.password && clickedButEmpty.password}
                            placeholder="비밀번호를 입력해주세요."
                        />
                        <ErrorMessage visible={!!inputMessage.password && clickedButEmpty.password}>{inputMessage.password}</ErrorMessage>
                    </LoginFieldset>
                    <LoginButton type="submit">로그인</LoginButton>
                </form>
                <PwSearch
                    onClick={() => {
                        openModal();
                    }}
                >
                    비밀번호 찾기
                </PwSearch>
                {isModalVisible && (
                    <Modal
                        visible={isModalVisible}
                        onClose={closeModal}
                        buttons={[
                            { label: '찾기', onClick: handleConfirm },
                            { label: '취소', onClick: closeModal },
                        ]}
                    >
                        <h1>비밀번호 찾기</h1>
                        <Input
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => setNickname(e.target.value)}
                            onBlur={() => handleEmptyInput('email')}
                            onFocus={() => clearInputMessage('email')}
                            showErrorMessage={!!inputMessage.email && clickedButEmpty.email}
                        />
                        <ErrorMessage visible={!!inputMessage.email && clickedButEmpty.email}>{inputMessage.email}</ErrorMessage>
                        <Input
                            placeholder="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onBlur={() => handleEmptyInput('nickname')}
                            onFocus={() => clearInputMessage('nickname')}
                            showErrorMessage={!!inputMessage.nickname && clickedButEmpty.nickname}
                        />
                        <ErrorMessage visible={!!inputMessage.nickname && clickedButEmpty.nickname}>{inputMessage.nickname}</ErrorMessage>
                    </Modal>
                )}
                <Hr></Hr>
                <SignUpWrapper>
                    <p>아직 회원이 아니세요?</p>
                    <SignupBtn onClick={() => navigate('/signup')}>회원가입</SignupBtn>
                </SignUpWrapper>
                {/* <KakaoLoginButton /> */}
                <SocialKakao />
            </LoginContainer>
        </Layout>
    );
}

const LoginContainer = styled.section`
    width: 600px;
    height: 600px;
    border: 1px solid black;
    box-shadow: 5px 10px 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const LoginHeader = styled.h1`
    font-size: 2.5rem;
`;
const LoginFieldset = styled.fieldset`
    padding: 0;
    margin: 0 auto;
    border: 0;
    text-align: center;
`;
const Input = styled.input<{ showErrorMessage: boolean }>`
    display: block;
    width: 100%;
    height: 45px;
    color: gray;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 1rem;
    border: ${(props) => (props.showErrorMessage ? '2px solid red' : '2px solid #ccc')};
`;
const LoginButton = styled.button`
    width: 100%;
    height: 45px;
    background-color: #f59910;
    color: #ffffff;
    margin-top: 30px;
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
`;

const PwSearch = styled.p`
    font-size: 1rem;
    margin-top: 20px;
    cursor: pointer;
`;

const Hr = styled.hr`
    width: 100%;
    color: #cacaca;
    margin-top: 20px;
`;

const SignUpWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
`;
const SignupBtn = styled.button`
    font-size: 1.25rem;
    background-color: transparent;
    border: none;
    color: #f59910;
    cursor: pointer;
`;
const ErrorMessage = styled.p<{ visible: boolean }>`
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
    min-height: 20px;
    text-align: left;
    visibility: ${(props) => (props.visible ? 'visible' : 'none')};
`;
