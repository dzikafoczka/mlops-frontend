import { Project } from "@/types/project";
import { create } from "zustand";

interface DataStore {
    projects: Project[];
    setProjectsData: (data: Project[]) => void;
    addProject: (project: Project) => void;
    deleteProject: (project_id: string) => void;
    updateProject: (project_id: string, project: Project) => void;
}

export const useData = create<DataStore>((set) => ({
    projects: [],
    setProjectsData: (data: Project[]) => set({ projects: data }),
    addProject: (project: Project) =>
        set((state) => ({ projects: [...state.projects, project] })),
    deleteProject: (project_id: string) =>
        set((state) => ({
            projects: [
                ...state.projects.filter((project) => project._id !== project_id),
            ],
        })),
    updateProject: (project_id: string, project: Project) =>
        set((state) => {
            const index = state.projects.findIndex(
                (project) => project._id === project_id
            );
            state.projects[index] = project;
            return { projects: state.projects };
        }),
}));
