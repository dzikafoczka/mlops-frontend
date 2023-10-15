import { useModal } from "@/hooks/use-modal-hook";
import { Project } from "@/types/project";
import { ChevronLeftSquare, PlusCircle } from "lucide-react";

interface ExperimentsListHeaderProps {
    projectData: Project;
}

const ExperimentsListHeader = ({ projectData }: ExperimentsListHeaderProps) => {
    const { onOpen } = useModal();

    return (
        <h2 className="flex items-center justify-between mb-1 text-xl font-semibold">
            Experiments
            <div className="flex items-center dark:text-mlops-primary-tx-dark text-mlops-primary-tx gap-x-[2px]">
                <div
                    className="p-[2px] transition duration-300 dark:hover:bg-mlops-action-hover-bg-dark hover:bg-mlops-action-hover-bg rounded cursor-pointer"
                    title="Add experiment"
                    onClick={() =>
                        onOpen("createExperiment", {
                            project: projectData,
                        })
                    }
                >
                    <PlusCircle className="w-7 h-7" />
                </div>
                <div
                    className="p-[2px] transition duration-300 dark:hover:bg-mlops-action-hover-bg-dark hover:bg-mlops-action-hover-bg rounded cursor-pointer"
                    title="Add experiment"
                >
                    <ChevronLeftSquare className="w-7 h-7" />
                </div>
            </div>
        </h2>
    );
};

export default ExperimentsListHeader;
