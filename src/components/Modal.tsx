import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div<{ visible: boolean }>`
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    width: 800px;
    height: 600px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: center;
`;

const ModalButton = styled.button`
    background-color: #f59910;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 20px;
    width: 100px;
`;

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
    return (
        <ModalWrapper visible={visible} onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {children}
                <ModalButton onClick={onClose}>취소</ModalButton>
            </ModalContent>
        </ModalWrapper>
    );
};

export default Modal;
