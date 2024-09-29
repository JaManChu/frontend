import React, { useEffect } from 'react';
import styled from 'styled-components';

// Kakao SDK 버튼 스타일
const Button = styled.button`
    width: 400px;
    height: 45px;
    background-color: #fff500;
    color: 'black';
    margin-top: 30px;
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
`;

// Kakao SDK에 대한 타입 선언
declare global {
    interface Window {
        Kakao: Kakao;
    }
}

interface Kakao {
    init: (appKey: string) => void;
    isInitialized: () => boolean;
    Auth: {
        login: (options: KakaoLoginOptions) => void;
        logout: () => void;
    };
}

interface KakaoLoginOptions {
    success: (authObj: KakaoAuthResponse) => void;
    fail: (error: KakaoError) => void;
}

interface KakaoAuthResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
}

interface KakaoError {
    error: string;
    error_description: string;
}

const KakaoLoginButton: React.FC = () => {
    useEffect(() => {
        // 카카오 SDK 초기화
        const kakaoScript = document.createElement('script');
        kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
        kakaoScript.onload = () => {
            if (window.Kakao) {
                window.Kakao.init('91aea589a3ff33ba0a88c8c5ff3762d1'); // 발급받은 JavaScript 키로 초기화
                console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
            }
        };
        document.head.appendChild(kakaoScript);
    }, []);

    const handleKakaoLogin = () => {
        window.Kakao.Auth.login({
            success: (authObj: KakaoAuthResponse) => {
                console.log('카카오 로그인 성공:', authObj);
            },
            fail: (error: KakaoError) => {
                console.error('카카오 로그인 실패:', error);
            },
        });
    };

    return <Button onClick={handleKakaoLogin}>카카오로 시작하기</Button>;
};

export default KakaoLoginButton;
