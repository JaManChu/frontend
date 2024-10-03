// src/components/signup/hooks/useSignupForm.ts

import { useState } from 'react';
import { validateEmail, validatePassword, validatePasswordCheck, validateNickname, validateAllFields } from '../validation/validation.ts';

export const useSignupForm = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [nickName, setNickName] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: string }>({
        email: '',
        pw: '',
        pwCheck: '',
        nickName: '',
    });

    const [touched, setTouched] = useState<{ [key: string]: boolean }>({
        email: false,
        pw: false,
        pwCheck: false,
        nickName: false,
    });

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
        console.log('Touched state', touched);
        console.log('errors', errors);
    };

    const clearFieldError = (field: string) => {
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handleSubmit = () => {
        const newErrors = validateAllFields(email, pw, pwCheck, nickName);
        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some((error) => error !== '');

        if (!hasErrors) {
            return {
                email,
                password: pw,
                nickname: nickName,
            };
        }

        return null;
    };

    return {
        email,
        setEmail,
        pw,
        setPw,
        pwCheck,
        setPwCheck,
        nickName,
        setNickName,
        errors,
        touched,
        handleBlur,
        clearFieldError,
        handleSubmit,
    };
};
