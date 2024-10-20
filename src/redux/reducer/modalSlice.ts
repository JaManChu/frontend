import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalActionState {
    isOpen: boolean;
    content: string;
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: { isOpen: false, content: '' } as ModalActionState,
    reducers: {
        showModal: (state, action: PayloadAction<ModalActionState>) => {
            const { content } = action.payload;
            state.isOpen = true;
            state.content = content;
        },
        hideModal: (state) => {
            state.isOpen = false;
            state.content = '';
        },
    },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
