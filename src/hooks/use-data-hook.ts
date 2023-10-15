import { create } from "zustand";

import { Project } from "@/types/project";
import { Experiment } from "@/types/experiment";

interface DataStore {
    projects: Project[] | null;
    setProjectsData: (data: Project[]) => void;
    addProject: (project: Project) => void;
    deleteProject: (project_id: string) => void;
    updateProject: (project_id: string, project: Project) => void;
    addExperiment: (project_id: string, experiment: Experiment) => void;
    deleteExperiment: (project_id: string, experiment_id: string) => void;
    updateExperiment: (
        project_id: string,
        experiment_id: string,
        experiment: Experiment
    ) => void;
}

export const useData = create<DataStore>((set) => ({
    projects: null,
    setProjectsData: (data: Project[]) => set({ projects: data }),
    addProject: (project: Project) =>
        set((state) => {
            if (state.projects) {
                return { projects: [...state.projects, project] };
            }
            return { projects: null };
        }),
    deleteProject: (project_id: string) =>
        set((state) => {
            if (state.projects) {
                return {
                    projects: [
                        ...state.projects.filter(
                            (project) => project._id !== project_id
                        ),
                    ],
                };
            }
            return { projects: null };
        }),
    updateProject: (project_id: string, project: Project) =>
        set((state) => {
            if (state.projects) {
                const index = state.projects.findIndex(
                    (project) => project._id === project_id
                );
                state.projects[index] = project;
                return { projects: [...state.projects] };
            }
            return { projects: null };
        }),
    addExperiment: (project_id: string, experiment: Experiment) => {
        set((state) => {
            if (state.projects) {
                const index = state.projects.findIndex(
                    (project) => project._id === project_id
                );

                if (index === -1) return state;

                state.projects[index].experiments.push(experiment);
                return { projects: [...state.projects] };
            }
            return { projects: null };
        });
    },
    deleteExperiment: (project_id: string, experiment_id: string) => {
        set((state) => {
            if (state.projects) {
                const index = state.projects.findIndex(
                    (project) => project._id === project_id
                );

                if (index === -1) return state;
                
                state.projects[index].experiments = state.projects[
                    index
                ].experiments.filter(
                    (experiment) => experiment.id !== experiment_id
                );
                return { projects: [...state.projects] };
            }
            return { projects: null };
        });
    },
    updateExperiment: (
        project_id: string,
        experiment_id: string,
        experiment: Experiment
    ) => {
        set((state) => {
            if (state.projects) {
                const index = state.projects.findIndex(
                    (project) => project._id === project_id
                );

                if (index === -1) return state;

                const experiment_index = state.projects[
                    index
                ].experiments.findIndex(
                    (experiment) => experiment.id === experiment_id
                );

                if (experiment_index === -1) return state;
                
                state.projects[index].experiments[experiment_index] =
                    experiment;
                return { projects: [...state.projects] };
            }
            return { projects: null };
        });
    },
}));
