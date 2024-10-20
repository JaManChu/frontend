import { useState } from 'react';
import { validateEmail, validatePassword, validatePasswordCheck, validateNickname } from '../utils/validation/validation.ts';

export const useAuth = () => {
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
        setInputMessage,
    };
};
