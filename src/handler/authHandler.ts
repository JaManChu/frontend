import { FormEvent } from 'react';
import { validateSignup, validateLogin } from '../utils/validation/validation.ts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducer/userSlice.ts';
import { showModal } from '../redux/reducer/modalSlice.ts';
import { useAuth } from '../hooks/useAuth.ts';
import axios from 'axios';

export const authHandler = () => {
    const { email, password, passwordCheck, nickname, setInputMessage } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 회원가입 버튼 눌렀을때 호출되는 함수
    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 유효성 검사 결과 담아서 inputMessage에 반환
        const inputResult = validateSignup({ email, password, passwordCheck, nickname });
        setInputMessage(inputResult);
        // email, password, passwordCheck, nickName 중 어느 하나라도 ''값이 아닌 경우 false 반환
        const hasMessage = Object.values(inputResult).some((result) => result !== '');
        // hasMessage가 false인 경우(모든 validation 통과한 경우)
        if (hasMessage) {
            dispatch(showModal({ isOpen: true, content: '모든 필드값을 입력해주시기 바랍니다.' }));
            return;
        }

        try {
            const response: any = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, { email, password, nickname });
            if (response.status == 201) {
                dispatch(showModal({ isOpen: true, content: response.data.message })); // 회원가입 성공 modal
                navigate('/login');
            }
        } catch (err: any) {
            console.log('회원가입 error: ', err);
            dispatch(showModal({ isOpen: true, content: err.response.data })); // 회원가입 실패 modal
        }
    };

    // 로그인 버튼 눌렀을때 호출되는 함수
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 유효성 검사 결과 담아서 inputMessage에 반환
        const inputResult = validateLogin({ email, password });
        setInputMessage(inputResult);

        // email, password중 어느 하나라도 ''값이 아닌 경우 false 반환
        const hasMessage = Object.values(inputResult).some((result) => result !== '');

        // hasMessage가 false인 경우(모든 validation 통과한 경우)
        if (hasMessage) {
            dispatch(showModal({ isOpen: true, content: '모든 필드값을 입력해주시기 바랍니다.' }));
        }
        try {
            const response: any = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, { email, password });
            if (response.data.code == 'OK') {
                const token = response.headers['access-token']; // 헤더 토큰 저장
                const accessToken = token?.replace('Bearer ', ''); // Bearer 삭제 후 저장
                const userDispatchData = { isLoggedIn: true, token: accessToken, nickname: response.data.data };
                dispatch(loginSuccess(userDispatchData));
                dispatch(showModal({ isOpen: true, content: response.data.message })); // 로그인 성공 modal
                navigate('/home');
            }
        } catch (err: any) {
            console.log('로그인 error: ', err);
            dispatch(showModal({ isOpen: true, content: err.response.data })); // 로그인 성공 modal
        }
    };

    return {
        email,
        password,
        passwordCheck,
        nickname,
        handleSignup,
        handleLogin,
        setInputMessage,
    };
};
