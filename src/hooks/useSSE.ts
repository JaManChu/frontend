import { useState, useEffect, useRef } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

export default function useSSE() {
    // stompjs sockjs
    const [alarmData, setAlarmData] = useState<string[]>([]); // 서버가 푸쉬한 데이터 저장

    const EventSource = EventSourcePolyfill || NativeEventSource; // request header에 token을 보내기 위해 EventSourcePolyfill
    const eventSource = useRef<null | EventSourcePolyfill>(null); // 상태변화가 직접적으로 Ui에 영향을 주지 않아 useRef사용

    useEffect(() => {
        const fetchSSE = () => {
            // 새로운 EventSource생성
            eventSource.current = new EventSource(`${import.meta.env.VITE_BASE_URL}/notify`, {
                headers: {
                    'access-token': `Bearer ${sessionStorage.getItem('token')}`,
                },
                withCredentials: true,
            });

            // 연결
            eventSource.current.onopen = () => {
                console.log('연결상태');
            };

            // 데이터 받아옴
            eventSource.current.onmessage = (evt) => {
                console.log('event data: ', evt.data);
                const parsedData = JSON.parse(evt.data);
                setAlarmData((prev) => [...prev, parsedData]); // recipeId, comment, reviewer, createdAt
            };

            // 종료시 onerror로 처리
            eventSource.current.onerror = (err: any) => {
                console.log(err);
                console.log('error 상태');
                eventSource.current?.close(); // err이면 종료

                setTimeout(fetchSSE, 5000); // 재연결
            };
        };

        fetchSSE();

        return () => {
            eventSource.current?.close();
        };
    }, []);

    const closeConnection = () => {
        eventSource.current?.close();
        console.log('SSE 연결 종료');
    };

    return { alarmData, closeConnection };
}
