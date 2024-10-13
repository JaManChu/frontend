// 이메일 유효성 검사
export const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return '이메일을 입력하세요';
    if (!emailRegex.test(email)) return '이메일 형식이 올바르지 않습니다';
    return '';
};

// 비밀번호 유효성 검사
export const validatePassword = (password: string): string => {
    if (!password) return '비밀번호를 입력하세요';
    if (password.includes(' ')) return '비밀번호에 공백을 포함할 수 없습니다';
    if (password.length < 8 || password.length > 16) return '비밀번호는 8자 이상 16자 이하로 입력해주세요';
    return '';
};

// 비밀번호 확인 유효성 검사
export const validatePasswordCheck = (password: string, passwordCheck: string): string => {
    if (!passwordCheck) return '비밀번호 확인을 입력하세요';
    if (password !== passwordCheck) return '비밀번호가 일치하지 않습니다';
    return '';
};

// 닉네임 유효성 검사
export const validateNickname = (nickname: string): string => {
    if (!nickname) return '닉네임을 입력하세요';
    return '';
};

interface ValidationProps {
    email: string;
    password: string;
    passwordCheck?: string;
    nickname?: string;
}
interface UserInfoValidationProps {
    password: string;
    passwordCheck?: string;
    nickname?: string;
}

// 유효성 검사 결과 (success or fail)
export const validateResult = ({ email, password, passwordCheck, nickname }: ValidationProps) => {
    return {
        email: validateEmail(email),
        password: validatePassword(password),
        passwordCheck: passwordCheck ? validatePasswordCheck(password, passwordCheck) : '',
        nickName: nickname ? validateNickname(nickname) : '',
    };
};

export const validateUserIfno = ({ password, passwordCheck, nickname }: UserInfoValidationProps) => {
    return {
        password: validatePassword(password),
        passwordCheck: passwordCheck ? validatePasswordCheck(password, passwordCheck) : '',
        nickName: nickname ? validateNickname(nickname) : '',
    };
};
