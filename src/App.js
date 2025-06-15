import React from 'react';
import { CssBaseline, Container,Box } from '@mui/material';
import MailList from './components/MainLayout';
import './styles/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import MailListTable from './components/tables/MailListTable';
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                }}
              >
                <Box sx={{ width: '80%' }}>
                  <MailListTable />
                </Box>
              </Box>
            }
          />
          {/* <Route path="staffs" element={<StaffListPage />} />
          <Route path="projects" element={<ProjectListPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;