import React, { useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    Stack,
    Typography,
    Box,
    Checkbox,
    TextField, InputAdornment, FormControlLabel, TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja'; // 导入日语本地化
import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Alert from '@mui/material/Alert';
import {
    CheckCircle,       // 通过 (绿色)
    Warning,           // 警告 (黄色)
    Error
} from '@mui/icons-material';
const MailListTable = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const [warnOpen, setWarnOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const mails = [
        { id: 1, status: '1', category: '人材情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
        { id: 2, status: '2', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
        { id: 3, status: '3', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
        { id: 4, status: '1', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
        { id: 5, status: '1', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
        { id: 6, status: '1', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
        { id: 7, status: '1', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
        { id: 8, status: '1', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
        { id: 9, status: '1', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
        { id: 10, status: '1', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' },
        { id: 11, status: '1', category: '条件情報', date: '2025/03/08 19:40', sender: 'yamada@company.co.jp', subject: '契約書の締結について' }
        // ... 其他邮件数据
    ];
    // 在组件中添加状态
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // 分页处理函数
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // 计算当前页数据
    const paginatedMails = mails.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    // 全选/取消全选
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = mails.map((mail) => mail.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const getDetail = () => {
        if (selected.length > 1 || selected.length === 0) {
            setWarnOpen(true)
        } else {
            const firstSelectedId = selected[0];
            navigate(`/mails/${firstSelectedId}`); // 跳转到详情页
        }
    };
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

    // 状态选项（显示汉字，值用英文）
    const [status, setStatus] = useState({
        unread: false,    // 未読
        inProgress: false, // 処理中
        completed: false   // 完了
    });

    const [category, setCategory] = useState({
        caseInfo: false,   // 案件情報
        talentInfo: false  // 人材情報
    });

    // 处理状态变化
    const handleStatusChange = (key) => (event) => {
        setStatus(prev => ({ ...prev, [key]: event.target.checked }));
    };

    const handleCategoryChange = (key) => (event) => {
        setCategory(prev => ({ ...prev, [key]: event.target.checked }));
    };

    // 提交搜索
    const handleSearch = () => {
        const activeStatus = Object.keys(status).filter(key => status[key]);
        const activeCategory = Object.keys(category).filter(key => category[key]);

        console.log('搜索参数:', {
            searchQuery,
            status: activeStatus,
            category: activeCategory
        });
    };
    // 检查是否选中
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const renderStatusIcon = (status) => {
        const iconStyle = { fontSize: '14px' }; // 调整图标大小

        if (status === '1') return <><CheckCircle sx={iconStyle} color="success" /> 解約成功</>;
        if (status === '2') return <><Warning sx={iconStyle} color="warning" /> 解約失敗</>;
        if (status === '3') return <><Error sx={iconStyle} color="error" /> 解約対象</>;
        return <>{status}</>;
    };
    return (
        <Box>
            <Box sx={{ p: 2, backgroundColor: '#e8f5e9', borderRadius: 1, mb: 2 }}>
                {/* 第一行：筛选条件 */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 3,
                    mb: 2
                }}>
                    {/* ステータス标签和选项 */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ mr: 1, fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                            ステータス:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status.unread}
                                        onChange={handleStatusChange('unread')}
                                        size="small"
                                    />
                                }
                                label="解約成功"
                                sx={{ mr: 0 }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status.inProgress}
                                        onChange={handleStatusChange('inProgress')}
                                        size="small"
                                    />
                                }
                                label="解約失敗"
                                sx={{ mr: 0 }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status.completed}
                                        onChange={handleStatusChange('completed')}
                                        size="small"
                                    />
                                }
                                label="解約対象"
                                sx={{ mr: 0 }}
                            />
                        </Box>
                    </Box>

                    {/* 分類标签和选项 */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ mr: 1, fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                            分類:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={category.caseInfo}
                                        onChange={handleCategoryChange('caseInfo')}
                                        size="small"
                                    />
                                }
                                label="案件情報"
                                sx={{ mr: 0 }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={category.talentInfo}
                                        onChange={handleCategoryChange('talentInfo')}
                                        size="small"
                                    />
                                }
                                label="人材情報"
                                sx={{ mr: 0 }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* 第二行：搜索框 */}
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    p: 2,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1
                }}>
                    {/* 受信日時 日期范围选择框 (左侧) */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '50%',
                        gap: 1
                    }}>
                        <Typography variant="subtitle2" sx={{
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            width: '80px' // 固定标题宽度
                        }}>
                            受信日時:
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                            <Box sx={{
                                display: 'flex',
                                gap: 1,
                                height: '55px',
                                alignItems: 'center',
                                px: 1
                            }}>
                                <DatePicker
                                    inputFormat="yyyy/MM/dd"
                                    value={startDate}
                                    onChange={setStartDate}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size="small"
                                            variant="standard"
                                            InputProps={{ ...params.InputProps, disableUnderline: true }}
                                            sx={{
                                                width: '45%',
                                                '& .MuiInputBase-root': {
                                                    height: '40px',
                                                    border: 'none'
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <Typography>〜</Typography>
                                <DatePicker
                                    inputFormat="yyyy/MM/dd"
                                    value={endDate}
                                    onChange={setEndDate}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            size="small"
                                            variant="standard"
                                            InputProps={{ ...params.InputProps, disableUnderline: true }}
                                            sx={{
                                                width: '45%',
                                                '& .MuiInputBase-root': {
                                                    height: '40px',
                                                    border: 'none'
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </Box>
                        </LocalizationProvider>
                    </Box>

                    {/* 搜索框 (右侧) */}
                    <Box sx={{ width: '50%' }}>
                        <TextField
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
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Button
                                            variant="contained"
                                            color="primary"
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
                    </Box>
                </Box>
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
                                    indeterminate={selected.length > 0 && selected.length < mails.length}
                                    checked={mails.length > 0 && selected.length === mails.length}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '80px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>ステータス</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '100px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>分類</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '150px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>受信日時</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>送信者</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>件名</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedMails.map((mail) => {
                            const isItemSelected = isSelected(mail.id);
                            return (
                                <TableRow
                                    key={mail.id}
                                    hover
                                    sx={{ cursor: 'pointer', height: '48px' }}
                                    onClick={(event) => handleCheckboxClick(event, mail.id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleCheckboxClick(event, mail.id)}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {renderStatusIcon(mail.status)}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {mail.category}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {mail.date}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', color: '#1976d2', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {mail.sender}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {mail.subject}
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
                    count={mails.length}
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
                        color="primary"
                        onClick={(event) => getDetail()}
                        sx={{ fontSize: '0.7rem', py: 0.5, px: 1.5, minWidth: 'auto' }}

                    >
                        <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1 }} />
                        詳細
                    </Button>
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
            <Dialog
                open={warnOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Alert severity="warning" sx={{ mb: 2 }}>
                    警告
                </Alert>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        メールを1件選択して閲覧してください。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => { setWarnOpen(false) }} autoFocus>
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MailListTable;