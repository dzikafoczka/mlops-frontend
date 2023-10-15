import { Project } from "@/types/project";
import ExperimentsListHeader from "./experiments-list-header";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "@/hooks/use-debounce-hook";
import ExperimentsListItem from "./experiments-list-item";
import Fuse from "fuse.js";

interface ExperimentListProps {
    projectData: Project;
    handleCheckboxChange: (experiment_id: string) => void;
    handleCheckboxLabelClick: (experiment_id: string) => void;
}

const ExperimentList = ({
    projectData,
    handleCheckboxChange,
    handleCheckboxLabelClick,
}: ExperimentListProps) => {
    /**
     * State for storing search query
     */
    const [query, setQuery] = useState("");

    /**
     * Custom debounceSearch hook for search query
     */
    const debounceSearch = useDebounce(query, 250);

    const fuseSearchExperiments = new Fuse(projectData.experiments, {
        includeScore: true,
        minMatchCharLength: 1,
        threshold: 0.25,
        keys: ["name"],
    });

    const experimentsList = () => {
        return debounceSearch === ""
            ? projectData.experiments.map((experiment) => (
                  <ExperimentsListItem
                      key={experiment.id}
                      experiment={experiment}
                      handleCheckboxChange={handleCheckboxChange}
                      handleCheckboxLabelClick={handleCheckboxLabelClick}
                  />
              ))
            : fuseSearchExperiments
                  .search(debounceSearch)
                  .map((result) => (
                      <ExperimentsListItem
                          key={result.item.id}
                          experiment={result.item}
                          handleCheckboxChange={handleCheckboxChange}
                          handleCheckboxLabelClick={handleCheckboxLabelClick}
                      />
                  ));
    };

    return (
        <div className="w-[250px]">
            <ExperimentsListHeader projectData={projectData} />
            <Input
                className="transition duration-300 text-md focus-visible:ring-mlops-primary-tx focus-visible:dark:ring-mlops-primary-tx-dark hover:border-mlops-primary-tx hover:dark:border-mlops-primary-tx-dark bg-[#a1a1aa25] hover:dark:bg-[#a1a1aa44] focus:dark:bg-[#a1a1aa44] hover:bg-[#a1a1aa20] focus:bg-[#a1a1aa20] border border-mlops-secondary-tx/25 focus:dark:border-mlops-primary-tx-dark focus:border-mlops-primary-tx min-w-[250px] w-full h-9 mb-1"
                placeholder="Search in experiments"
                Icon={
                    <Search className="absolute flex-shrink-0 w-5 h-5 top-2 left-2 dark:text-mlops-primary-tx-dark text-mlops-primary-tx" />
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex flex-col">{experimentsList()}</div>
        </div>
    );
};

export default ExperimentList;
