import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ModalProvider from "./components/providers/modal-provider";
import { PrimeReactProvider } from "primereact/api";

import { ErrorBoundary } from "react-error-boundary";
import { fallbackRender } from "@/components/error-boundary/fallbackRenderer";

import MainLayout from "@/layouts/main/layout";

import Projects from "@/pages/projects/Projects";
import Experiments from "@/pages/experiments/Experiments";

import Toast from "@/components/toast";
import { Toaster } from "@/components/ui/toaster";
import Models from "./pages/models/Models";
import { Tailwind } from "./components/treeselect/treeselect-styles";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
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
                                    <Route
                                        path="/projects/:project_id/experiments"
                                        // @ts-ignore
                                        element={<Experiments />}
                                    />
                                    <Route
                                        path="/models"
                                        element={<Models />}
                                    />
                                </Routes>
                                <Toast />
                                <Toaster />
                            </MainLayout>
                        </ErrorBoundary>
                    </ModalProvider>
                </PrimeReactProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
