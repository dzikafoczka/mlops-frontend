import { Project } from "@/types/project";
import { create } from "zustand";

interface DataStore {
    projects: Project[] | null;
    setProjectsData: (data: Project[]) => void;
    addProject: (project: Project) => void;
    deleteProject: (project_id: string) => void;
    updateProject: (project_id: string, project: Project) => void;
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
}));
