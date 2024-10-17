import instance from './instance';

const reissueToken = async () => {
    try {
        const response = await instance.get('/auth/token/refresh');
        console.log('**RefreshTOken', response);
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
