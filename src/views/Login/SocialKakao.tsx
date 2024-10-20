import KakaoBtn from '../../assets/img/kakao_login_large_wide.png';
import styled from 'styled-components';

export default function SocialKakao(): JSX.Element {
    const restApiKey = import.meta.env.VITE_REST_API_KEY;

    //  백엔드에서 처리하기 때문에 redirectUri 백엔드로 설정
    const handleLogin = () => {
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${
            import.meta.env.VITE_BASE_URL
        }/users/login/auth/kakao&response_type=code`;
        console.log('kakaoAuthUrl: ', kakaoAuthUrl);
        window.location.href = kakaoAuthUrl;
    };

    return (
        <>
            <Btn onClick={handleLogin}>
                <img src={KakaoBtn} alt="Kakao-Btn" />
            </Btn>
        </>
    );
}

const Btn = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    &:hover {
        cursor: pointer;
    }
    img {
        height: 40px;
    }
`;
