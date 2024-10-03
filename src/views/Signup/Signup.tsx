import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout } from '../../styles/layout';
import Modal from '../../components/Modal/Modal';
import { validateEmail, validatePassword, validatePasswordCheck, validateNickname, validateAllFields } from './validation/validation';

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
    // input 필드값
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [nickName, setNickName] = useState('');

    // 에러메세지
    const [errors, setErrors] = useState<{ [key: string]: string }>({
        email: '',
        pw: '',
        pwCheck: '',
        nickName: '',
    });

    // 유저의 input 필드값 사용여부
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({
        email: false,
        pw: false,
        pwCheck: false,
        nickName: false,
    });

    // handleBlur 함수에 의해 실행, 유효성 검사 및 에러메세지 업데이트
    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));

        let newError = '';

        switch (field) {
            case 'email':
                newError = validateEmail(email);
                break;
            case 'pw':
                newError = validatePassword(pw);
                break;
            case 'pwCheck':
                newError = validatePasswordCheck(pw, pwCheck);
                break;
            case 'nickName':
                newError = validateNickname(nickName);
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [field]: newError }));
    };

    // 포커스된 필드의 에러메세지 초기화
    const clearFieldError = (field: string) => {
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    // 에러메세지가 없을 때 api와 추후통신
    const handleSubmit = () => {
        const newErrors = validateAllFields(email, pw, pwCheck, nickName);
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error !== '');

        if (!hasErrors) {
            const signupData = {
                email,
                password: pw,
                nickname: nickName,
            };

            console.log('Signup data:', signupData);
        }
    };

    // 모달 상태관리
    const [isModalVisible, setIsModalVisible] = useState(false);

    // 중복 확인 버튼을 눌렀을 때 모달 열기
    const handleDuplicateCheck = () => {
        setIsModalVisible(true); // 모달을 띄움
    };

    const handleClose = () => {
        setIsModalVisible(false);
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
                        <Button onClick={handleDuplicateCheck}>중복확인</Button>
                    </RightWrapper>
                </CombineWrapper>
                <Button onClick={handleSubmit}>회원가입</Button>

                {isModalVisible && (
                    <Modal visible={isModalVisible} onClose={handleClose} buttons={[{ label: '확인', onClick: handleClose }]}>
                        <h2>중복 확인</h2>
                        <p>이미 사용중인 이메일입니다.</p>
                    </Modal>
                )}
            </Wrapper>
        </Layout>
    );
};

export default Signup;
