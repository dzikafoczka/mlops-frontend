import { Experiment } from "@/types/experiment";

export type Project = {
    _id: string;
    title: string;
    description: string;
    status: "completed" | "not_started" | "in_progress";
    archived: boolean;
    created_at: Date;
    updated_at: Date;
    experiments: Experiment[];
};
