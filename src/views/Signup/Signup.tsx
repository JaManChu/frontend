import { useState } from 'react';
import styled from 'styled-components';
import { Layout } from '../../styles/layout';
import Modal from '../../components/Modal/Modal';
import { useUserForm } from '../../hooks/useUserForm.ts';
import { useModal } from '../../hooks/useModal.ts';
import axios from 'axios';

const SingupContainer = styled.section`
    width: 800px;
    height: 600px;
    border: 2px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const SingupHeader = styled.h1`
    font-size: 2.5rem;
`;
const SignupFieldset = styled.fieldset`
    width: 100%;
    padding: 0;
    margin: 10px auto;
    border: 0;
    text-align: center;
`;
const SignupEmailWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Input = styled.input<{ showErrorMessage: boolean }>`
    width: 100%;
    min-width: 300px;
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    font-size: 1rem;
    border: ${(props) => (props.showErrorMessage ? '2px solid red' : '1px solid #ccc')};
`;

const Button = styled.button`
    min-width: 80px;
    width: 50%;
    height: 40px;
    margin: 8px 0 0 20px;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: #f59910;
    cursor: pointer;
`;

// `visible` : 에러메세지가 있을 때 boolean으로 style적용
const ErrorMessage = styled.p<{ visible: boolean }>`
    min-height: 20px;
    margin-top: 5px;
    color: red;
    font-size: 0.8rem;
    text-align: start;
    visibility: ${(props) => (props.visible ? 'visible' : 'none')}; /* 에러가 없을 때는 숨김 */
`;

export default function Signup(): JSX.Element {
    const [message, setMessage] = useState<string>('');
    const {
        email,
        setEmail,
        password,
        setPassword,
        passwordCheck,
        setPasswordCheck,
        nickname,
        setNickname,
        inputMessage,
        clickedButEmpty,
        handleEmptyInput,
        clearInputMessage,
        handleSignup,
    } = useUserForm();

    const { isModalVisible, openModal, closeModal } = useModal();

    const handleCheckEmail = async () => {
        try {
            const response: any = await axios.get(`${process.env.REACT_APP_API_URL}/auth/email-check?email=${email}`);
            console.log(response);
            if (response.data === true) {
                alert(response.message);
                setMessage(response.message);
            } else {
                alert(response.message);
                setMessage(response.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Layout>
            <SingupContainer>
                <SingupHeader>회원가입</SingupHeader>
                <form action="/users/signup" method="post" onSubmit={handleSignup}>
                    <SignupFieldset>
                        <legend>Welcome, Register your account</legend>
                        <SignupEmailWrapper>
                            <Input
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={() => handleEmptyInput('email')}
                                onFocus={() => clearInputMessage('email')}
                                // inputMessage에 값이 있을때 & clickedButEmpty가 true일때
                                showErrorMessage={!!inputMessage.email && clickedButEmpty.email}
                                placeholder="이메일을 입력하세요"
                            />
                            <Button
                                type="button"
                                onClick={() => {
                                    openModal();
                                    handleCheckEmail();
                                }}
                            >
                                중복확인
                            </Button>
                        </SignupEmailWrapper>

                        <ErrorMessage visible={!!inputMessage.email && clickedButEmpty.email}>{inputMessage.email}</ErrorMessage>
                        <Input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => handleEmptyInput('password')}
                            onFocus={() => clearInputMessage('password')}
                            showErrorMessage={!!inputMessage.password && clickedButEmpty.password}
                            placeholder="비밀번호"
                        />
                        <ErrorMessage visible={!!inputMessage.pw && clickedButEmpty.password}>{inputMessage.password}</ErrorMessage>
                        <Input
                            name="passwordCheck"
                            type="password"
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                            onBlur={() => handleEmptyInput('passwordCheck')}
                            onFocus={() => clearInputMessage('passwordCheck')}
                            showErrorMessage={!!inputMessage.passwordCheck && clickedButEmpty.passwordCheck}
                            placeholder="비밀번호 확인"
                        />
                        <ErrorMessage visible={!!inputMessage.passwordCheck && clickedButEmpty.passwordCheck}>
                            {inputMessage.passwordCheck}
                        </ErrorMessage>
                        <Input
                            placeholder="닉네임"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onBlur={() => handleEmptyInput('nickname')}
                            onFocus={() => clearInputMessage('nickname')}
                            showErrorMessage={!!inputMessage.nickname && clickedButEmpty.nickname}
                        />
                        <ErrorMessage visible={!!inputMessage.nickname && clickedButEmpty.nickname}>{inputMessage.nickname}</ErrorMessage>
                    </SignupFieldset>
                    <Button type="submit">회원가입</Button>
                </form>

                {isModalVisible && (
                    <Modal visible={isModalVisible} onClose={closeModal} buttons={[{ label: '확인', onClick: closeModal }]}>
                        <h2>중복 확인</h2>
                        <p>{message}</p>
                    </Modal>
                )}
            </SingupContainer>
        </Layout>
    );
}
