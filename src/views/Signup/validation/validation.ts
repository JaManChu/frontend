// src/components/signup/validation/validation.ts

// 이메일 유효성 검사
export const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return '이메일을 입력하세요';
    if (!emailRegex.test(email)) return '이메일 형식이 올바르지 않습니다';
    return '';
};

// 비밀번호 유효성 검사
export const validatePassword = (pw: string): string => {
    if (!pw) return '비밀번호를 입력하세요';
    return '';
};

// 비밀번호 확인 유효성 검사
export const validatePasswordCheck = (pw: string, passwordCheck: string): string => {
    if (!passwordCheck) return '비밀번호 확인을 입력하세요';
    if (pw !== passwordCheck) return '비밀번호가 일치하지 않습니다';
    return '';
};

// 닉네임 유효성 검사
export const validateNickname = (nickName: string): string => {
    if (!nickName) return '닉네임을 입력하세요';
    return '';
};

// 유효성 검사 결과 (success or fail)
export const validateSignupResult = (email: string, pw: string, pwCheck: string, nickName: string) => {
    return {
        email: validateEmail(email),
        pw: validatePassword(pw),
        pwCheck: validatePasswordCheck(pw, pwCheck),
        nickName: validateNickname(nickName),
    };
};

export const validateLoginResult = (email: string, pw: string) => {
    return {
        email: validateEmail(email),
        pw: validatePassword(pw),
    };
};
