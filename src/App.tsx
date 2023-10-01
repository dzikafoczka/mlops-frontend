import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ThemeProvider } from "@/components/providers/theme-provider";
import DataProvider from "@/components/providers/data-provider";

import MainLayout from "@/layouts/main/layout";

import Projects from "@/pages/Projects";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <DataProvider>
                    <MainLayout>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate replace={true} to="/projects" />
                                }
                            />
                            <Route path="/projects" element={<Projects />} />
                        </Routes>
                    </MainLayout>
                </DataProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
