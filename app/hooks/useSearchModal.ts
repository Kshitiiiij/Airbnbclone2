import {create} from 'zustand';

interface searchModalState {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const usesearchModal = create<searchModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default usesearchModal