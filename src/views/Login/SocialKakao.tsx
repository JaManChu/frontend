import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
export default function SocialKakao() {
    const navigate = useNavigate();
    const javaScriptKey = import.meta.env.VITE_JAVASCRIPT_KEY;
    useEffect(() => {
        if (window.Kakao) {
            window.Kakao.init(javaScriptKey); // App Key를 사용하여 초기화
        }
    }, [javaScriptKey]);
    const kakaoOnSuccess = async (data) => {
        const idToken = data.response.access_token;
        console.log(data);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`, {
                access_token: idToken,
                authProvider: 'kakao',
            });
            if (response.status === 200) {
                console.log(response.data);
                localStorage.setItem('kakao_access_token', JSON.stringify(response.data));
                navigate('/main');
            }
        } catch (err) {
            console.log(err);
            alert('로그인에 실패했습니다.');
        }
    };
    const kakaoOnFailure = (err) => {
        console.log(err);
    };
    return <KakaoLogin token={javaScriptKey} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure} />;
}
