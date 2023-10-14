import { create } from "zustand";

import { Project } from "@/types/project";

export type ModalType =
    | "createProject"
    | "editProject"
    | "deleteProject"
    | "archiveProject"
    | "restoreProject";

interface ModalData {
    project?: Project;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false, data: {} }),
}));
