export interface Iteration {
    id: string;
    iteration_name: string;
    parameters: object;
    metrics: object;
    model_name: string;
    path_to_model: string;
    user_name: string;
    dataset?: number;
    created_at: Date;
    updated_at: Date;
}
