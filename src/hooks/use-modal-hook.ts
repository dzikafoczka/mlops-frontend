import { create } from "zustand";

import { Project } from "@/types/project";
import { Experiment } from "@/types/experiment";

export type ModalType =
    | "createProject"
    | "editProject"
    | "deleteProject"
    | "archiveProject"
    | "restoreProject"
    | "createExperiment"
    | "editExperiment"
    | "deleteExperiment";

interface ModalData {
    project?: Project;
    experiment?: Experiment;
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
