import { useDispatch } from 'react-redux';
import instance from '../utils/api/instance';
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../redux/reducer/userSlice';
export const useDeleteUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleDeleteUser = async () => {
        try {
            const response = await instance.delete('/users');
            console.log('response.data : ', response.data);
            if (response.data.code === 'OK') {
                dispatch(logoutSuccess());

                alert('탈퇴가 성공적으로 완료됐습니다.');
                navigate('/');
            }
        } catch (error) {
            console.error('회원탈퇴 에러:', error);
        }
    };
    return {
        handleDeleteUser,
    };
};
