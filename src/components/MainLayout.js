import { Outlet, Link, useLocation } from 'react-router-dom';
import { Tabs, Tab, Box, Stack } from '@mui/material';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const MainLayout = () => {
  const location = useLocation();
  
  // 根据当前路径确定激活的Tab
  const getActiveTab = () => {
    if (location.pathname.startsWith('/staffs')) return '/staffs';
    if (location.pathname.startsWith('/projects')) return '/projects';
    return '/mails'; // 默认为邮件列表
  };

  const tabSx = {
    fontWeight: 'bold', 
    minWidth: 'auto', 
    padding: '12px 24px', 
    backgroundColor: 'transparent',
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
  mb: 2,
  display: 'flex'
}}>
  <Tabs
    value={getActiveTab()}
    TabIndicatorProps={{ style: { backgroundColor: '#32cd32' } }}
    sx={{
      width: 'auto', // 让Tabs根据内容自适应宽度
      maxWidth: '100%',// 防止在小屏幕上溢出
      marginLeft: '11%'// 按比例控制左侧间距（示例：15%）
    }}
  >
    <Tab
      value="/mails"
      label={
        <Link to="/mails" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AttachEmailOutlinedIcon fontSize="small" />
            <span>メール一覧</span>
          </Stack>
        </Link>
      }
      sx={tabSx}
    />
    <Tab
      value="/staffs"
      label={
        <Link to="/staffs" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PermIdentityOutlinedIcon fontSize="small" />
            <span>人材情報</span>
          </Stack>
        </Link>
      }
      sx={tabSx}
    />
    <Tab
      value="/projects"
      label={
        <Link to="/projects" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <DescriptionOutlinedIcon fontSize="small" />
            <span>案件情報</span>
          </Stack>
        </Link>
      }
      sx={tabSx}
    />
  </Tabs>
</Box>

      {/* 动态内容区域 */}
      <Outlet />
    </Box>
  );
};

export default MainLayout;