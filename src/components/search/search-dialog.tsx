import { useState } from "react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Search } from "lucide-react";

import Kbd from "@/components/kbd";

import { cn } from "@/lib/utils";
import { useData } from "@/hooks/use-data-hook";

const SearchDialog = () => {
    console.log("SearchDialog");
    const [open, setOpen] = useState(false);
    const data = useData();

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="mx-4 flex-grow whitespace-nowrap items-center px-2 py-1 transition text-mlops-secondary-tx rounded-lg group gap-x-2 h-[40px] max-w-[300px] group bg-[#a1a1aa25] hover:dark:bg-[#a1a1aa44] hover:bg-[#a1a1aa20] duration-300 border border-mlops-secondary-tx/25 overflow-hidden hidden sm:flex"
            >
                <Search className="w-5 h-5 dark:text-mlops-primary-tx-dark text-mlops-primary-tx" />
                <p className="overflow-hidden font-medium transition duration-300 overflow-ellipsis text-md text-zinc-500 dark:text-zinc-400 group-hover:text-mlops-primary-tx dark:group-hover:text-mlops-primary-tx-dark">
                    Quick search ...
                </p>
                <Kbd>
                    <span>CTRL+K</span>
                </Kbd>
            </button>

            <div
                className="flex items-center w-10 h-10 rounded cursor-pointer dark:hover:bg-mlops-action-hover-bg-dark hover:bg-mlops-action-hover-bg sm:hidden"
                onClick={() => setOpen(true)}
            >
                <div className={cn("p-[6px]")}>
                    <Search
                        className={cn(
                            "w-7 h-7 text-mlops-primary-tx dark:text-mlops-primary-tx-dark"
                        )}
                    />
                </div>
            </div>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    placeholder="Search database ..."
                    className="overflow-hidden overflow-ellipsis"
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Projects">
                        {data.projects.map((project) => (
                            <CommandItem key={project._id}>
                                {project.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Experiments">
                        {data.projects.map((project) => {
                            return project.experiments.map((experiment) => (
                                <CommandItem key={experiment.id}>
                                    {experiment.name}
                                </CommandItem>
                            ));
                        })}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};

export default SearchDialog;
