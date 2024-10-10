import { useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

export default function withAuth<P extends JSX.IntrinsicAttributes>(Component: ComponentType<P>) {
    return function (props: P) {
        const navigate = useNavigate();

        useEffect(() => {
            if (!sessionStorage.getItem('token')) {
                alert('로그인 후 이용 가능합니다.');
                navigate('/');
            }
        }, []);
        return <Component {...props} />;
    };
}
