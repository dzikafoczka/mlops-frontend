import { ProjectStatus } from "@/types/types";

export const projectStatusesMap = {
    completed: <p>Finished</p>,
    in_progress: <p>In&nbsp;progress</p>,
    not_started: <p>Not&nbsp;started</p>,
};

export const statuses = [
    ProjectStatus.NOT_STARTED,
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.FINISHED,
];