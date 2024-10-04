import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout } from '../../styles/layout';
import Modal from '../../components/Modal/Modal';
import { useSignupForm } from './hooks/useSignUpForm.ts';
import { useModal } from './hooks/useModal.ts';
import axios from 'axios';

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
    const [message, setMessage] = useState<string>('');
    const {
        email,
        setEmail,
        password,
        setPassword,
        pwCheck,
        setPwCheck,
        nickname,
        setNickname,
        inputMessage,
        clickedButEmpty,
        handleEmptyInput,
        clearInputMessage,
        handleSubmit,
    } = useSignupForm();

    const { isModalVisible, openModal, closeModal } = useModal();

    const handleCheckEmail = async () => {
        try {
            const response: any = await axios.get(`/auth/email-check?email=${email}`);
            if (response.data === true) {
                alert(response.message);
                setMessage(response.meesage);
            } else {
                alert(response.message);
                setMessage(response.meesage);
            }
        } catch (err) {
            console.log(err);
        }
    };

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
                            onBlur={() => handleEmptyInput('email')}
                            onFocus={() => clearInputMessage('email')}
                            // inputMessage에 값이 있을때 & clickedButEmpty가 true일때
                            isError={!!inputMessage.email && clickedButEmpty.email}
                        />
                        <ErrorMessage visible={!!inputMessage.email && clickedButEmpty.email}>{inputMessage.email}</ErrorMessage>

                        <Input
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => handleEmptyInput('pw')}
                            onFocus={() => clearInputMessage('pw')}
                            isError={!!inputMessage.password && clickedButEmpty.pw}
                        />
                        <ErrorMessage visible={!!inputMessage.pw && clickedButEmpty.pw}>{inputMessage.password}</ErrorMessage>

                        <Input
                            type="password"
                            placeholder="비밀번호 확인"
                            value={pwCheck}
                            onChange={(e) => setPwCheck(e.target.value)}
                            onBlur={() => handleEmptyInput('pwCheck')}
                            onFocus={() => clearInputMessage('pwCheck')}
                            isError={!!inputMessage.pwCheck && clickedButEmpty.pwCheck}
                        />
                        <ErrorMessage visible={!!inputMessage.pwCheck && clickedButEmpty.pwCheck}>{inputMessage.pwCheck}</ErrorMessage>

                        <Input
                            placeholder="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onBlur={() => handleEmptyInput('nickName')}
                            onFocus={() => clearInputMessage('nickName')}
                            isError={!!inputMessage.nickName && clickedButEmpty.nickName}
                        />
                        <ErrorMessage visible={!!inputMessage.nickName && clickedButEmpty.nickName}>{inputMessage.nickName}</ErrorMessage>
                    </LeftWrapper>
                    <RightWrapper>
                        <Button
                            // ! type button 이어야 하는지 확인하고 onClick 인지 onSubmit인지 체크하셈
                            type="button"
                            onClick={() => {
                                openModal();
                                handleCheckEmail();
                            }}
                        >
                            중복확인
                        </Button>
                    </RightWrapper>
                </CombineWrapper>
                <Button onClick={handleSubmit}>회원가입</Button>

                {isModalVisible && (
                    <Modal visible={isModalVisible} onClose={closeModal} buttons={[{ label: '확인', onClick: closeModal }]}>
                        <h2>중복 확인</h2>
                        <p>{message}</p>
                    </Modal>
                )}
            </Wrapper>
        </Layout>
    );
};

export default Signup;
