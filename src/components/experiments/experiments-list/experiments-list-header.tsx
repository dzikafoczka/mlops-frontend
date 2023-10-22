import { useModal } from "@/hooks/use-modal-hook";
import { cn } from "@/lib/utils";
import { Project } from "@/types/project";
import {
    ChevronLeftSquare,
    ChevronUpSquare,
    PlusCircle,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface ExperimentsListHeaderProps {
    projectData: Project;
}

const ExperimentsListHeader = ({ projectData }: ExperimentsListHeaderProps) => {
    const { onOpen } = useModal();

    const [searchParams, setSearchParams] = useSearchParams({
        el: "false",
    });

    const isCollapsed = searchParams.get("el") === "true";

    return (
        <div
            className={cn(
                "flex items-center justify-between mb-1 text-xl font-semibold",
                isCollapsed && "hidden"
            )}
        >
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
                    title={isCollapsed ? "Expand experiment list" : "Collapse experiment list"}
                    onClick={() => {
                        setSearchParams(
                            (prev) => {
                                prev.set("el", isCollapsed ? "false" : "true");
                                return prev;
                            },
                            { replace: true }
                        );
                    }}
                >
                    <ChevronLeftSquare className="hidden w-7 h-7 lg:block" />
                    <ChevronUpSquare className="block w-7 h-7 lg:hidden" />
                </div>
            </div>
        </div>
    );
};

export default ExperimentsListHeader;
