import instance from '../utils/api/instance';
import { useNavigate } from 'react-router-dom';

export const useDeleteUser = () => {
    const navigate = useNavigate();
    const handleDeleteUser = async () => {
        try {
            const response = await instance.delete('/users');
            console.log('response.data : ', response.data);
            if (response.data.code === 'OK') {
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
