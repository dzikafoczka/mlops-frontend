import { PinFilled } from "@/components/icons";

import ProjectCardHeaderActions from "./project-card-header/project-card-header-actions";

import { Project } from "@/types/project";

interface ProjectCardProps {
    project: Project;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectCardHeader = ({ project, setLoading }: ProjectCardProps) => {
    return (
        <div className="flex items-center justify-between mb-2 font-semibold">
            <span className="flex items-center mr-2 cursor-pointer text-mlops-primary-tx dark:text-mlops-primary-tx-dark hover:underline">
                {project.pinned && (
                    <PinFilled className="flex-shrink-0 w-5 h-5 mr-1 text-mlops-primary" />
                )}{" "}
                {project.title}
            </span>
            <ProjectCardHeaderActions
                project={project}
                setLoading={setLoading}
            />
        </div>
    );
};

export default ProjectCardHeader;
