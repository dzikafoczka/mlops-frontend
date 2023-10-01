import { mainNavigationItems, helpNavigationItems } from "@/config/navigation";

import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import SidebarNavItem from "@/components/navigation/sidebar/sidebar-nav-item";
import SectionSeparator from "@/components/navigation/section-separator";

const NavigationSidebar = () => {
    console.log("NavigationSidebar");

    const [searchParams, setSearchParams] = useSearchParams({
        ne: "default",
    });

    const isCollapsedLg = searchParams.get("ne") === "collapsed-lg";
    const isExpandedMd = searchParams.get("ne") === "expanded-md";

    return (
        <div
            className={cn(
                "hidden sm:flex flex-none flex-col items-center sm:w-[64px] lg:w-[280px] h-[calc(100vh-56px)] overflow-hidden dark:bg-mlops-nav-bg-dark bg-white shadow-md",
                isCollapsedLg && "lg:w-[64px]",
                isExpandedMd && "sm:w-[280px] sm:absolute lg:static"
            )}
        >
            <div className="w-full px-2">
                <SectionSeparator />
                <div className="flex flex-col items-center w-full gap-[6px] my-2">
                    {mainNavigationItems.map((item) => (
                        <SidebarNavItem
                            key={item.path}
                            path={item.path}
                            title={item.title}
                            Icon={item.icon}
                            collapsedLg={isCollapsedLg}
                            expandedMd={isExpandedMd}
                        />
                    ))}
                </div>
                <SectionSeparator />
                <div className="flex flex-col items-center w-full gap-[6px] my-2">
                    {helpNavigationItems.map((item) => (
                        <SidebarNavItem
                            key={item.path}
                            path={item.path}
                            title={item.title}
                            Icon={item.icon}
                            collapsedLg={isCollapsedLg}
                            expandedMd={isExpandedMd}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavigationSidebar;
