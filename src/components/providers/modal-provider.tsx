import React from "react";

import {
    CreateProjectModal,
    EditProjectModal,
    DeleteProjectModal,
    ArchiveRestoreProjectModal,
} from "@/components/modals/projects";
import CreateExperimentModal from "../modals/experiments/create-experiment-modal";

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <CreateProjectModal />
            <EditProjectModal />
            <DeleteProjectModal />
            <ArchiveRestoreProjectModal />
            <CreateExperimentModal />
        </>
    );
};

export default ModalProvider;
