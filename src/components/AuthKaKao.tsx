import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AuthKaKao() {
    const navigate = useNavigate();
    const code = new URL(window.location.href).searchParams.get('code');
    console.log(code);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response: any = await axios.post(`${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`, {
                    code: code,
                    authProvider: 'kakao',
                });

                if (response.code === 200) {
                    localStorage.setItem('kakaoToken', JSON.stringify(response.data));
                    navigate('/main');
                }
            } catch (err) {
                console.log(err);
                alert('로그인에 실패하였습니다.');
            }
        };
        fetch();
    }, [code]);

    return (
        <div>
            <h1>로그인 중입니다.</h1>
        </div>
    );
}
