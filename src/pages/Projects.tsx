import { cn } from "@/lib/utils";

import { LayoutDashboard, Plus, Search } from "lucide-react";
import { VscFolderActive } from "react-icons/vsc";

import { useSearchParams } from "react-router-dom";
import { useData } from "@/hooks/use-data-hook";

import ProjectCard from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-hook";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce-hook";
import Fuse from "fuse.js";
import Masonry from "react-masonry-css";
import { breakpointsMasonry } from "@/config/breakpoints";
import ProjectNoActive from "@/components/projects/project-messages/project-no-active";
import ProjectNoResults from "@/components/projects/project-messages/project-no-results";
import ProjectCardSkeleton from "@/components/projects/project-card-skeleton";

const Projects = () => {
    console.log("Projects");

    const data = useData();

    const { onOpen } = useModal();

    const [searchParams, setSearchParams] = useSearchParams();

    const isArchived = searchParams.get("archived") === "true";

    const [query, setQuery] = useState("");
    const debounceSearch = useDebounce(query, 250);

    const [projects, setProjects] = useState<React.ReactNode[] | null>(null);

    console.log("archived", isArchived);

    useEffect(() => {
        console.log("Projects useEffect");

        if (data.projects) {
            const filteredProjects = data.projects.filter((project) => {
                return project.archived === isArchived;
            });

            const fuseSearch = new Fuse(filteredProjects, {
                includeScore: true,
                minMatchCharLength: 1,
                threshold: 0.25,
                keys: ["title", "status", "description"],
            });

            debounceSearch === ""
                ? setProjects(
                      filteredProjects.map((project) => (
                          <ProjectCard key={project._id} project={project} />
                      ))
                  )
                : setProjects(
                      fuseSearch
                          .search(debounceSearch)
                          .map((result) => (
                              <ProjectCard
                                  key={result.item._id}
                                  project={result.item}
                              />
                          ))
                  );
        }
    }, [debounceSearch, data.projects, isArchived]);

    const addQueryToSearchParams = () => {
        setSearchParams((prev) => {
            prev.set("search", query);
            return prev;
        });
    };

    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addQueryToSearchParams();
        }
    };

    return (
        <>
            <div className="mb-4">
                <h1 className="mb-1 text-2xl font-semibold text-mlops-primary-tx dark:text-mlops-primary-tx-dark">
                    Projects dashboard
                </h1>
                <div className="flex items-center text-mlops-gray dark:text-zinc-400">
                    <p className="flex items-center text-sm font-semibold">
                        <LayoutDashboard className="flex-shrink-0 w-4 h-4 mr-1" />
                        Projects
                    </p>
                    <svg
                        className="w-[1.25rem] h-[1.25rem] flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                    </svg>
                    <p className="flex items-center text-sm font-semibold text-[#51678f] dark:text-zinc-300">
                        <LayoutDashboard className="flex-shrink-0 w-4 h-4 mr-1" />
                        Projects
                    </p>
                    {/* <svg
                    className="w-[1.25rem] h-[1.25rem] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                </svg>
                <p className="flex items-center text-sm font-semibold">
                    <VscProject className="flex-shrink-0 w-4 h-4 mr-1" />
                    Project
                </p>
                <svg
                    className="w-[1.25rem] h-[1.25rem] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                </svg>
                <p className="flex items-center text-sm font-semibold">
                    <AiOutlineExperiment className="flex-shrink-0 w-4 h-4 mr-1" />
                    Experiment
                </p>
                <svg
                    className="w-[1.25rem] h-[1.25rem] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                </svg>
                <p className="flex items-center text-sm font-semibold">
                    <GoIterations className="flex-shrink-0 w-4 h-4 mr-1" />
                    Iteration
                </p> */}
                </div>
            </div>
            <div className="text-base border-b-2 border-gray-200 dark:border-gray-700">
                <nav className="flex mb-[-2px]">
                    <a
                        href="#"
                        className={cn(
                            "group inline-flex items-center gap-2 px-4 py-2 font-medium text-gray-500 transition border-b-2 border-transparent rounded-t-md hover:bg-mlops-tabs-hover hover:text-mlops-primary-tx shrink-0 hover:border-gray-300 hover:dark:bg-[#a1a1aa22] hover:dark:text-mlops-primary-tx-dark hover:dark:border-mlops-primary-tx-dark/10",
                            !isArchived &&
                                "bg-white border-mlops-primary-tx text-mlops-primary-tx font-bold hover:bg-white hover:text-mlops-primary-tx hover:border-mlops-primary-tx dark:border-white dark:text-white dark:bg-mlops-nav-bg-dark hover:dark:border-white hover:dark:text-white hover:dark:bg-mlops-nav-bg-dark"
                        )}
                        onClick={() =>
                            setSearchParams(
                                (prev) => {
                                    prev.set("archived", "false");
                                    return prev;
                                },
                                { replace: true }
                            )
                        }
                    >
                        <VscFolderActive className="w-5 h-5" />
                        Active projects
                    </a>

                    <a
                        href="#"
                        className={cn(
                            "group inline-flex items-center gap-2 px-4 py-2 font-medium text-gray-500 transition border-b-2 border-transparent rounded-t-md hover:bg-mlops-tabs-hover hover:text-mlops-primary-tx shrink-0 hover:border-gray-300 hover:dark:bg-[#a1a1aa22] hover:dark:text-mlops-primary-tx-dark hover:dark:border-mlops-primary-tx-dark/10",
                            isArchived &&
                                "bg-white border-mlops-primary-tx text-mlops-primary-tx font-bold hover:bg-white hover:text-mlops-primary-tx hover:border-mlops-primary-tx dark:border-white dark:text-white dark:bg-mlops-nav-bg-dark hover:dark:border-white hover:dark:text-white hover:dark:bg-mlops-nav-bg-dark"
                        )}
                        onClick={() =>
                            setSearchParams(
                                (prev) => {
                                    prev.set("archived", "true");
                                    return prev;
                                },
                                { replace: true }
                            )
                        }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                            />
                        </svg>
                        Archive
                    </a>
                </nav>
            </div>
            {data.projects && data.projects.length > 0 && (
                <div className="flex items-center h-8 my-4 whitespace-nowrap">
                    <Button
                        variant="mlopsPrimary"
                        title="Create new project"
                        className="pt-1 pb-1 pl-2 pr-4 mr-3 h-9"
                        onClick={() => onOpen("createProject", {})}
                    >
                        <Plus className="flex-shrink-0 w-6 h-6 mr-1" /> New
                        project
                    </Button>

                    <Input
                        className="transition duration-300 text-md focus-visible:ring-mlops-primary-tx focus-visible:dark:ring-mlops-primary-tx-dark hover:border-mlops-primary-tx hover:dark:border-mlops-primary-tx-dark bg-[#a1a1aa25] hover:dark:bg-[#a1a1aa44] focus:dark:bg-[#a1a1aa44] hover:bg-[#a1a1aa20] focus:bg-[#a1a1aa20] border border-mlops-secondary-tx/25 focus:dark:border-mlops-primary-tx-dark focus:border-mlops-primary-tx w-[250px] h-9"
                        placeholder="Search in projects ..."
                        Icon={
                            <Search className="absolute flex-shrink-0 w-5 h-5 top-2 left-2 dark:text-mlops-primary-tx-dark text-mlops-primary-tx" />
                        }
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleOnKeyDown}
                    />
                </div>
            )}
            {data.projects && data.projects.length === 0 && <ProjectNoActive />}

            {data.projects &&
                data.projects.length !== 0 &&
                projects &&
                projects.length === 0 && <ProjectNoResults />}

            {data.projects &&
                data.projects.length !== 0 &&
                projects &&
                projects.length !== 0 && (
                    <Masonry
                        breakpointCols={breakpointsMasonry}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid-column"
                    >
                        {projects}
                    </Masonry>
                )}

            {!data.projects && (
                <Masonry
                    breakpointCols={breakpointsMasonry}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid-column"
                >
                    {[...Array(10).keys()].map((_, id) => (
                        <ProjectCardSkeleton key={id} />
                    ))}
                </Masonry>
            )}
        </>
    );
};

export default Projects;
