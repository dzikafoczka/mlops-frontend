import React from "react";

import {
    CreateProjectModal,
    EditProjectModal,
    DeleteProjectModal,
    ArchiveRestoreProjectModal,
} from "@/components/modals/projects";
import CreateExperimentModal from "@/components/modals/experiments/create-experiment-modal";
import DeleteExperimentModal from "@/components/modals/experiments/delete-experiment-modal";
import EditExperimentModal from "@/components/modals/experiments/edit-experiment-modal";
import EditIterationModal from "../modals/iterations/edit-iteration-modal";
import DeleteIterationsModal from "../modals/iterations/delete-iterations-modal";
import DeleteModelModal from "../modals/models/delete-model-modal";
import CreateEmptyModelModal from "../modals/models/create-empty-model-modal";
import EditModelModal from "../modals/models/edit-model-modal";
import ArchiveRestoreModelModal from "../modals/models/archive-restore-model-modal";

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <CreateProjectModal />
            <EditProjectModal />
            <DeleteProjectModal />
            <ArchiveRestoreProjectModal />
            <CreateExperimentModal />
            <EditExperimentModal />
            <DeleteExperimentModal />
            <EditIterationModal />
            <DeleteIterationsModal />
            <CreateEmptyModelModal />
            <DeleteModelModal />
            <EditModelModal />
            <ArchiveRestoreModelModal />
        </>
    );
};

export default ModalProvider;
