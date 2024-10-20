import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalActionState {
    isOpen: boolean;
    content: string;
    onConfirm: any;
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: { isOpen: false, content: '', onConfirm: null } as ModalActionState,
    reducers: {
        showModal: (state, action: PayloadAction<ModalActionState>) => {
            const { content, onConfirm } = action.payload;
            state.isOpen = true;
            state.content = content;
            state.onConfirm = onConfirm;
        },
        hideModal: (state) => {
            state.isOpen = false;
            state.content = '';
            state.onConfirm = null;
        },
    },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
