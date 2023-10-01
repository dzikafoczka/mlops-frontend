import axios from "axios";
import { useEffect, useState } from "react";

import { backendConfig } from "@/config/backend";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useData } from "@/hooks/use-data-hook";
import { Project } from "@/types/project";

const Projects = () => {
    console.log("Projects");
    /**
     * Import backendConfig url and port for api requests
     */
    const { url, port } = backendConfig;

    /**
     * Fetch projects from backend
     */
    const data = useData();

    /**
     * Fetch projects from backend
     */
    useEffect(() => {
        let abortController = new AbortController();
        let signal = abortController.signal;

        (async () => {
            try {
                const response = await axios.get(`${url}:${port}/projects`, {
                    signal: signal,
                });

                data.setProjectsData(response.data as Project[]);
                
            } catch (error: any) {
                console.log(error.message);
            }
        })();

        return () => abortController.abort();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4 bg-gray-400 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {/* {projects.map((project: any) => (
                <div
                    key={project.id}
                    className="p-4 border border-gray-200 rounded-md"
                >
                    <h2 className="text-lg font-bold">{project.name}</h2>
                    <p className="text-sm text-gray-500">
                        {project.description}
                    </p>
                </div>
            ))} */}

            <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent overlay={false} side="left">
                    <SheetHeader>
                        <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Projects;
