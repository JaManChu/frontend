import { useState, useEffect } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import useAuthToken from '../hooks/useAuthToken';

interface SSEProps {
    recipeName: string;
    message: string;
    rating: number;
    commentUser: string;
}

export default function fetchSSEHandler() {
    const [alarmData, setAlarmData] = useState<SSEProps[]>([]); // 서버가 푸쉬한 데이터 저장
    const token = useAuthToken();
    let eventSource: EventSource | null = null;

    useEffect(() => {
        if (token) {
            fetchSSE();
        }
        return () => {
            if (eventSource) {
                eventSource.close();
                console.log('Close SSE connection');
            }
        };
    }, [token]);

    const fetchSSE = () => {
        const EventSource = EventSourcePolyfill || NativeEventSource; // request header에 token을 보내기 위해 EventSourcePolyfill(EventSource는 header 수정불가)
        // 새로운 EventSource생성
        eventSource = new EventSource(`${import.meta.env.VITE_BASE_URL}/notify`, {
            headers: {
                'access-token': `Bearer ${token}`,
            },
            withCredentials: true,
        });

        // 연결 -> 최초 연결시 "Alarm Init Message" -> 랜더 금지?
        eventSource.onopen = () => {
            console.log('Connection to SSE server stablished');
        };

        // 데이터 받아옴
        eventSource.onmessage = (evt) => {
            const res = evt.data;
            console.log('event data: ', res);

            try {
                const parsedData = JSON.parse(res);
                setAlarmData((prev) => [...prev, parsedData]); // recipeId, comment, reviewer, createdAt
            } catch (error) {
                console.log('first message: ', res);
            }
        };

        // 종료시 onerror로 처리
        eventSource.onerror = (err: any) => {
            console.log('SSE connection error', err);
            if (eventSource) {
                eventSource.close();
            }
        };
    };

    return { alarmData };
}
