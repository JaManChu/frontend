import { useState, useRef } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import useAuthToken from './useAuthToken';

export default function fetchSSE() {
    const [alarmData, setAlarmData] = useState<string[]>([]); // 서버가 푸쉬한 데이터 저장

    const EventSource = EventSourcePolyfill || NativeEventSource; // request header에 token을 보내기 위해 EventSourcePolyfill(EventSource는 header 수정불가)
    const eventSource = useRef<null | EventSourcePolyfill>(null); // 상태변화가 직접적으로 Ui에 영향을 주지 않아 useRef사용
    const token = useAuthToken();

    // 기존 연결이 있는 경우 해제
    if (eventSource.current) {
        eventSource.current.close();
    }

    // 새로운 EventSource생성
    eventSource.current = new EventSource(`${import.meta.env.VITE_BASE_URL}/notify`, {
        headers: {
            'access-token': `Bearer ${token}`,
        },
        withCredentials: true,
    });

    // 연결
    eventSource.current.onopen = () => {};

    // 데이터 받아옴
    eventSource.current.onmessage = async (evt) => {
        const res = await evt.data;
        console.log('event data: ', res);
        const parsedData = JSON.parse(res);
        // 이벤트 중복체크
        setAlarmData((prev) => [...prev, parsedData]); // recipeId, comment, reviewer, createdAt
    };

    // 종료시 onerror로 처리
    eventSource.current.onerror = (err: any) => {
        console.log(err);
        console.log('error 상태');
        eventSource.current?.close();
        if (err.error) {
            // 에러 발생 시 할 일
        }

        if (err.target.readyState === EventSource.CLOSED) {
            // 종료 시 할 일
        }
    };
    const closeConnection = () => {
        eventSource.current?.close();
        console.log('SSE 연결 종료');
    };

    return { alarmData, closeConnection };
}
// receipeName, message, rating, commentUser
// 유저당 초기에 1번만 "Alarm Init Message"
