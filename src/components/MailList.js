import React, { useState } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputAdornment, Button, Stack, Tabs, Tab } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MailListTable from './tables/MailListTable';
import StaffListTable from './tables/StaffListTable';
import MailDetailDialog from './MailDetailDialog'; // 导入封装好的对话框组件
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
const MailListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMail, setSelectedMail] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailTab, setDetailTab] = useState(0);
  const [currentPage, setCurrentPage] = useState('メール一覧'); // 当前页面状态

  const mails = [
    { id: 1, status: '1', category: '人材情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
    { id: 2, status: '2', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
    { id: 3, status: '3', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
    { id: 4, status: '①', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' }
    // ... 其他邮件数据
  ];
  const [staffs, setStaffs] = useState([
    { id: 1, staffName: '山田太郎', status: '1', staffAge: 25, skills: 'Java', workDate: '2025/06/13', desiredSalary: '84000円', aiRecommendedProjects: 'xxxxxxxx' },
    { id: 2, staffName: '山田太郎', status: '1', staffAge: 25, skills: 'Java', workDate: '2025/06/13', desiredSalary: '84000円', aiRecommendedProjects: 'xxxxxxxx' },
    { id: 3, staffName: '山田太郎', status: '1', staffAge: 25, skills: 'Java', workDate: '2025/06/13', desiredSalary: '84000円', aiRecommendedProjects: 'xxxxxxxx' },
    { id: 4, staffName: '山田太郎', status: '1', staffAge: 25, skills: 'Java', workDate: '2025/06/13', desiredSalary: '84000円', aiRecommendedProjects: 'xxxxxxxx' },
    { id: 5, staffName: '山田太郎', status: '1', staffAge: 25, skills: 'Java', workDate: '2025/06/13', desiredSalary: '84000円', aiRecommendedProjects: 'xxxxxxxx' }
  ]);

  const handleDetailClick = (mail) => {
    setSelectedMail(mail);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDetailTabChange = (event, newValue) => {
    setDetailTab(newValue);
  };
  const handleStatusChange = (staffId, newStatus) => {
    setStaffs(prevStaffs =>
      prevStaffs.map(staff =>
        staff.id === staffId ? { ...staff, status: newStatus } : staff
      )
    );
  };
  const handlePageChange = (event, newValue) => {
    setCurrentPage(newValue);
  };
  const tabSx = {
    fontWeight: 'bold', minWidth: 'auto', padding: '12px 24px', backgroundColor: 'transparent',
    '&.Mui-selected': {
      color: '#32cd32',
      backgroundColor: 'transparent',
    },
  };
  return (
    <Box>
      {/* 顶部导航栏 */}
      <Box sx={{
        borderBottom: 1,
        borderColor: 'divider',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        mb: 2
      }}>
        <Tabs
          value={currentPage}
          onChange={handlePageChange}
          indicatorColor="primary"
          textColor="primary"
          TabIndicatorProps={{ style: { backgroundColor: '#32cd32' } }} // 浅绿色横线
        >
          <Tab
            value="メール一覧"
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <AttachEmailOutlinedIcon fontSize="small" />
                <span>メール一覧</span>
              </Stack>
            }
            sx={tabSx}
          />
          <Tab
            value="人材情報"
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <PermIdentityOutlinedIcon fontSize="small" />
                <span>人材情報</span>
              </Stack>
            }
            sx={tabSx}
          />
          <Tab
            value="案件情報"
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <DescriptionOutlinedIcon fontSize="small" />
                <span>案件情報</span>
              </Stack>
            }
            sx={tabSx}
          />
        </Tabs>
      </Box>
      {/* 搜索框 */}
      <Box sx={{
        mb: 2,
        p: 2,
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0'
      }}>
        {currentPage === "メール一覧" && (<TextField
          fullWidth
          placeholder="送信者または件名で検索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: 1
            }
          }}
        />)}
        {currentPage === "人材情報" && (<TextField
          fullWidth
          placeholder="名前またはスキルで検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: 1
            }
          }}
        />)}
      </Box>
      {/* 邮件列表表格 */}
      {currentPage === "メール一覧" && (
        <MailListTable
          mails={mails}
          handleDetailClick={handleDetailClick}
        />)}
      {currentPage === "人材情報" && (
        <StaffListTable
          staffs={staffs}
          handleDetailClick={handleDetailClick}
          onStatusChange={handleStatusChange}  // 传递回调函数
        />)}
      {/* 使用封装好的对话框组件 */}
      <MailDetailDialog
        open={openDialog}
        onClose={handleCloseDialog}
        mail={selectedMail}
      />
    </Box>
  );
};

export default MailListPage;