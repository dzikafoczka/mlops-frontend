import NavigationSidebar from "@/components/navigation/sidebar/navigation-sidebar";
import NavigationTopbar from "@/components/navigation/topbar/navigation-topbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    console.log("MainLayout");
    return (
        <div className="flex flex-col w-full">
            <NavigationTopbar />
            <div className="flex w-full">
                <NavigationSidebar />
                <main className="w-full">{children}</main>
            </div>
        </div>
    );
};

export default MainLayout;
