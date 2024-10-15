import { useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthToken from './useAuthToken';

export default function withAuth<P extends object>(Component: ComponentType<P>) {
    return function (props: P): JSX.Element {
        const navigate = useNavigate();
        const token = useAuthToken();

        useEffect(() => {
            if (!token) {
                alert('로그인 후 이용 가능합니다.');
                navigate('/login');
            }
        }, []);
        return <Component {...props} />;
    };
}
