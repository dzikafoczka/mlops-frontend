import { DataContext } from "@/hooks/data-context";
import { useState } from "react";

const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState(false);
    const updateState = () => {
        setData((prev) => {
            return !prev;
        });
    };
    return (
        <DataContext.Provider value={{ data, setData: updateState }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
