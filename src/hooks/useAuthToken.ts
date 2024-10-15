import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

export default function useAuthToken() {
    const token = useSelector((state: RootState) => state.user.value.token);

    return token;
}
