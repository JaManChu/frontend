import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

export default function useAuthToken() {
    const token = useSelector((state: RootState) => state.user.value.token);
    console.log('token나오는지 확인', token);

    return token;
}
