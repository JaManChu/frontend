import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';

export default function SocialKakao(): JSX.Element {
    const navigate = useNavigate();
    const restApiKey = import.meta.env.VITE_REST_API_KEY; // REST API 키로 변경
    useEffect(() => {
        if (window.Kakao) {
            window.Kakao.init(restApiKey); // REST API Key로 초기화
        }
    }, [restApiKey]);

    const kakaoOnSuccess = async (data: any) => {
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

    const kakaoOnFailure = (err: any) => {
        console.log(err);
    };

    return <KakaoLogin token={restApiKey} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure} />;
}
