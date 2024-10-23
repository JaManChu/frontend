import instance from '../utils/api/instance';
import { useNavigate } from 'react-router-dom';
export const useDeleteUser = () => {
    const navigate = useNavigate();
    const handleDeleteUser = async () => {
        try {
            const response = await instance.delete('/users');
            console.log('response.data : ', response.data);
            if (response.data.code === 'OK') {
                // 회원 탈퇴 성공 시, 토큰 정보 초기화
                const persistData = sessionStorage.getItem('persist:root');
                if (persistData) {
                    // `persist:root` 데이터 파싱
                    const parsedData = JSON.parse(persistData);

                    // `user` 정보를 초기화
                    parsedData.user = JSON.stringify({
                        value: {
                            isLoggedIn: false,
                            token: null,
                        },
                    });

                    // 수정된 데이터를 다시 `sessionStorage`에 저장
                    sessionStorage.setItem('persist:root', JSON.stringify(parsedData));
                }

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
