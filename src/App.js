import React from 'react';
import { Box } from '@mui/material';
import './styles/styles.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import MailListTable from './components/tables/MailListTable';
import MailDetailPage from './components/MailDetailPage';
import StaffListTable from './components/tables/StaffListTable';
import ProjectTable from './components/tables/ProjectTable';
import LoginPage from "./components/user/LoginPage";

function App() {
    // Add authentication state (you'll need to implement actual auth logic)
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    return (
        <Router>
            <Routes>
                {/* Public route */}
                <Route
                    path="/login"
                    element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
                />

                {/* Protected routes */}
                <Route
                    path="/"
                    element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
                >
                    <Route
                        index
                        element={isAuthenticated ? <MailListTable /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="mails"
                        element={
                            isAuthenticated ? (
                                <Box>
                                    <Box>
                                        <MailListTable />
                                    </Box>
                                </Box>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="mails/:msgid"
                        element={
                            isAuthenticated ? (
                                <Box>
                                    <Box>
                                        <MailDetailPage />
                                    </Box>
                                </Box>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="staffs"
                        element={
                            isAuthenticated ? (
                                <Box>
                                    <Box>
                                        <StaffListTable />
                                    </Box>
                                </Box>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="projects"
                        element={
                            isAuthenticated ? (
                                <Box>
                                    <Box>
                                        <ProjectTable />
                                    </Box>
                                </Box>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Route>

                {/* Redirect to login by default */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;