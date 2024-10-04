import { useState } from 'react';

export const useModal = () => {
    const [isNickModalVisible, setIsNickModalVisible] = useState(false);
    const [isPwModalVisible, setIsPwModalVisible] = useState(false);
    const [updateNick, setUpdateNick] = useState('');

    const handleNickClose = () => {
        setIsNickModalVisible(false);
    };

    const handlePwClose = () => {
        setIsPwModalVisible(false);
    };

    const handleNickUpdate = () => {
        console.log('닉네임수정 로직실행');
    };

    const handlePasswordUpdate = () => {
        console.log('비밀번호수정 로직실행');
    };

    return {
        isNickModalVisible,
        setIsNickModalVisible,
        isPwModalVisible,
        setIsPwModalVisible,
        handleNickClose,
        handlePwClose,
        handleNickUpdate,
        handlePasswordUpdate,
        updateNick,
        setUpdateNick,
    };
};
