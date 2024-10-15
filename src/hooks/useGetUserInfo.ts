import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import useAuthToken from './useAuthToken';

export const useGetUserInfo = () => {
    const token = useAuthToken();

    const [userInfo, setUserInfo] = useState({ email: '', nickname: '', img: '' });

    const fetchUserInfo = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`, {
                headers: {
                    'access-token': `Bearer ${token}`,
                },
                withCredentials: true,
            });
            console.log('마이페이지 유저정보', response);
            const { email, nickname } = response.data.data;
            setUserInfo({
                email: email,
                nickname: nickname,
                img: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg',
            });
        } catch (error) {
            console.error('유저정보를 불러오는 데 실패했습니다', error);
        }
    }, [token]);

    // 최초 실행 시 유저 정보를 불러옴
    useEffect(() => {
        if (token) {
            fetchUserInfo();
        }
    }, [token, fetchUserInfo]);

    return {
        userInfo,
        setUserInfo,
        refetchUserInfo: fetchUserInfo,
    };
};
