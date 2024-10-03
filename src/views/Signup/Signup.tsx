import React from 'react';
import styled from 'styled-components';
import { Layout } from '../../styles/layout';
import Modal from '../../components/Modal/Modal';
import { useSignupForm } from './hooks/useSignUpForm.ts';
import { useModal } from './hooks/useModal.ts';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 800px;
    height: 600px;
    border: 2px solid black;
    border-radius: 10px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
`;

const Input = styled.input<{ isError: boolean }>`
    width: 300px;
    height: 40px;
    margin-top: 10px;
    margin-left: 60px;
    border-radius: 10px;
    font-size: 1.5rem;
    border: ${(props) => (props.isError ? '2px solid red' : '1px solid #ccc')};
`;

const CombineWrapper = styled.section`
    display: flex;
    margin-top: 30px;
`;

const LeftWrapper = styled.section`
    display: flex;
    flex-direction: column;
`;

const RightWrapper = styled.section`
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    border: none;
    border-radius: 10px;
    color: white;
    background-color: #f59910;
    width: 120px;
    height: 40px;
    font-size: 1rem;
    margin-top: 10px;
    margin-left: 60px;
    cursor: pointer;
`;

// `visible` : 에러메세지가 있을 때 boolean으로 style적용
const ErrorMessage = styled.p<{ visible: boolean }>`
    color: red;
    font-size: 0.8rem;
    margin-top: 5px;
    margin-left: 60px;
    min-height: 20px; /* 고정된 높이로 설정 */
    visibility: ${(props) => (props.visible ? 'visible' : 'hidden')}; /* 에러가 없을 때는 숨김 */
`;

const Signup: React.FC = () => {
    const { email, setEmail, pw, setPw, pwCheck, setPwCheck, nickName, setNickName, errors, touched, handleBlur, clearFieldError, handleSubmit } =
        useSignupForm();

    const { isModalVisible, openModal, closeModal } = useModal();

    return (
        <Layout>
            <Wrapper>
                <Title>회원가입</Title>
                <CombineWrapper>
                    <LeftWrapper>
                        <Input
                            placeholder="이메일을 입력하세요"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => handleBlur('email')}
                            onFocus={() => clearFieldError('email')}
                            isError={!!errors.email && touched.email}
                        />
                        <ErrorMessage visible={!!errors.email && touched.email}>{errors.email}</ErrorMessage>

                        <Input
                            type="password"
                            placeholder="비밀번호"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            onBlur={() => handleBlur('pw')}
                            onFocus={() => clearFieldError('pw')}
                            isError={!!errors.pw && touched.pw}
                        />
                        <ErrorMessage visible={!!errors.pw && touched.pw}>{errors.pw}</ErrorMessage>

                        <Input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={pwCheck}
                            onChange={(e) => setPwCheck(e.target.value)}
                            onBlur={() => handleBlur('pwCheck')}
                            onFocus={() => clearFieldError('pwCheck')}
                            isError={!!errors.pwCheck && touched.pwCheck}
                        />
                        <ErrorMessage visible={!!errors.pwCheck && touched.pwCheck}>{errors.pwCheck}</ErrorMessage>

                        <Input
                            placeholder="닉네임"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                            onBlur={() => handleBlur('nickName')}
                            onFocus={() => clearFieldError('nickName')}
                            isError={!!errors.nickName && touched.nickName}
                        />
                        <ErrorMessage visible={!!errors.nickName && touched.nickName}>{errors.nickName}</ErrorMessage>
                    </LeftWrapper>
                    <RightWrapper>
                        <Button onClick={openModal}>중복확인</Button>
                    </RightWrapper>
                </CombineWrapper>
                <Button onClick={handleSubmit}>회원가입</Button>

                {isModalVisible && (
                    <Modal visible={isModalVisible} onClose={closeModal} buttons={[{ label: '확인', onClick: closeModal }]}>
                        <h2>중복 확인</h2>
                        <p>이미 사용중인 이메일입니다.</p>
                    </Modal>
                )}
            </Wrapper>
        </Layout>
    );
};

export default Signup;
