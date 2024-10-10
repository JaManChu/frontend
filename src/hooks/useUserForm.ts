import { FormEvent, useState } from 'react';
import { validateEmail, validatePassword, validatePasswordCheck, validateNickname, validateResult } from '../utils/validation/validation.ts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useUserForm = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [nickname, setNickname] = useState('');

    // email, password, passwordCheck, nickname의 에러를 배열로 저장
    const [inputMessage, setInputMessage] = useState<{ [key: string]: string }>({
        email: '',
        password: '',
        passwordCheck: '',
        nickname: '',
    });

    // 클릭했으나 입력하지 않고 다음 input창으로 넘어간 경우 : true로 갱신
    const [clickedButEmpty, setClickedButEmpty] = useState<{ [key: string]: boolean }>({
        email: false,
        password: false,
        passwordCheck: false,
        nickname: false,
    });

    // 입력하지 않은 input에 대해서 각각 에러 메시지 호출
    const handleEmptyInput = (field: string) => {
        setClickedButEmpty((prev) => ({ ...prev, [field]: true }));

        let emptyInputMessage = '';

        switch (field) {
            case 'email':
                emptyInputMessage = validateEmail(email);
                break;
            case 'password':
                emptyInputMessage = validatePassword(password);
                break;
            case 'passwordCheck':
                emptyInputMessage = validatePasswordCheck(password, passwordCheck);
                break;
            case 'nickname':
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
    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`API URL: ${import.meta.env.VITE_BASE_URL}/users/signup`);
        // 유효성 검사 결과 담아서 inputMessage에 반환
        const inputResult = validateResult({ email, password, passwordCheck, nickname });
        setInputMessage(inputResult);
        console.log(email, password, nickname);
        // email, password, passwordCheck, nickName 중 어느 하나라도 ''값이 아닌 경우 false 반환
        const hasMessage = Object.values(inputResult).some((result) => result !== '');
        console.log(email, password, nickname);
        // hasMessage가 false인 경우(모든 validation 통과한 경우)
        if (hasMessage) {
            alert('모든 필드값을 입력해주시기 바랍니다.');
            return;
        }

        try {
            const response: any = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, { email, password, nickname });

            if (response.status == 201) {
                console.log('success?');
                console.log(response);
                setMessage(response.data.message);
                navigate('/login');
            }
            // !  response.code가 200이 아닌 경우 catch로 넘어가는지 확인
        } catch (err: any) {
            console.log(`${import.meta.env.VITE_BASE_URL}/users/signup`);

            setMessage(err.message);
        }
    };
    console.log(message);
    // 로그인 버튼 눌렀을때 호출되는 함수
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 유효성 검사 결과 담아서 inputMessage에 반환
        const inputResult = validateResult({ email, password });
        setInputMessage(inputResult);

        // email, password중 어느 하나라도 ''값이 아닌 경우 false 반환
        const hasMessage = Object.values(inputResult).some((result) => result !== '');

        // hasMessage가 false인 경우(모든 validation 통과한 경우)
        if (hasMessage) {
            alert('모든 필드값을 입력해주시기 바랍니다.');
        }
        try {
            const body = {
                email: email,
                password: password,
            };

            const response: any = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                console.log(response);
                // ! 임시 저장(토큰 내려주는지 확인) - accessToken 인지 refreshToken인지
                // ! HTTP only인지 , headers-cookie인지 check
                const accessToken = response.headers['Access-Token'];

                sessionStorage.setItem('token', accessToken);
                setMessage(response.message);
                alert(response.message);
            }
            // !  response.code가 200이 아닌 경우 catch로 넘어가는지 확인
        } catch (err: any) {
            setMessage(err.message);
            console.log('에러? :', err);
            console.error('에러 정보:', err.response ? err.response.data : err.message);
        }
    };

    return {
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
        handleLogin,
    };
};
