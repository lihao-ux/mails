import React, { useState } from 'react';
import {
    TextField,
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
    Box, TablePagination, InputAdornment, FormControlLabel, Checkbox
} from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SearchIcon from '@mui/icons-material/Search';
import {
    CheckCircle,       // 通过 (绿色)
    Warning,           // 警告 (黄色)
    Error
} from '@mui/icons-material';
const ProjectTable = () => {
    const [locationValues, setLocationValues] = React.useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const [selectedValues, setSelectedValues] = useState('');
    const handleCheckboxClick = (event, id) => {
        event.stopPropagation(); // 阻止事件冒泡到行

        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else {
            newSelected = selected.filter(item => item !== id);
        }

        setSelected(newSelected);
    };
    const [staffs, setStaffs] = useState([
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
    ]);
    // 全选/取消全选
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = staffs.map((staff) => staff.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // 分页处理函数
    const handleChangePage = (event, newPage) => {
        console.log(newPage);

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
    const handleLocationChange = (id, value) => {
        setLocationValues(prev => ({
            ...prev,
            [id]: value === "" ? "" : value, // 允许清空
        }));
        console.log(paginatedStaffs)
    };
    const handleStatusChange = (staffId, newStatus) => {
        setStatusValues((prev) => ({ ...prev, [staffId]: newStatus }));
        console.log(staffs)
    };
    const handleChange = (value) => {
        setSelectedValues((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value) // 如果已选中，则移除
                : [...prev, value] // 如果未选中，则添加
        );
        console.log(selectedValues);
    };
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
    const getSelectStyle = (value, theme) => {
        return styles[value] || styles['3']; // 默认使用調整中样式
    };
    return (
        <Box>
            <TextField
                fullWidth
                placeholder="案件名またはスキルで検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    console.log(selectedValues);
                                }}
                                sx={{
                                    height: '40px',
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    fontSize: '0.875rem'
                                }}
                            >
                                検索
                            </Button>
                        </InputAdornment>
                    ),
                    sx: {
                        paddingRight: 0,
                        height: '40px'
                    }
                }}
                sx={{
                    backgroundColor: 'white',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 1,
                        paddingRight: 0,
                        height: '40px'
                    }
                }}
            />
            <Box sx={{
                mb: 2,
                mt: 2,
                p: 1.5,
                backgroundColor: '#e8f5e9',
                borderRadius: 1,
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
            }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>ステータスフィルター</Typography>
                <Stack direction="row" spacing={3} alignItems="center">
                    {/* 稼働中 (value="1") */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedValues.includes("1")}
                                onChange={() => handleChange("1")}
                                value="1"
                                sx={{
                                    color: "inherit",
                                    "&.Mui-checked": { color: styles["1"].iconColor }, // 仅选中时图标变色
                                }}
                            />
                        }
                        label="募集中"
                        sx={{
                            height: "30px",
                            width: "95px",
                            fontSize: "12px",
                            padding: "0 8px",
                            // 只有选中时应用样式
                            ...(selectedValues.includes("1") && {
                                backgroundColor: styles["1"].bgcolor,
                                color: styles["1"].color,
                                border: `1px solid ${styles["1"].borderColor}`,
                                borderRadius: "4px",
                                "&:hover": {
                                    backgroundColor: styles["1"].bgcolor,
                                    opacity: 0.9,
                                },
                            }),
                        }}
                    />

                    {/* 待機中 (value="2") */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedValues.includes("2")}
                                onChange={() => handleChange("2")}
                                value="2"
                                sx={{
                                    color: "inherit",
                                    "&.Mui-checked": { color: styles["2"].iconColor },
                                }}
                            />
                        }
                        label="終了"
                        sx={{
                            height: "30px",
                            width: "95px",
                            fontSize: "12px",
                            padding: "0 8px",
                            ...(selectedValues.includes("2") && {
                                backgroundColor: styles["2"].bgcolor,
                                color: styles["2"].color,
                                border: `1px solid ${styles["2"].borderColor}`,
                                borderRadius: "4px",
                                "&:hover": {
                                    backgroundColor: styles["2"].bgcolor,
                                    opacity: 0.9,
                                },
                            }),
                        }}
                    />

                    {/* 調整中 (value="3") */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedValues.includes("3")}
                                onChange={() => handleChange("3")}
                                value="3"
                                sx={{
                                    color: "inherit",
                                    "&.Mui-checked": { color: styles["3"].iconColor },
                                }}
                            />
                        }
                        label="保留中"
                        sx={{
                            height: "30px",
                            width: "95px",
                            fontSize: "12px",
                            padding: "0 8px",
                            ...(selectedValues.includes("3") && {
                                backgroundColor: styles["3"].bgcolor,
                                color: styles["3"].color,
                                border: `1px solid ${styles["3"].borderColor}`,
                                borderRadius: "4px",
                                "&:hover": {
                                    backgroundColor: styles["3"].bgcolor,
                                    opacity: 0.9,
                                },
                            }),
                        }}
                    />
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
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={selected.length > 0 && selected.length < staffs.length}
                                    checked={staffs.length > 0 && selected.length === staffs.length}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '120px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>案件名</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '100px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>ステータス</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '100px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>場所</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '400px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>スキル条件</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>単価</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '100px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>期間</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '400px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>AI推薦技術者</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedStaffs.map((staff) => {
                            const isItemSelected = isSelected(staff.id);
                            return (
                                <TableRow key={staff.id}
                                    hover
                                    sx={{ cursor: 'pointer', height: '48px' }}
                                    onClick={(event) => handleCheckboxClick(event, staff.id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleCheckboxClick(event, staff.id)}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {staff.staffName}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        <Select
                                            value={staff.status} // 直接绑定到原数据
                                            onChange={(e) => {
                                                // 更新原数组
                                                const updatedStaffs = staffs.map(item =>
                                                    item.id === staff.id
                                                        ? { ...item, status: e.target.value }
                                                        : item
                                                );
                                                setStaffs(updatedStaffs);
                                            }}
                                            sx={(theme) => {
                                                const style = getSelectStyle(staff.status, theme); // 直接使用 staff.status
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
                                            <MenuItem value="1">募集中</MenuItem>
                                            <MenuItem value="2">終　了</MenuItem>
                                            <MenuItem value="3">保留中</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {/*{staff.staffAge}*/}
                                        <TextField
                                            value={staff.staffAge} // 直接绑定到原数据
                                            onChange={(e) => {
                                                // 更新原数组
                                                const updatedStaffs = staffs.map(item =>
                                                    item.id === staff.id
                                                        ? { ...item, staffAge: e.target.value }
                                                        : item
                                                );
                                                setStaffs(updatedStaffs); // 触发重新渲染
                                            }}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
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
                            );
                        })}
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
            <Box sx={{
                mt: 2, display: 'flex',
                justifyContent: 'flex-end'
            }}>
                <Stack direction="row" spacing={1}>
                    <Button
                        size="small"
                        variant="contained"
                        color="warning"
                        sx={{ fontSize: '0.7rem', py: 0.5, px: 1.5, minWidth: 'auto' }}
                    >
                        <EditDocumentIcon fontSize="small" sx={{ mr: 1 }} />
                        更新
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{
                            fontSize: '0.7rem',
                            py: 0.5,
                            px: 1.5,
                            minWidth: 'auto'
                        }}
                        startIcon={<DeleteSweepIcon fontSize="small" />}  // ✅ 图标放在startIcon中
                    >
                        削除
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default ProjectTable;