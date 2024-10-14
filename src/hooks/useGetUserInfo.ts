import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useGetUserInfo = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ email: '', nickname: '', img: '' });

    useEffect(() => {
        // if (!token) {
        //     navigate('/login');
        //     return;
        // } else {
        // }
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users`,

                    {
                        headers: {
                            'access-token': `Bearer ${token}`,
                        },
                        withCredentials: true,
                    },
                );
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
        };
        fetchUserInfo();
    }, [token, navigate]);

    return {
        userInfo,
        setUserInfo,
    };
};
