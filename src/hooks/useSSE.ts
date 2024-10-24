import { useState, useEffect, useRef } from 'react';
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

    useEffect(() => {
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

        // 연결 - 유저당 "Alarm Init Message"
        eventSource.current.onopen = () => {
            console.log('Connection to SSE server stablished');
        };

        // 데이터 받아옴
        eventSource.current.onmessage = async (evt) => {
            const res = await evt.data;
            console.log('event data: ', res);
            const parsedData = JSON.parse(res);
            // 이벤트 중복체크
            setAlarmData((prev) => [{ ...prev }, parsedData]); // recipeId, comment, reviewer, createdAt
        };

        // 종료시 onerror로 처리
        eventSource.current.onerror = (err: any) => {
            console.log('SSE connection error', err);
            eventSource.current?.close();
            if (err.error) {
                // 에러 발생 시 할 일,
            }
        };

        return () => {
            eventSource.current?.close();
            console.log('Close SSE connection');
        };
    }, []);

    return { alarmData };
}
