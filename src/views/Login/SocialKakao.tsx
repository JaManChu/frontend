export default function SocialKakao(): JSX.Element {
    const restApiKey = import.meta.env.VITE_REST_API_KEY;

    // useEffect(() => {
    //     if (window.Kakao) {
    //         window.Kakao.init(restApiKey); // REST API Key로 초기화
    //     }
    // }, [restApiKey]);

    //  인가코드만 보내는 경우
    // const redirectUri = import.meta.env.VITE_REDIRECT_URI;
    // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
    // const handleLogin = () => {
    //     window.location.href = kakaoURL;
    // };

    // ? 백엔드에서 처리하는 경우 : redirectUri 백엔드로 설정
    const handleLogin = () => {
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${
            import.meta.env.VITE_BASE_URL
        }/users/login/auth/kakao&response_type=code`;
        console.log('kakaoAuthUrl: ', kakaoAuthUrl);
        window.location.href = kakaoAuthUrl;
    };

    return (
        <>
            <button onClick={handleLogin}>코드만 보내는 카카오 로그인</button>
        </>
    );
}
