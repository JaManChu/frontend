import { useState } from 'react';
import {
    validateEmail,
    validatePassword,
    validatePasswordCheck,
    validateNickname,
    validateNewPasswordCheck,
} from '../../../utils/validation/validation.ts';

export const useUpdateForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [nickname, setNickname] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: string }>({
        email: '',
        password: '',
        passwordCheck: '',
        newpassword: '',
        nickname: '',
    });

    const [touched, setTouched] = useState<{ [key: string]: boolean }>({
        email: false,
        password: false,
        passwordCheck: false,
        nickname: false,
        newpassword: false,
    });

    const handleBlur = (field: string) => {
        setTouched((prev) => ({ ...prev, [field]: true }));

        let newError = '';

        switch (field) {
            case 'email':
                newError = validateEmail(email);
                break;
            case 'newpassword':
                newError = validateNewPasswordCheck(newPassword, passwordCheck);
                break;
            case 'password':
                newError = validatePassword(password);
                break;
            case 'passwordCheck':
                newError = validatePasswordCheck(newPassword, passwordCheck);
                break;
            case 'nickname':
                newError = validateNickname(nickname);
                break;
            default:
                break;
        }

        setErrors((prev) => ({ ...prev, [field]: newError }));
        console.log('Touched state', touched);
        console.log('errors', errors);
    };

    const clearFieldError = (field: string) => {
        setErrors((prev) => ({ ...prev, [field]: '' }));
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
        errors,
        touched,
        handleBlur,
        clearFieldError,
        newPassword,
        setNewPassword,
    };
};
