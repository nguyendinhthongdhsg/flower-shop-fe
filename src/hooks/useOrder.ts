import { create } from 'zustand';

interface orderStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useOrderModal = create<orderStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useOrderModal;
