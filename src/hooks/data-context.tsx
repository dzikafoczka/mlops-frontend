import { createContext } from "react";

interface IDataContext {
    data: boolean;
    setData?: () => void;
}

const defaultData = {
    data: false,
};

export const DataContext = createContext<IDataContext>(defaultData);
