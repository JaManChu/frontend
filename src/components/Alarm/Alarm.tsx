import { Link } from 'react-router-dom';
import useSSE from '../../hooks/useSSE';
import styled from 'styled-components';

export default function Alarm() {
    const { alarmData, closeConnection } = useSSE();

    const handleAlarmClick = () => {
        closeConnection(); // 알람 클릭 시 연결 종료
    };

    return (
        <AlarmContainer>
            <h5>알람</h5>
            <AlarmList>
                {alarmData.map((data, idx) => (
                    <AlarmItem key={idx}>
                        <Link to="/">{data.message}</Link>
                    </AlarmItem>
                ))}
                <AlarmItem>
                    <AlarmItemText>
                        <span>nickname(reviewer)</span>
                        <span>새로운 댓글이 추가되었습니다</span>
                    </AlarmItemText>
                    <Link to="/" onClick={handleAlarmClick}>
                        확인
                    </Link>
                </AlarmItem>
            </AlarmList>
        </AlarmContainer>
    );
}

const AlarmContainer = styled.div`
    width: 300px;
    height: 400px;
    border: 1px solid lightgray;
    background-color: rgba(239, 182, 62, 0.5);
    border-radius: 16px;

    position: absolute;
    top: 70px;
    right: 0;
    z-index: 999;
    h5 {
        font-weight: 400;
        text-align: center;
    }

    &::before {
        // 툴팁
        content: '';
        position: absolute;
        top: -20px;
        right: 10%;
        border: 10px solid transparent;
        border-bottom: 10px solid rgba(239, 182, 62, 0.5);
    }
    &::after {
        // 툴팁 테두리
        content: '';
        position: absolute;
        top: -21px;
        right: 10%;
        border: 10px solid transparent;
        border-bottom: 10px solid lightgray;
        z-index: -1;
    }
`;

const AlarmList = styled.ul`
    list-style: none;
`;
const AlarmItem = styled.li`
    margin: 8px;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(169, 169, 169, 0.5);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    a {
        text-decoration: none;
        padding: 8px;
        border: 1px solid lightgray;
        border-radius: 8px;
        background-color: transparent;
        font-size: 12px;
        cursor: pointer;
    }
`;
const AlarmItemText = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
`;
