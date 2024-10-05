import { useState } from 'react';
export const useModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    //추후 api연동
    const handleConfirm = () => {
        setIsModalVisible(false);
    };
    return {
        isModalVisible,
        openModal,
        closeModal,
        handleConfirm,
    };
};
