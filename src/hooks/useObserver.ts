import { useEffect, useRef } from 'react';

interface IntersectCallbackProps {
    (entry: IntersectionObserverEntry): void;
}
// 컴포넌트에서 정의되는 onIntersect 함수
export default function useObserver(onIntersect: IntersectCallbackProps) {
    const ref = useRef(null);

    // [entry] : intersectionObserverEntry 배열의 첫번째 요소로 관찰 대상자
    // observer: 콜백이 실행되는 intersectionObserver 인스텈스 참조
    const handleObserver: IntersectionObserverCallback = ([entry], observer) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            observer.observe(entry.target);
            onIntersect(entry);
        }
    };

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(handleObserver, { threshold: 0.6 });
        observer.observe(ref.current);

        return () => observer && observer.disconnect();
    }, [ref, handleObserver]);

    return ref;
}
