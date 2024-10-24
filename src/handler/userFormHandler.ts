import { FormEvent, useState } from 'react';
import { validateEmail, validatePassword, validatePasswordCheck, validateNickname, validateSignup } from '../utils/validation/validation.ts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducer/userSlice.ts';
import { showModal } from '../redux/reducer/modalSlice.ts';
import axios from 'axios';

export const userFormHandler = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        // 유효성 검사 결과 담아서 inputMessage에 반환
        const inputResult = validateSignup({ email, password, passwordCheck, nickname });
        setInputMessage(inputResult);
        // email, password, passwordCheck, nickName 중 어느 하나라도 ''값이 아닌 경우 false 반환
        const hasMessage = Object.values(inputResult).some((result) => result !== '');
        // hasMessage가 false인 경우(모든 validation 통과한 경우)
        if (hasMessage) {
            dispatch(showModal({ isOpen: true, content: '모든 필드값을 입력해주시기 바랍니다.', onConfirm: null }));
            return;
        }

        try {
            const response: any = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, { email, password, nickname });
            if (response.status == 201) {
                dispatch(showModal({ isOpen: true, content: response.data.message, onConfirm: null })); // 회원가입 성공 modal
                navigate('/login');
            }
        } catch (err: any) {
            console.log('회원가입 에러: ', err);
            dispatch(showModal({ isOpen: true, content: err.response.data, onConfirm: null })); // 회원가입 실패 modal
        }
    };

    // 로그인 버튼 눌렀을때 호출되는 함수
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email == '') dispatch(showModal({ isOpen: true, content: '이메일을 입력해주시기 바랍니다.', onConfirm: null }));
        else if (password == '') dispatch(showModal({ isOpen: true, content: '비밀번호를 입력해주시기 바랍니다.', onConfirm: null }));

        try {
            const response: any = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, { email, password });
            console.log('response', response);
            console.log('response.data :', response.data);
            if (response.data.code == 'OK') {
                const token = response.headers['access-token']; // 헤더 토큰 저장
                const accessToken = token?.replace('Bearer ', ''); // Bearer 삭제 후 저장
                const userDispatchData = { isLoggedIn: true, token: accessToken, nickname: response.data.data, provider: 'system' };
                dispatch(loginSuccess(userDispatchData));
                dispatch(showModal({ isOpen: true, content: response.data.message, onConfirm: null })); // 로그인 성공 modal
                navigate('/');
            }
        } catch (err: any) {
            if (err.response) {
                dispatch(showModal({ isOpen: true, content: err.response.data, onConfirm: null }));
            } else {
                console.log('로그인 에러: ', err);
            }
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
        setInputMessage,
    };
};
