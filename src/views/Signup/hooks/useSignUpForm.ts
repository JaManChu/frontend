// src/components/signup/hooks/useSignupForm.ts

import { useState } from 'react';
import {
    validateEmail,
    validatePassword,
    validatePasswordCheck,
    validateNickname,
    validateSignupResult,
    validateLoginResult,
} from '../validation/validation.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useSignupForm = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [nickname, setNickname] = useState('');

    // email, pw, pwCheck, nickName의 에러를 배열로 저장
    const [inputMessage, setInputMessage] = useState<{ [key: string]: string }>({
        email: '',
        pw: '',
        pwCheck: '',
        nickName: '',
    });

    // 클릭했으나 입력하지 않고 다음 input창으로 넘어간 경우 : true로 갱신
    const [clickedButEmpty, setClickedButEmpty] = useState<{ [key: string]: boolean }>({
        email: false,
        pw: false,
        pwCheck: false,
        nickName: false,
    });

    // 입력하지 않은 input에 대해서 각각 에러 메시지 호출
    const handleEmptyInput = (field: string) => {
        setClickedButEmpty((prev) => ({ ...prev, [field]: true }));

        let emptyInputMessage = '';

        switch (field) {
            case 'email':
                emptyInputMessage = validateEmail(email);
                break;
            case 'pw':
                emptyInputMessage = validatePassword(password);
                break;
            case 'pwCheck':
                emptyInputMessage = validatePasswordCheck(password, pwCheck);
                break;
            case 'nickName':
                emptyInputMessage = validateNickname(nickname);
                break;
            default:
                break;
        }
        // field가 true로 바뀐 key값만 emptyInputMessage로 갱신
        setInputMessage((prev) => ({ ...prev, [field]: emptyInputMessage }));
        // console.log('Touched state', clickedButEmpty);
        // console.log('errors', errors);
    };

    // 사용자가 emptyInputMessage 확인후 해당 input 다시 클릭시 message 초기화
    const clearInputMessage = (field: string) => {
        setInputMessage((prev) => ({ ...prev, [field]: '' }));
    };

    // 회원가입 버튼 눌렀을때 호출되는 함수
    const handleSubmit = async () => {
        // 유효성 검사 결과 담아서 inputMessage에 반환
        const inputResult = validateSignupResult(email, password, pwCheck, nickname);
        setInputMessage(inputResult);

        // email, pw, pwCheck, nickName 중 어느 하나라도 ''값이 아닌 경우 false 반환
        const hasMessage = Object.values(inputResult).some((result) => result !== '');

        // hasMessage가 false인 경우(모든 validation 통과한 경우)
        if (hasMessage) {
            alert('모든 필드값을 입력해주시기 바랍니다.');
        }

        try {
            const response: any = await axios.post('/users/signup', { email, password, nickname });
            if (response.code == 200) {
                setMessage(response.message);
                navigate('/login');
            }
            // !  response.code가 200이 아닌 경우 catch로 넘어가는지 확인
        } catch (err: any) {
            setMessage(err.message);
        }
    };

    // 로그인 버튼 눌렀을때 호출되는 함수
    const handleLogin = async () => {
        // 유효성 검사 결과 담아서 inputMessage에 반환
        const inputResult = validateLoginResult(email, password);
        setInputMessage(inputResult);

        // email, pw중 어느 하나라도 ''값이 아닌 경우 false 반환
        const hasMessage = Object.values(inputResult).some((result) => result !== '');

        // hasMessage가 false인 경우(모든 validation 통과한 경우)
        if (hasMessage) {
            alert('모든 필드값을 입력해주시기 바랍니다.');
        }

        try {
            const response: any = await axios.post('/users/login', { email, password });
            if (response.code == 200) {
                // ! 임시 저장(토큰 내려주는지 확인) - accessToken 인지 refreshToken인지
                // ! HTTP only인지 , headers-cookie인지 check
                localStorage.setItem('token', response.data.token);
                setMessage(response.message);
                alert(response.message);
            }
            // !  response.code가 200이 아닌 경우 catch로 넘어가는지 확인
        } catch (err: any) {
            setMessage(err.message);
        }
    };

    return {
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
        handleLogin,
    };
};
