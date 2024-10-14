// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AuthKaKao() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('access-token');
        const nickname = params.get('nickname');
        console.log(token, nickname);

        if (token && nickname) {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('nickname', nickname);

            navigate('/home');
        }
    }, [navigate]);

    return (
        <div>
            <h1>로그인 중입니다.</h1>
        </div>
    );
}
