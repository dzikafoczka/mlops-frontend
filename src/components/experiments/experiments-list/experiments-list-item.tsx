import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Experiment } from "@/types/experiment";

interface ExperimentListItemProps {
    experiment: Experiment;
    handleCheckboxChange: (experiment_id: string) => void;
    handleCheckboxLabelClick: (experiment_id: string) => void;
}

const ExperimentListItem = ({
    experiment,
    handleCheckboxChange,
    handleCheckboxLabelClick,
}: ExperimentListItemProps) => {
    return (
        <div className={cn("flex items-center px-1 py-[2px] rounded mb-[2px]",
        experiment.checked && "dark:bg-zinc-300/20 bg-zinc-300/60")}>
            <Checkbox
                id={experiment.id}
                className="data-[state=checked]:bg-mlops-primary data-[state=checked]:dark:bg-mlops-primary data-[state=checked]:text-white focus-visible:ring-mlops-primary-tx focus-visible:dark:ring-mlops-primary-tx-dark hover:border-mlops-primary-tx hover:dark:border-mlops-primary-tx-dark bg-[#a1a1aa25] hover:dark:bg-[#a1a1aa44] focus:dark:bg-[#a1a1aa44] hover:bg-[#a1a1aa20] focus:bg-[#a1a1aa20] border border-mlops-secondary-tx/25 focus:dark:border-mlops-primary-tx-dark focus:border-mlops-primary-tx mr-1 transition duration-300"
                checked={experiment.checked}
                onClick={() => handleCheckboxChange(experiment.id)}
            />
            <span
                className="cursor-pointer text-md"
                onClick={() => handleCheckboxLabelClick(experiment.id)}
            >
                {experiment.name}
            </span>
        </div>
    );
};

export default ExperimentListItem;
