import instance from '../../../utils/api/instance';
import { validateUserIfno } from '../../../utils/validation/validation';
import { useUserForm } from '../../../hooks/useUserForm';

export const useUserUpdate = (
    password: string,
    newPassword: string,
    passwordCheck: string,
    nickname: string,
    handleModalClose: () => void,
    refetchUserInfo: () => void,
) => {
    // const token = useAuthToken();

    const { setInputMessage } = useUserForm();

    const handleUpdate = async () => {
        const inputResult = validateUserIfno({ password, newPassword, passwordCheck, nickname });
        setInputMessage(inputResult);
        // email, password, passwordCheck, nickName 중 어느 하나라도 ''값이 아닌 경우 false 반환
        const hasErrors = Object.values(inputResult).some((result) => result !== '');
        // hasMessage가 false인 경우(모든 validation 통과한 경우)
        console.log('에러메세지들 : ', hasErrors);
        if (hasErrors) {
            alert('모든 필드값을 입력해주시기 바랍니다.');
            return;
        }

        try {
            const response = await instance.put(`/users`, {
                nickname: nickname,
                beforePassword: password,
                afterPassword: passwordCheck,
            });
            console.log('회원정보 수정 성공', response);
            console.log('response.data : ', response.data);
            alert('회원정보가 성공적으로 수정되었습니다.');

            //서버에서 받은 새로운 정보 상태 업데이트
            refetchUserInfo();
            handleModalClose();
        } catch (error) {
            console.error('회원정보 수정 실패', error);
            alert('회원정보 수정에 실패했습니다.');
        }
    };

    return {
        handleUpdate,
    };
};
