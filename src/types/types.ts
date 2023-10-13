import { Project } from "./project";

export interface ProjectData {
    _id: string;
    title: string;
    status: "completed" | "in_progress" | "not_started";
    experiments_count: number;
    iterations_count: number;
}

export interface ExperimentData {
    id: string;
    name: string;
    project_id: string;
    project_title: string;
    iterations_count: number;
}

export interface IterationData {
    id: string;
    iteration_name: string;
    experiment_id: string;
    experiment_name: string;
    project_id: string;
    project_title: string;
}

export interface IconProps {
    className?: string;
}

export interface ProjectQuickAction {
    project: Project;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    ItemType: any;
    SubItemType?: any;
}

export enum ProjectStatus {
    FINISHED = "completed",
    IN_PROGRESS = "in_progress",
    NOT_STARTED = "not_started"
}