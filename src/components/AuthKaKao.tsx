// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AuthKaKao() {
    const navigate = useNavigate();

    // const code = new URL(window.location.href).searchParams.get('code');
    // console.log(code);

    // useEffect(() => {
    //     if (!code) {
    //         alert('카카오 인증에 실패했습니다.');
    //         return;
    //     }

    //     const fetch = async () => {
    //         console.log('code', code);

    //         try {
    //             const response: any = await axios.get(`${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`, {
    //                 params: { code: code },
    //             });
    //             console.log(response.data);

    //             if (response.code === 200) {
    //                 sessionStorage.setItem('kakaoToken', JSON.stringify(response.data));
    //                 navigate('/home');
    //             }
    //         } catch (err) {
    //             console.log(err);
    //             alert('로그인에 실패하였습니다.');
    //         }
    //     };
    //     fetch();
    // }, [code]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const nickname = params.get('nickname');

        if (token) {
            sessionStorage.setItem('token', token);
            if (nickname) {
                sessionStorage.setItem('nickname', nickname);
            }
            navigate('/home');
        }
    }, [navigate]);

    return (
        <div>
            <h1>로그인 중입니다.</h1>
        </div>
    );
}
