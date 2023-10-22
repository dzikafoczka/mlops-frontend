import { cn } from "@/lib/utils";
import {
    ChevronDownSquare,
    ChevronRightSquare,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface ExperimentHeaderProps {
    title: string;
    description: string;
}

const ExperimentHeader = ({ title, description }: ExperimentHeaderProps) => {
    const [searchParams, setSearchParams] = useSearchParams({
        el: "false",
    });

    const isCollapsed = searchParams.get("el") === "true";

    return (
        <div className="mb-3">
            <div className={cn(
                "flex items-center",
                isCollapsed && "justify-between lg:justify-normal flex-row-reverse lg:flex-row"
            )}>
                <div
                    className={cn(
                        "p-[2px] transition duration-300 dark:hover:bg-mlops-action-hover-bg-dark hover:bg-mlops-action-hover-bg rounded cursor-pointer mr-1 text-mlops-primary-tx dark:text-mlops-primary-tx-dark",
                        !isCollapsed && "hidden"
                    )}
                    title={
                        isCollapsed
                            ? "Expand experiment list"
                            : "Collapse experiment list"
                    }
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
                    <ChevronRightSquare className="hidden w-7 h-7 lg:block" />
                    <ChevronDownSquare className="block w-7 h-7 lg:hidden" />
                </div>
                <h2 className="text-2xl font-semibold">{title}</h2>
            </div>
            {description !== "" ? (
                <p>{description}</p>
            ) : (
                <p className="text-sm text-zinc-400">
                    No experiment description.
                </p>
            )}
        </div>
    );
};

export default ExperimentHeader;
