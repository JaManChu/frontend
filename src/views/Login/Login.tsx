import React from 'react';
import { Layout } from '../../styles/layout';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import KakaoLoginButton from '../../components/KaKaoButton/KaKaoLoginButton';
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

    //input 필드값
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickName] = useState('');

    //에러메세지
    const [errors, setErrors] = useState<{ [key: string]: string }>({
        email: '',
        password: '',
        nickname: '',
    });

    //유저 input 필드값 사용여부
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({
        email: false,
        password: false,
        nickname: false,
    });

    //이메일 형식검사
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //handleBlur 함수에 의해 실행, 유효성 검사 및 에러메세지 업데이트

    const validateField = (field: string) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'email':
                if (!email) {
                    newErrors.email = '이메일을 입력하세요';
                } else if (!validateEmail(email)) {
                    newErrors.email = '이메일 형식이 올바르지않습니다.';
                } else {
                    newErrors.email = '';
                }
                break;

            case 'password':
                if (!password) {
                    newErrors.password = '비밀번호를 입력하세요.';
                } else {
                    newErrors.password = '';
                }
                break;
            case 'nickname':
                if (!nickname) {
                    newErrors.nickname = '닉네임을 입력하세요';
                } else {
                    newErrors.nickname = '';
                }
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    // 유저가 포커스 후 아무값도 입력하지 않으면 실행.
    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field);
    };

    //포커스된 필드의 에러메세지 초기화
    const clearFieldError = (field: string) => {
        const newErrors = { ...errors };
        newErrors[field] = '';
        setErrors(newErrors);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handleConfirm = () => {
        console.log('비밀번호 찾기 로직실행');
        handleClose();
    };

    // //로그인 api추후 통신
    // const handleSubmit = () =>{

    // }

    const [isModalVisible, setIsModalVisible] = useState(false);

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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur('password')}
                        onFocus={() => clearFieldError('password')}
                        isError={!!errors.password && touched.password}
                    />
                    <ErrorMessage visible={!!errors.password && touched.password}>{errors.password}</ErrorMessage>
                </InputWrapper>
                <Button title={'로그인'}>로그인</Button>
                <PwSearch onClick={() => setIsModalVisible(true)}>비밀번호 찾기</PwSearch>
                {isModalVisible && (
                    <Modal
                        visible={isModalVisible}
                        onClose={handleClose}
                        buttons={[
                            { label: '찾기', onClick: handleConfirm },
                            { label: '취소', onClick: handleClose },
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
                            value={nickname}
                            onChange={(e) => setNickName(e.target.value)}
                            onBlur={() => handleBlur('nickname')}
                            onFocus={() => clearFieldError('nickname')}
                            isError={!!errors.email && touched.email}
                        />
                        <ErrorMessage visible={!!errors.nickname && touched.nickname}>{errors.nickname}</ErrorMessage>
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
