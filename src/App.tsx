import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/components/providers/theme-provider";

import MainLayout from "@/layouts/main/layout";

import Projects from "@/pages/Projects";
import { useEffect } from "react";
import { useData } from "@/hooks/use-data-hook";
import axios from "axios";
import { backendConfig } from "@/config/backend";
import ModalProvider from "./components/providers/modal-provider";
import Toast from "./components/toast";
import { Toaster } from "./components/ui/toaster";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const fallbackRender = ({ error, resetErrorBoundary }: FallbackProps) => {
    return <p onClick={resetErrorBoundary}>{error.message}</p>;
};

function App() {
    console.log("App");

    return (
        <BrowserRouter>
            <ThemeProvider>
                <ModalProvider>
                    <ErrorBoundary
                        fallbackRender={fallbackRender}
                        onError={() => console.log("error")}
                    >
                        <MainLayout>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <Navigate
                                            replace={true}
                                            to="/projects"
                                        />
                                    }
                                />
                                <Route
                                    path="/projects"
                                    element={<Projects />}
                                />
                            </Routes>
                            <Toast />
                            <Toaster />
                        </MainLayout>
                    </ErrorBoundary>
                </ModalProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
