import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import api from '../../api/api';
import {useNavigate} from 'react-router-dom';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
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

const MailListTable = () => {
    const [mails, setMails] = useState([]); // 用于存储 API 返回值
    const [updateMails, setupdateMails] = useState([]);
    const upsertItem = (newItem) => {
        setupdateMails(prevItems => {
            // 检查是否存在相同id的项目
            const existingIndex = prevItems.findIndex(item => item.MSGID === newItem.MSGID);
            if (existingIndex >= 0) {
                // 存在则更新
                const updatedItems = [...prevItems];
                updatedItems[existingIndex] = newItem;
                return updatedItems;
            } else {
                // 不存在则添加
                return [...prevItems, newItem];
            }
        });
    };

    useEffect(() => {
        getEmails();
    }, []);
    const getEmails =() => {
        api.getEmails()
            .then(response => {
                setMails(response.data); // 将返回的邮件数据设置到 mails 数组中
            })
            .catch(error => {
                console.error('メール取得エラー:', error);
            });
    }
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const [warnOpen, setWarnOpen] = useState(false);
    const [warnDel, setWarnDel] = useState(false);
    const [doUpdate, setDoUpdate] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
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
            const newSelecteds = mails.map((mail) => mail.MSGID);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    const getDetail = () => {
        if (selected.length > 1 || selected.length === 0) {
            setWarnOpen(true)
        } else {
            const msgid = selected[0];
            // mail?.
            navigate(`/mails/${msgid}`); // 跳转到详情页
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
    const doUpdateMails = () => {
        if (updateMails.length === 0) {
            setDoUpdate(true)
        } else {
            const newArray = updateMails.map(item => ({
                msgid: item.MSGID,
                status: item.ステータス
            }));
            api.updateMessagesStatusBatch(newArray).then(response => {
                getEmails();
                setupdateMails([]);
            })
                .catch(error => {
                    console.error('メール取得エラー:', error);
                });
        }

    };
    // 状态选项（显示汉字，值用英文）
    const [status, setStatus] = useState([]);

    const [category, setCategory] = useState({
        caseInfo: false,   // 案件情報
        talentInfo: false  // 人材情報
    });
    // 切换选中状态
    const handleChange = (statusValue) => (e) => {
        setStatus((prev) =>
            e.target.checked
                ? [...prev, statusValue]          // 选中 → 添加（如 "0"）
                : prev.filter((v) => v !== statusValue) // 取消 → 移除
        );
    };
    const handleCategoryChange = (key) => (event) => {
        setCategory(prev => ({ ...prev, [key]: event.target.checked }));
    };
    // 提交搜索
    const handleSearch = () => {
       const params = {
           status:status,
           received_time_from:dateParse(startDate),
           received_time_to:dateParse(endDate),
           search_text:searchQuery
       }
       api.searchMessages(params).then(response => {
           setMails(response.data)
           setupdateMails([]);
       }).catch(error => {
               console.error('メール取得エラー:', error);
           });
    };
    const dateParse = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const styles = {
        '0': { // 稼働中
            bgcolor: '#d8edd9',  // 比 #e8f5e9 深一点的浅绿色
            color: '#1b5e20',    // 比 #2e7d32 更深的绿色
            iconColor: '#388e3c', // 中等深度的绿色
            borderColor: '#81c784', // 边框色
            fontWeight: 'bold'    // 加粗字体
        },
        '9': { // 待機中
            bgcolor: '#d1e4f7',  // 浅蓝色背景 (类似浅绿的明度)
            color: '#0d47a1',    // 深蓝色文字 (类似深绿的对比度)
            iconColor: '#1976d2', // 图标蓝色
            borderColor: '#64b5f6', // 边框色
            fontWeight: 'bold'
        },
        '7': { // 調整中
            bgcolor: '#ffecb3',  // 浅橙色背景 (类似浅绿的明度)
            color: '#e65100',    // 深橙色文字 (类似深绿的对比度)
            iconColor: '#ff9800', // 图标橙色
            borderColor: '#ffb74d', // 边框色
            fontWeight: 'bold'
        },
        '1': { // 緊急/警告 (新增红色样式)
            bgcolor: '#ffebee',  // 非常浅的红色背景
            color: '#c62828',    // 深红色文字
            iconColor: '#d32f2f', // 图标红色
            borderColor: '#ef9a9a', // 边框色
            fontWeight: 'bold',
            animation: 'blink 1.5s infinite' // 可选：添加闪烁动画效果
        }
    };
    const getSelectStyle = (value, theme) => {
        return styles[value] || styles['3']; // 默认使用調整中样式
    };
    // 检查是否选中
    const isSelected = (id) => selected.indexOf(id) !== -1;

    function doDeleteMessages() {
        if (selected.length===0){
            setWarnDel(true)
        }
        api.deleteMessagesBatch(selected).then(response => {
            getEmails()
            setupdateMails([])
        }).catch(error => {
            console.error('メール取得エラー:', error);
        });
    }

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
                                        checked={status.includes('0')}
                                        onChange={handleChange('0')} // 直接传0
                                        size="small"
                                    />
                                }
                                label="解析OK"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status.includes('1')}
                                        onChange={handleChange('1')} // 直接传0
                                        size="small"
                                    />
                                }
                                label="解析NG"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status.includes('9')}
                                        onChange={handleChange('9')} // 直接传0
                                        size="small"
                                    />
                                }
                                label="確認済"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={status.includes('7')}
                                        onChange={handleChange('7')} // 直接传0
                                        size="small"
                                    />
                                }
                                label="確認要"
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
                                            onClick={() =>handleSearch()}
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
            <TableContainer
                component={Paper}
                elevation={1}
                sx={{
                    maxHeight: 600,
                    overflow: 'auto',  // 添加滚动条
                    position: 'relative' // 确保固定表头
                }}
            >
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
                            lineHeight: '1.5',
                            position: 'sticky',  // 固定表头
                            top: 0,              // 固定在顶部
                            zIndex: 1            // 确保表头在内容之上
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
                            const isItemSelected = isSelected(mail.MSGID);
                            return (
                                <TableRow
                                    key={mail.MSGID}
                                    hover
                                    sx={{ cursor: 'pointer', height: '48px' }}
                                    onClick={(event) => handleCheckboxClick(event, mail.MSGID)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleCheckboxClick(event, mail.MSGID)}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        <Select
                                            value={mail.ステータス}
                                            onChange={(e) => {
                                                const newValue = e.target.value;
                                                // 更新原数组
                                                const updatedProjects = mails.map(item =>
                                                    item.MSGID === mail.MSGID
                                                        ? {...item, ステータス: newValue}
                                                        : item
                                                );
                                                setMails(updatedProjects);
                                                upsertItem({...mail, ステータス: newValue});

                                            }}
                                            sx={(theme) => {
                                                // const style = getSelectStyle(mail.ステータス ?? '1', theme);  // 同样处理这里的默认值
                                                const style = getSelectStyle(mail.ステータス, theme);
                                                return {
                                                    height: '32px',
                                                    fontSize: '12px',
                                                    backgroundColor: style.bgcolor,
                                                    color: style.color,
                                                    '& .MuiSelect-icon': {color: style.iconColor},
                                                    '&:hover': {
                                                        backgroundColor: style.bgcolor,
                                                        opacity: 0.9
                                                    }
                                                };
                                            }}
                                        >
                                            <MenuItem value="1">解析NG</MenuItem>
                                            <MenuItem value="0">解析OK</MenuItem>
                                            <MenuItem value="9">確認済</MenuItem>
                                            <MenuItem value="7">確認要</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {mail.種別}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {mail.受信時刻}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', color: '#1976d2', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {mail.送信者}
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
                                        {mail.MSGID}
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
                        onClick={(event) => doUpdateMails()}
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
                        onClick={(event) => doDeleteMessages()}
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
            <Dialog
                open={doUpdate}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Alert severity="warning" sx={{ mb: 2 }}>
                    警告
                </Alert>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        少なくとも1件のメール情報を更新してください。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => { setDoUpdate(false) }} autoFocus>
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={warnDel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Alert severity="warning" sx={{ mb: 2 }}>
                    警告
                </Alert>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                            メールを1件選択して削除してください。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(event) => { setWarnDel(false) }} autoFocus>
                        确认
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MailListTable;