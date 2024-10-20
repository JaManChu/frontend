import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../redux/reducer/modalSlice';
import { RootState } from '../../redux/store/store';
import styled from 'styled-components';

interface ModalProps {
    isOpen: boolean;
    content: string;
    onConfirm?: () => void | null; // "확인" 버튼 클릭 시 실행할 함수
}

export default function Globalmodal() {
    const { isOpen, content, onConfirm }: ModalProps = useSelector((state: RootState) => state.modal);
    const dispatch = useDispatch();

    if (!isOpen) return;

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(); // onConfirm 함수 호출
        }
        dispatch(hideModal()); // 모달 닫기
    };

    return (
        <S_ModalOverlay onClick={() => dispatch(hideModal())}>
            <S_ModalContent onClick={(e) => e.stopPropagation()}>
                <S_ModalTitle>{content}</S_ModalTitle>
                <S_ModalButtonWrapper>
                    <S_CancelBtn onClick={() => dispatch(hideModal())}>취소</S_CancelBtn>
                    <S_CheckBtn onClick={handleConfirm}>확인</S_CheckBtn>
                </S_ModalButtonWrapper>
            </S_ModalContent>
        </S_ModalOverlay>
    );
}

const S_ModalOverlay = styled.section`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;
`;
const S_ModalContent = styled.div`
    min-width: 300px;
    width: auto;
    padding: 30px;
    font-size: 20px;
    background-color: #fff;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const S_ModalTitle = styled.p`
    margin: 20px;
`;
const S_ModalButtonWrapper = styled.span`
    display: flex;
    justify-content: flex-end;
    gap: 20px;
`;
const S_CheckBtn = styled.button`
    font-size: 16px;
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 8px;
    color: #fff;
    background-color: #ff6b6b;
    cursor: pointer;
`;
const S_CancelBtn = styled.button`
    font-size: 16px;
    width: 50px;
    height: 30px;
    border: none;
    border-radius: 8px;
    color: #fff;
    background-color: #0173f6;
    cursor: pointer;
`;
