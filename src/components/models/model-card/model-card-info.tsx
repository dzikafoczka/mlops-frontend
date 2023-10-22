import { Iteration } from "@/types/iteration";
import { GoIterations } from "react-icons/go";

interface ModelCardInfoProps {
    iteration?: Iteration;
}

const ModelCardInfo = ({ iteration }: ModelCardInfoProps) => {
    const IterationBlock = () => {
        if (!iteration) {
            return (
                <span className="text-sm text-zinc-400">Model is empty.</span>
            );
        }
        return (
            <span className="text-sm font-semibold">
                Based on model from <a className="italic cursor-pointer hover:underline" href="#">{iteration.iteration_name}</a> iteration.
            </span>
        );
    };

    return (
        <>
            <div className="flex items-center mb-2">
                <GoIterations className="flex-shrink-0 w-5 h-5 mr-1 text-mlops-secondary-tx dark:text-[#D5D5D5]" />
                {IterationBlock()}
            </div>
        </>
    );
};

export default ModelCardInfo;
