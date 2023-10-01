// import { Iteration } from "@/types/iteration";

export type Experiment = {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    project_id: string;
    // iterations: Iteration[];
};
