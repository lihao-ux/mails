import React, { useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Stack,
    Typography,
    Select,
    MenuItem,
    Button,
    Box,TablePagination
} from '@mui/material';
import {
    CheckCircle,       // 通过 (绿色)
    Warning,           // 警告 (黄色)
    Error
} from '@mui/icons-material';
const StaffListTable = () => {
    const staffs = [
        {
            id: 1,
            staffName: "山田太郎",
            status: "1",
            staffAge: 32,
            skills: "Java, Spring Boot, PostgreSQL, AWS",
            workDate: "月～金 9:00-18:00",
            desiredSalary: "80万円",
            aiRecommendedProjects: "金融システム開発 (Java/Spring), クラウド移行プロジェクト"
        },
        {
            id: 2,
            staffName: "佐藤花子",
            status: "2",
            staffAge: 28,
            skills: "React, TypeScript, Node.js",
            workDate: "月～水 フルタイム",
            desiredSalary: "70万円",
            aiRecommendedProjects: "フロントエンド刷新プロジェクト, 社内ポータル開発"
        },
        {
            id: 3,
            staffName: "鈴木健太",
            status: "3",
            staffAge: 35,
            skills: "Python, Django, 機械学習",
            workDate: "リモート可 フレックス",
            desiredSalary: "90万円",
            aiRecommendedProjects: "AIチャットボット開発, データ分析基盤構築"
        },
        {
            id: 4,
            staffName: "田中優子",
            status: "1",
            staffAge: 40,
            skills: "C#, .NET Core, Azure",
            workDate: "月～金 8:00-17:00",
            desiredSalary: "85万円",
            aiRecommendedProjects: "製造業向けERPシステム開発"
        },
        {
            id: 5,
            staffName: "伊藤一郎",
            status: "2",
            staffAge: 45,
            skills: "COBOL, メインフレーム",
            workDate: "週3日 要相談",
            desiredSalary: "75万円",
            aiRecommendedProjects: "レガシーシステム保守・改修"
        },
        {
            id: 6,
            staffName: "高橋美咲",
            status: "1",
            staffAge: 29,
            skills: "Vue.js, Firebase",
            workDate: "フルリモート可",
            desiredSalary: "65万円",
            aiRecommendedProjects: "スタートアップ向けWebアプリ開発"
        },
        {
            id: 7,
            staffName: "渡辺隆",
            status: "3",
            staffAge: 38,
            skills: "Go, Kubernetes, Docker",
            workDate: "月～木 フルタイム",
            desiredSalary: "95万円",
            aiRecommendedProjects: "マイクロサービスアーキテクチャ構築"
        },
        {
            id: 8,
            staffName: "中村真理子",
            status: "2",
            staffAge: 31,
            skills: "PHP, Laravel, MySQL",
            workDate: "週4日 要相談",
            desiredSalary: "68万円",
            aiRecommendedProjects: "ECサイトリニューアルプロジェクト"
        },
        {
            id: 9,
            staffName: "小林健二",
            status: "1",
            staffAge: 42,
            skills: "Ruby on Rails, JavaScript",
            workDate: "月～金 10:00-19:00",
            desiredSalary: "82万円",
            aiRecommendedProjects: "SNSアプリケーション開発"
        },
        {
            id: 10,
            staffName: "加藤愛",
            status: "2",
            staffAge: 27,
            skills: "Swift, iOS開発",
            workDate: "フレックス制",
            desiredSalary: "72万円",
            aiRecommendedProjects: "モバイルアプリ新規開発"
        },
        {
            id: 11,
            staffName: "吉田翔",
            status: "1",
            staffAge: 33,
            skills: "Scala, Akka, 分散システム",
            workDate: "リモート優先",
            desiredSalary: "88万円",
            aiRecommendedProjects: "高トラフィック対応システム開発"
        },
        {
            id: 12,
            staffName: "山本裕子",
            status: "3",
            staffAge: 36,
            skills: "Angular, RxJS, NgRx",
            workDate: "月～金 9:30-18:30",
            desiredSalary: "78万円",
            aiRecommendedProjects: "大規模フロントエンドプロジェクト"
        },
        {
            id: 13,
            staffName: "斎藤大輔",
            status: "1",
            staffAge: 39,
            skills: "DevOps, CI/CD, Terraform",
            workDate: "フルタイム 要相談",
            desiredSalary: "92万円",
            aiRecommendedProjects: "インフラ自動化プロジェクト"
        },
        {
            id: 14,
            staffName: "福田さくら",
            status: "2",
            staffAge: 30,
            skills: "UI/UXデザイン, Figma",
            workDate: "週3日～",
            desiredSalary: "75万円",
            aiRecommendedProjects: "デザインシステム構築"
        },
        {
            id: 15,
            staffName: "清水剛",
            status: "1",
            staffAge: 37,
            skills: "Blockchain, Solidity",
            workDate: "フルリモート",
            desiredSalary: "100万円",
            aiRecommendedProjects: "DeFiプロジェクト開発"
        }
    ];
        const [rowsPerPage, setRowsPerPage] = useState(10);
      // 分页处理函数
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // 在组件中添加状态
    const [page, setPage] = useState(0);
    // 计算当前页数据
    const paginatedStaffs = staffs.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const renderStatusIcon = (status) => {
        if (status === '1') {
            return <CheckCircle fontSize="small" color="success" />;
        }
        if (status === '2') {
            return <Warning fontSize="small" color="warning" />;
        }
        if (status === '3') {
            return <Error fontSize="small" color="error" />;
        }
        return <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>{status}</Typography>;
    };
    const [statusValues, setStatusValues] = React.useState(
        staffs.reduce((acc, staff) => ({ ...acc, [staff.id]: staff.status }), {})
    );

    const handleStatusChange = (staffId, newStatus) => {
        setStatusValues((prev) => ({ ...prev, [staffId]: newStatus }));
        console.log(staffs)
    };
    const getSelectStyle = (value, theme) => {
        const styles = {
            '1': { // 稼働中
                bgcolor: '#d8edd9',  // 比 #e8f5e9 深一点的浅绿色
                color: '#1b5e20',    // 比 #2e7d32 更深的绿色
                iconColor: '#388e3c', // 中等深度的绿色
                borderColor: '#81c784', // 边框色
                fontWeight: 'bold'    // 加粗字体
            },
            '2': { // 待機中
                bgcolor: '#d1e4f7',  // 浅蓝色背景 (类似浅绿的明度)
                color: '#0d47a1',    // 深蓝色文字 (类似深绿的对比度)
                iconColor: '#1976d2', // 图标蓝色
                borderColor: '#64b5f6', // 边框色
                fontWeight: 'bold'
            },
            '3': { // 調整中
                bgcolor: '#ffecb3',  // 浅橙色背景 (类似浅绿的明度)
                color: '#e65100',    // 深橙色文字 (类似深绿的对比度)
                iconColor: '#ff9800', // 图标橙色
                borderColor: '#ffb74d', // 边框色
                fontWeight: 'bold'
            }
        };
        return styles[value] || styles['3']; // 默认使用調整中样式
    };
    return (
        <Box>
            <Box sx={{
                mb: 2,
                mt: 2,
                p: 1.5, // 内边距
                backgroundColor: '#e8f5e9', // 浅绿色背景
                borderRadius: 1, // 圆角边框
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' // 可选：添加轻微阴影
            }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>ステータスフィルター</Typography>
                <Stack direction="row" spacing={1}>
                    <Button variant="contained" size="small" color="info">稼働中</Button>
                    <Button variant="outlined" size="small">待機中</Button>
                    <Button variant="outlined" size="small">調整中</Button>
                </Stack>
            </Box>
            <TableContainer component={Paper} elevation={1} sx={{ maxHeight: 600 }}>
                <Table stickyHeader sx={{ minWidth: 800 }}>
                    <TableHead sx={{
                        backgroundColor: '#f5f5f5',
                        '& .MuiTableCell-root': {
                            backgroundColor: '#f5f5f5',
                            fontWeight: 'bold',
                            border: '1px solid #ddd',
                            whiteSpace: 'nowrap',
                            fontSize: '0.8rem',
                            py: 1,
                            lineHeight: '1.5'
                        }
                    }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '120px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>名前</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '100px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>ステータス</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '100px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>年齢</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '400px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>スキル</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>稼働可能時間</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '100px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>単価希望</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '400px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>AI推薦案件</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staffs.map((staff) => (
                            <TableRow key={staff.id} hover sx={{ cursor: 'pointer', height: '48px' }}>
                                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                    {staff.staffName}
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                    <Select
                                        value={statusValues[staff.id] || staff.status}
                                        onChange={(e) => handleStatusChange(staff.id, e.target.value)}
                                        sx={(theme) => {
                                            const value = statusValues[staff.id] || staff.status;
                                            const style = getSelectStyle(value, theme);
                                            return {
                                                height: '32px',
                                                fontSize: '12px',
                                                backgroundColor: style.bgcolor,
                                                color: style.color,
                                                '& .MuiSelect-icon': { color: style.iconColor },
                                                '&:hover': {
                                                    backgroundColor: style.bgcolor,
                                                    opacity: 0.9
                                                }
                                            };
                                        }}
                                    >
                                        <MenuItem value="1">稼働中</MenuItem>
                                        <MenuItem value="2">待機中</MenuItem>
                                        <MenuItem value="3">調整中</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                    {staff.staffAge}
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', color: '#1976d2', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                    {staff.skills}
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                    {staff.workDate}
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                    {staff.desiredSalary}
                                </TableCell>
                                <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                    {staff.aiRecommendedProjects}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Paper elevation={0} sx={{
                borderTop: '1px solid #e0e0e0',
                borderBottom: '1px solid #e0e0e0'
            }}>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={staffs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="ページあたりの行数:"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}～${to}件 / 全${count}件`
                    }
                    sx={{
                        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                            fontSize: '0.8rem'
                        }
                    }}
                    SelectProps={{
                        variant: 'outlined',
                        size: 'small'
                    }}
                />
            </Paper>
        </Box>
    );
};

export default StaffListTable;