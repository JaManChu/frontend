import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducer/userSlice';

export default function AuthKaKao() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('access-token');
        const nickname = params.get('nickname');
        const provider = params.get('provider');
        console.log(token, nickname);

        if (token && nickname) {
            dispatch(loginSuccess({ isLoggedIn: true, token: token, nickname: nickname, provider: provider }));
            navigate('/');
        }
    }, [navigate]);

    return (
        <div>
            <h1>로그인 중입니다.</h1>
        </div>
    );
}
