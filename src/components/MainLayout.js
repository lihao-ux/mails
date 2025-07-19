import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {Tabs, Tab, Box, Stack, Button, CircularProgress} from '@mui/material';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import api from "../api/api";
import React, {useContext, useEffect, useState} from 'react';
import snackbar from "./tools/Snackbar";
import {UserContext} from "./tools/UserContext";

const MainLayout = () => {
    const navigate = useNavigate(); // 在组件内添加
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { user, logout } = useContext(UserContext);
    const [userRole,setUserRole]= useState(0);
    useEffect(() => {
       setUserRole(user.role)
    }, []);
    // 根据当前路径确定激活的Tab
    const getActiveTab = () => {
        const basePath = location.pathname.split('/')[1]; // 获取第一级路径
        const currentPath = basePath ? `/${basePath}` : '/mails'; // 处理根路径

        // 管理员角色(10)的特殊处理
        if (userRole === '10') {
            const allowedPaths = ['/users']; // 管理员允许的路径
            if (!allowedPaths.includes(currentPath)) {
                return '/users'; // 强制返回users路径
            }
        }

        // 普通用户(30)的路径检查
        if (userRole === '30') {
            const allowedPaths = ['/mails', '/staffs', '/projects']; // 普通用户允许的路径
            if (!allowedPaths.includes(currentPath)) {
                return '/mails'; // 默认返回mails路径
            }
        }

        return currentPath; // 返回当前有效路径
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
    function doLogout() {
        logout();
        navigate('/login');
    }
    function fetchMails() {
        setIsLoading(true);
        console.log(isLoading)
        try {
            api.processEmailsOnce().then(response => {
                setRefreshTrigger(prev => prev + 1);
                snackbar.show('メールの取得に成功しました', 'success');
            }).catch(error => {
                console.error('メール取得エラー:', error);
            });
        } catch (error) {
            console.error('メール取得エラー:', error);
        } finally {
            setIsLoading(false);
            console.log(isLoading)
        }
    }

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
                    {userRole==='30'&&<Tab
                        value="/mails"
                        label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <AttachEmailOutlinedIcon fontSize="small"/>
                                <span>メール一覧</span>
                            </Stack>
                        }
                        sx={tabSx}
                    />}
                    {userRole==='30'&&<Tab
                        value="/staffs"
                        label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <PermIdentityOutlinedIcon fontSize="small"/>
                                <span>人材情報</span>
                            </Stack>
                        }
                        sx={tabSx}
                    />}
                    {userRole==='30'&&<Tab
                        value="/projects"
                        label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <DescriptionOutlinedIcon fontSize="small"/>
                                <span>案件情報</span>
                            </Stack>
                        }
                        sx={tabSx}
                    />}
                    {userRole==='10'&&<Tab
                        value="/users"
                        label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <DescriptionOutlinedIcon fontSize="small"/>
                                <span>ユーザー管理</span>
                            </Stack>
                        }
                        sx={tabSx}
                    />}
                </Tabs>
                {/* 右侧按钮（仅在 /mails 页面显示） */}
                {getActiveTab() === '/mails' && (
                    <Button
                        variant="contained"
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : <DownloadIcon/>}
                        onClick={fetchMails}
                        disabled={isLoading}
                        sx={{
                            marginLeft: 'auto',
                            marginRight: '-1000px',
                            height: '40px',
                            fontWeight: 'bold',
                            backgroundColor: '#1976d2',
                            '&:hover': {
                                backgroundColor: '#1565c0'
                            }
                        }}
                    >
                        {isLoading ? '取得中...' : 'メール取得'}
                    </Button>
                )}
                <Button
                    variant="contained"
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : <LogoutIcon/>}
                    onClick={doLogout}
                    disabled={isLoading}
                    sx={{
                        marginLeft: 'auto',
                        marginRight: '9.5%',
                        height: '40px',
                        fontWeight: 'bold',
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#1565c0'
                        }
                    }}
                >
                    {isLoading ? '取得中...' : 'logout'}
                </Button>
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
                    <Outlet context={{refreshTrigger}}/>
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;