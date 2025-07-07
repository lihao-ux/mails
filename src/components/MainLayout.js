import { Outlet, Link, useLocation,useNavigate } from 'react-router-dom';
import { Tabs, Tab, Box, Stack } from '@mui/material';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadIcon from '@mui/icons-material/Download';
const MainLayout = () => {
    const navigate = useNavigate(); // 在组件内添加
  const location = useLocation();

  // 根据当前路径确定激活的Tab
    const getActiveTab = () => {
        const basePath = location.pathname.split('/')[1]; // 始终取第一级路径
        return basePath ? `/${basePath}` : '/mails'; // 处理根路径
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
          display: 'flex',
          alignItems: 'center' // ✅ 垂直居中
      }}>
        <Tabs
            value={getActiveTab()}
            onChange={(_, newValue) => navigate(newValue)} // 直接控制路由跳转
          sx={{
            width: 'auto', // 让Tabs根据内容自适应宽度
            maxWidth: '100%',// 防止在小屏幕上溢出
            marginLeft: '11%'// 按比例控制左侧间距（示例：15%）
          }}
        >
          <Tab
            value="/mails"
            label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AttachEmailOutlinedIcon fontSize="small" />
                  <span>メール一覧</span>
                </Stack>
            }
            sx={tabSx}
          />
          <Tab
            value="/staffs"
            label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PermIdentityOutlinedIcon fontSize="small" />
                  <span>人材情報</span>
                </Stack>
            }
            sx={tabSx}
          />
          <Tab
            value="/projects"
            label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <DescriptionOutlinedIcon fontSize="small" />
                  <span>案件情報</span>
                </Stack>
            }
            sx={tabSx}
          />
        </Tabs>
          {/* 右侧按钮（仅在 /mails 页面显示） */}
          {getActiveTab() === '/mails' && (
              <button
                  style={{
                      backgroundColor: '#1976d2',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginLeft: '1155px',
                      height: '40px',
                      display: 'flex',          // 添加 flex 布局
                      alignItems: 'center',    // 垂直居中
                      justifyContent: 'center', // 水平居中（可选）
                      gap: '8px'               // 图标和文本之间的间距
                  }}
                  onClick={() => {
                      console.log('新規追加 clicked');
                  }}
              >
                  <DownloadIcon fontSize="small"/>
                  メール取得
              </button>
          )}
      </Box>

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            px: 2
        }}>
            <Box sx={{
                width: '80%'
            }}>
                <Outlet/>
            </Box>
        </Box>
    </Box>
  );
};

export default MainLayout;