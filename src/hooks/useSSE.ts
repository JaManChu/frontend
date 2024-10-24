import { useState, useEffect } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import useAuthToken from './useAuthToken';

interface SSEProps {
    recipeName: string;
    message: string;
    rating: number;
    commentUser: string;
}

export default function fetchSSE() {
    const [alarmData, setAlarmData] = useState<SSEProps[]>([]); // 서버가 푸쉬한 데이터 저장
    const token = useAuthToken();

    useEffect(() => {
        const EventSource = EventSourcePolyfill || NativeEventSource; // request header에 token을 보내기 위해 EventSourcePolyfill(EventSource는 header 수정불가)
        // 새로운 EventSource생성
        const eventSource = new EventSource(`${import.meta.env.VITE_BASE_URL}/notify`, {
            headers: {
                'access-token': `Bearer ${token}`,
            },
            withCredentials: true,
        });

        // 연결 - 유저당 "Alarm Init Message"
        eventSource.onopen = () => {
            console.log('Connection to SSE server stablished');
        };

        // 데이터 받아옴
        eventSource.onmessage = (evt) => {
            const res = evt.data;
            console.log('event data: ', res);
            const parsedData = JSON.parse(res);
            // 이벤트 중복체크
            setAlarmData((prev) => [...prev, parsedData]); // recipeId, comment, reviewer, createdAt
        };

        // 종료시 onerror로 처리
        eventSource.onerror = (err: any) => {
            console.log('SSE connection error', err);
            eventSource.close();
            if (err.error) {
                // 에러 발생 시 할 일,
            }
        };

        return () => {
            eventSource.close();
            console.log('Close SSE connection');
        };
    }, [token]);

    return { alarmData };
}
