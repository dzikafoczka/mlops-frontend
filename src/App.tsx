import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ModalProvider from "./components/providers/modal-provider";

import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "@/components/error-boundary/fallbackRenderer";

import MainLayout from "@/layouts/main/layout";

import Projects from "@/pages/projects/Projects";
import Experiments from "@/pages/experiments/Experiments";

import Toast from "@/components/toast";
import { Toaster } from "@/components/ui/toaster";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <ModalProvider>
                    <ErrorBoundary fallbackRender={fallbackRender}>
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
                                <Route path='/projects/:project_id/experiments' element={<Experiments />} />
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
