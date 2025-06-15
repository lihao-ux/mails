import React from 'react';
import { CssBaseline, Container, Box } from '@mui/material';
import MailList from './components/MainLayout';
import './styles/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import MailListTable from './components/tables/MailListTable';
import MailDetailPage from './components/MailDetailPage';
// import StaffListPage from './pages/StaffListPage';
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
        path="mails/:mailId"
        element={
          <Box >
            <Box>
              <MailDetailPage />
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