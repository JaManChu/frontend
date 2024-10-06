import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';

export default function SocialKakao(): JSX.Element {
    const navigate = useNavigate();

    const javaScriptKey = import.meta.env.VITE_JAVASCRIPT_KEY;
    const restApiKey = import.meta.env.VITE_REST_API_KEY;
    const redirectUri = import.meta.env.VITE_REDIRECT_URI;

    useEffect(() => {
        if (window.Kakao) {
            window.Kakao.init(restApiKey); // REST API Key로 초기화
        }
    }, [restApiKey]);

    // ? 프론트에서 토큰 발급해 보내주는 경우
    const kakaoOnSuccess = async (data: any) => {
        console.log('카카오 data 조회: ', data);
        const accessToken = data.response.access_token;
        try {
            console.log('try문 들어오는지 check');
            const response: any = await axios.post(`${import.meta.env.VITE_BASE_URL}/oauth2/authorization/kakao`, {
                access_token: accessToken,
                authProvider: 'kakao',
            });
            if (response.code == 200) {
                console.log(response);
                localStorage.setItem('kakaoToken', JSON.stringify(response.data));

                navigate('/main');
            }
        } catch (err) {
            console.log(err);
            alert('로그인에 실패했습니다.');
        }
    };

    const kakaoOnFailure = (err: any) => {
        console.log(err);
        console.log('카카오 접속 자체 실패');
    };

    // ? 인가코드만 보내는 경우
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
    const handleLogin = () => {
        window.location.href = kakaoURL;
    };

    return (
        <>
            <KakaoLogin token={javaScriptKey} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure} />
            <button onClick={handleLogin}>코드만 보내는 카카오 로그인</button>
        </>
    );
}
