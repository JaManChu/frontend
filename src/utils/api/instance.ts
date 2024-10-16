import axios from 'axios';
import reissueToken from './reissueToken';
import { store } from '../../redux/store/store';
import { loginSuccess } from '../../redux/reducer/userSlice';

// 기본설정 (기본적인 request, response 가로채서 공통로직 처리)
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});

// 요청 인터셉터
instance.interceptors.request.use(
    // request 서버 전송 전 처리되는 코드로 config는 http 요청 시 사용할 설정과 데이터를 포함
    (config) => {
        const token = store.getState().user.value.token;
        if (!token) {
            return Promise.reject(new Error('No token')); // 요청을 중단 - api호출하는 컴포넌트에서는 err.message == 'No token'로 구분 가능 & if - else 조거문 필요 (예상하지 못한 error 발생시)
        }
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    // 요청 오류 발생 시 처리되는 코드
    (err) => {
        console.log(err);
        return Promise.reject(err);
    },
);

// 응답 인터셉터
instance.interceptors.response.use(
    // 액세스토큰 유효 -> 응답 반환
    (response) => {
        if (response.data.code == 200) {
            console.log('*instance* data.code가 200 : ', response);
        }
        console.log('#instance response#: ', response);
        return response;
    },

    // 에러 발생시
    async (err) => {
        console.log('*instance err - config 확인: *', err);
        console.log('#instance err.response : #', err.response);
        // 1. 액세스 토큰이 만료되었을때 - 재발급 후 기존 요청 재요청
        if (err.response && err.response?.status == 401) {
            const newAccessToken = await reissueToken();
            if (newAccessToken) {
                store.dispatch(loginSuccess({ isLoggedIn: true, token: newAccessToken, nickname: err.response.data.nickname }));
                err.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return instance(err.config); // 중단된 요청을 갱신된 토큰으로 재요청
            } else {
                // 재발급 실패 시 처리
                alert('액세스 토큰 재발급에 실패했습니다. 다시 로그인해주세요.');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        // 2. 리프레시 토큰이 만료되었을때
        if (err.response && err.response?.status == 410) {
            alert(`err.message: ', ${err.message}`);
            alert('다시 로그인 후 이용바랍니다.');
            window.location.href = '/login';
            return Promise.reject(err); // 요청 중단
        }

        // 3. 쿠키가 없을때
        if (err.response && err.response?.status === 404) {
            alert(`err.message: ', ${err.message}`);
            alert('인증정보가 없습니다. 로그인해주세요');
            window.location.href = '/login';
            return Promise.reject(err); // 요청 중단
        }

        // 4. 서버 오류 (500)
        if (err.response && err.response?.status >= 500) {
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
            return Promise.reject(err);
        }
    },
);

export default instance;
