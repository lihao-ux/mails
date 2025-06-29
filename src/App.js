import React from 'react';
import { CssBaseline, Container, Box } from '@mui/material';
import MailList from './components/MainLayout';
import './styles/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import MailListTable from './components/tables/MailListTable';
import MailDetailPage from './components/MailDetailPage';
import StaffListTable from './components/tables/StaffListTable';
import ProjectTable from './components/tables/ProjectTable';

// import ProjectListPage from './pages/ProjectListPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MailListTable />} />
          <Route
            path="mails"
            element={
              <Box>
                <Box>
                  <MailListTable />
                </Box>
              </Box>
            }
          />
          {/* 添加邮件详情页路由 */}
          <Route
            path="mails/:msgid"
            element={
              <Box >
                <Box>
                  <MailDetailPage />
                </Box>
              </Box>
            }
          />
          <Route
            path="staffs"
            element={
              <Box >
                <Box>
                  <StaffListTable />
                </Box>
              </Box>
            }
          />
          <Route
            path="projects"
            element={
              <Box >
                <Box>
                  <ProjectTable />
                </Box>
              </Box>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;