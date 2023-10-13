import NavigationSidebar from "@/components/navigation/sidebar/navigation-sidebar";
import NavigationTopbar from "@/components/navigation/topbar/navigation-topbar";
import { backendConfig } from "@/config/backend";
import { useData } from "@/hooks/use-data-hook";
import { sleep } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Skeleton } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    console.log("MainLayout");

    const { showBoundary } = useErrorBoundary();

    /**
     * Import backendConfig url and port for api requests
     */
    const { url, port } = backendConfig;

    const data = useData();

    /**
     * Fetch projects from backend
     */
    useEffect(() => {
        let abortController = new AbortController();
        let signal = abortController.signal;

        (async () => {
            try {
                await sleep(10000);
                const response = await axios.get(`${url}:${port}/projects`, {
                    signal: signal,
                });
                data.setProjectsData(response.data);
                // data.setProjectsData([]);
            } catch (error: any) {
                console.log(error);
                if (!abortController.signal.aborted) {
                    showBoundary(error);
                }
            }
        })();

        return () => abortController.abort();
    }, []);

    const [searchParams, setSearchParams] = useSearchParams({
        ne: "default",
    });

    const isCollapsedLg = searchParams.get("ne") === "collapsed-lg";
    const isExpandedMd = searchParams.get("ne") === "expanded-md";

    return (
        <div className="flex flex-col w-full">
            <NavigationTopbar />
            <div className="flex flex-shrink-0 flex-grow-0 w-full mt-[56px]">
                <NavigationSidebar />
                <main
                    className={cn(
                        "w-full p-5 ml-0 sm:ml-[64px] lg:ml-[280px] min-h-[calc(100vh-56px)]",
                        isCollapsedLg && "lg:ml-[64px]",
                        isExpandedMd && "sm:ml-[64px]"
                    )}
                >
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
