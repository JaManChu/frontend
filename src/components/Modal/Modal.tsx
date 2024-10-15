import React from 'react';
import { Dialog, DialogContent, DialogActions, Button } from '@mui/material';
interface ModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    buttons?: { label: string; onClick: () => void; disabled?: boolean }[];
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, children, buttons }) => {
    return (
        <Dialog open={visible} onClose={onClose} maxWidth="md" fullWidth>
            <DialogContent sx={{ height: '500' }}>
                {children} {/* 자식 요소들이 이곳에 렌더링됩니다. */}
            </DialogContent>
            <DialogActions>
                {buttons?.map((button, index) => (
                    <Button key={index} variant="contained" color="primary" onClick={button.onClick} disabled={button.disabled} sx={{ m: 1 }}>
                        {button.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
