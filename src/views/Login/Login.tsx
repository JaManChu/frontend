import React from 'react';
import { Layout } from '../../styles/layout';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import KakaoLoginButton from '../../components/KaKaoButton/KaKaoLoginButton';
import { useModal } from '../Signup/hooks/useModal';
import { useSignupForm } from '../Signup/hooks/useSignUpForm';

const Wrapper = styled.div`
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

const InputWrapper = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

const Button = styled.button<{ title: string }>`
    width: 400px;
    height: 45px;
    background-color: ${(props) => (props.title === '로그인' ? '#F59910' : '#FFF500')};
    color: ${(props) => (props.title === '로그인' ? 'white' : 'black')};
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

const SignupText = styled.h1<{ text: string }>`
    font-size: 1.25rem;
    color: ${(props) => (props.text === '버튼' ? '#F59910' : 'black')};
    cursor: ${(props) => (props.text === '버튼' ? 'pointer' : '')};
`;

const Title = styled.h1`
    font-size: 2.5rem;
`;

const ErrorMessage = styled.p<{ visible: boolean }>`
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
    margin-right: 260px;
    min-height: 20px;
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
const Login: React.FC = () => {
    const navigate = useNavigate();
    const { email, setEmail, pw, setPw, nickName, setNickName, touched, handleBlur, clearFieldError, errors } = useSignupForm();
    const { openModal, closeModal, handleConfirm, isModalVisible } = useModal();

    return (
        <Layout>
            <Wrapper>
                <Title>로그인</Title>
                <InputWrapper>
                    <Input
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur('email')}
                        onFocus={() => clearFieldError('email')}
                        isError={!!errors.email && touched.email}
                    />
                    <ErrorMessage visible={!!errors.email && touched.email}>{errors.email}</ErrorMessage>
                    <Input
                        placeholder="비밀번호"
                        type="password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        onBlur={() => handleBlur('pw')}
                        onFocus={() => clearFieldError('pw')}
                        isError={!!errors.pw && touched.pw}
                    />
                    <ErrorMessage visible={!!errors.pw && touched.pw}>{errors.pw}</ErrorMessage>
                </InputWrapper>
                <Button title={'로그인'}>로그인</Button>
                <PwSearch onClick={openModal}>비밀번호 찾기</PwSearch>
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
                            onChange={(e) => setNickName(e.target.value)}
                            onBlur={() => handleBlur('email')}
                            onFocus={() => clearFieldError('email')}
                            isError={!!errors.email && touched.email}
                        />
                        <ErrorMessage visible={!!errors.email && touched.email}>{errors.email}</ErrorMessage>
                        <Input
                            placeholder="닉네임"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                            onBlur={() => handleBlur('nickName')}
                            onFocus={() => clearFieldError('nickName')}
                            isError={!!errors.nickName && touched.nickName}
                        />
                        <ErrorMessage visible={!!errors.nickName && touched.nickName}>{errors.nickName}</ErrorMessage>
                    </Modal>
                )}
                <Hr></Hr>
                <SignUpWrapper>
                    <SignupText text={''}>아직 회원이 아니세요?</SignupText>
                    <SignupText text={'버튼'} onClick={() => navigate('/signup')}>
                        회원가입
                    </SignupText>
                </SignUpWrapper>
                <KakaoLoginButton />
            </Wrapper>
        </Layout>
    );
};

export default Login;
