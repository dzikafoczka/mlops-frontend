import Breadcrumb from "@/components/breadcrumb";
import ExperimentList from "@/components/experiments/experiments-list/experiments-list";
import PageHeader from "@/components/page-header";
import ProjectDropdownActions from "@/components/projects/project-dropdown-actions";
import { useData } from "@/hooks/use-data-hook";
import { Project } from "@/types/project";
import {
    LayoutDashboard,
} from "lucide-react";
import { useEffect, useState } from "react";
import { VscProject } from "react-icons/vsc";
import { useParams, useSearchParams } from "react-router-dom";

const Experiments = () => {
    console.log("Experiments");
    const { project_id } = useParams();

    const [searchParams, setSearchParams] = useSearchParams({
        ne: "default",
        experiments: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const data = useData();

    const [projectData, setProjectData] = useState<null | undefined | Project>(
        null
    );

    useEffect(() => {
        console.log("useEffect");
        if (data.projects) {
            let foundProject = data.projects.find(
                (project) => project._id === project_id
            );

            if (!foundProject) {
                setProjectData(undefined);
            } else {
                const experiments_ids = foundProject.experiments.map(
                    (experiment) => experiment.id
                );

                let experiments = searchParams.get("experiments");

                let intersection: string[] = [];

                if (experiments) {
                    let searchParamsExperiments = experiments.split(",");
                    console.log(experiments);
                    intersection = experiments_ids.filter((id) =>
                        searchParamsExperiments.includes(id)
                    );
                }

                let activeExperiments: string[] = [];

                if (intersection.length > 0) {
                    foundProject.experiments = foundProject.experiments.map(
                        (experiment) => ({
                            ...experiment,
                            checked: intersection.includes(experiment.id),
                        })
                    );

                    setSearchParams(
                        (prev) => {
                            prev.set("experiments", intersection.join(","));
                            return prev;
                        },
                        { replace: true }
                    );

                    setProjectData(foundProject);
                } else {
                    foundProject.experiments = foundProject.experiments.map(
                        (experiment, index) => {
                            if (index === 0) {
                                activeExperiments.push(experiment.id);
                                return {
                                    ...experiment,
                                    checked: true,
                                };
                            }
                            return {
                                ...experiment,
                                checked: false,
                            };
                        }
                    );
                    if (activeExperiments.length > 0) {
                        setSearchParams(
                            (prev) => {
                                prev.set("experiments", activeExperiments[0]);
                                return prev;
                            },
                            { replace: true }
                        );
                    } else {
                        setSearchParams(
                            (prev) => {
                                prev.set("experiments", "none");
                                return prev;
                            },
                            { replace: true }
                        );
                    }
                    setProjectData(foundProject);
                }
            }
        }
    }, [data.projects, project_id]);

    const handleCheckboxChange = (experiment_id: string) => {
        let experiments = searchParams.get("experiments");

        if (experiments && projectData) {
            let searchParamsExperiments = experiments.split(",");

            if (
                searchParamsExperiments.length === 1 &&
                searchParamsExperiments[0] === experiment_id
            ) {
                return;
            }

            let updatedExperiments = projectData.experiments.map(
                (experiment) => {
                    if (experiment.id === experiment_id) {
                        return {
                            ...experiment,
                            checked: !experiment.checked,
                        };
                    }
                    return experiment;
                }
            );

            if (searchParamsExperiments.includes(experiment_id)) {
                searchParamsExperiments = searchParamsExperiments.filter(
                    (id) => id !== experiment_id
                );
            } else {
                searchParamsExperiments.push(experiment_id);
            }

            setSearchParams(
                (prev) => {
                    prev.set("experiments", searchParamsExperiments.join(","));
                    return prev;
                },
                { replace: true }
            );

            setProjectData((prevState) => {
                if (prevState) {
                    return {
                        ...prevState,
                        experiments: updatedExperiments,
                    };
                }
                return prevState;
            });
        }
    };

    const handleCheckboxLabelClick = (experiment_id: string) => {
        if (projectData) {
            let updatedExperiments = projectData.experiments.map(
                (experiment) => {
                    if (experiment.id === experiment_id) {
                        return {
                            ...experiment,
                            checked: true,
                        };
                    }
                    return {
                        ...experiment,
                        checked: false,
                    };
                }
            );

            setSearchParams(
                (prev) => {
                    prev.set("experiments", experiment_id);
                    return prev;
                },
                { replace: true }
            );

            setProjectData((prevState) => {
                if (prevState) {
                    return {
                        ...prevState,
                        experiments: updatedExperiments,
                    };
                }
                return prevState;
            });
        }
    };

    if (projectData === undefined) {
        return <div>Project not found.</div>;
    }

    if (projectData === null) {
        return <div>Loading data ...</div>;
    }

    return (
        <>
            <div className="mb-4">
                <PageHeader
                    title={projectData.title}
                    statusBadge={projectData.status}
                    archivedBadge={projectData.archived}
                    pin={projectData.pinned}
                    actionButton={
                        <ProjectDropdownActions
                            project={projectData}
                            setLoading={setIsLoading}
                        />
                    }
                />
                <Breadcrumb
                    items={[
                        {
                            name: "Projects",
                            Icon: LayoutDashboard,
                            href: "/projects",
                        },
                        {
                            name: projectData.title,
                            Icon: VscProject,
                        },
                    ]}
                />
            </div>
            <div className="flex">
                <ExperimentList
                    projectData={projectData}
                    handleCheckboxChange={handleCheckboxChange}
                    handleCheckboxLabelClick={handleCheckboxLabelClick}
                />
                <div className="flex flex-col">
                    Tutaj będą iteracje i inne fajne rzeczy
                </div>
            </div>
        </>
    );
};

export default Experiments;
