import { useEffect, ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthToken from './useAuthToken';
import { useDispatch } from 'react-redux';
import { showModal } from '../redux/reducer/modalSlice';

export default function withAuth<P extends object>(Component: ComponentType<P>) {
    return function (props: P): JSX.Element {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const token = useAuthToken();

        useEffect(() => {
            if (!token) {
                dispatch(showModal({ isOpen: true, content: '로그인 후 이용 가능합니다.', onConfirm: null }));
                navigate('/login');
            }
        }, []);
        return <Component {...props} />;
    };
}
