import instance from './instance';
import { store } from '../../redux/store/store';

const reissueToken = async () => {
    try {
        const token = store.getState().user.value.token; // 기존 토큰 가져오기
        const response = await instance.get('/auth/token/refresh', {
            headers: {
                'access-token': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('문제야...:', response);

        if (response.data.code == 'OK') {
            const token = response.headers['access-token'];
            const accessToken = token?.replace('Bearer ', '');

            return accessToken;
        }
    } catch (err: any) {
        console.log('reissue access token error', err);
        console.log('reissue access erro.response:', err.response);
    }
};

export default reissueToken;
