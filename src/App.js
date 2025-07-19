import React, { useContext } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/styles.css';

import MainLayout from './components/MainLayout';
import MailListTable from './components/tables/MailListTable';
import MailDetailPage from './components/MailDetailPage';
import StaffListTable from './components/tables/StaffListTable';
import ProjectTable from './components/tables/ProjectTable';
import UserManagement from './components/user/UserManagement';
import LoginPage from './components/user/LoginPage';

import { UserProvider, UserContext } from './components/tools/UserContext';

// 加载页面组件
function LoadingPage() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <CircularProgress />
        </Box>
    );
}

function AppRoutes() {
    const { user, isInitialized } = useContext(UserContext);

    // 如果还未初始化完成，显示加载页面
    if (!isInitialized) {
        return <LoadingPage />;
    }

    const isAuthenticated = !!user;

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/"
                element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
            >
                <Route index element={<MailListTable />} />
                <Route path="mails" element={<MailListTable />} />
                <Route path="mails/:msgid" element={<MailDetailPage />} />
                <Route path="staffs" element={<StaffListTable />} />
                <Route path="projects" element={<ProjectTable />} />
                <Route path="users" element={<UserManagement />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

function App() {
    return (
        <UserProvider>
            <Router>
                <AppRoutes />
            </Router>
        </UserProvider>
    );
}

export default App;