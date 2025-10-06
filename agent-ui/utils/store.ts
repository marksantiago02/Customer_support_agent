import { create } from "zustand";

interface showView {
  show: boolean;
  id: string;
}

interface BearState {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  showView: showView;
  setShowView: (showView: showView) => void;
}

const useStore = create<BearState>()((set) => ({
  showModal: false,
  setShowModal: (showModal) => set({ showModal }),
  showView: { show: false, id: "" },
  setShowView: (showView) => set({ showView }),
}));

export default useStore;
