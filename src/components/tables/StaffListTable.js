import React, {useEffect, useState} from 'react';
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
    Box, TablePagination, TextField, InputAdornment, FormControlLabel, Checkbox
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import api from "../../api/api";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const StaffListTable = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedValues, setSelectedValues] = useState('');
    const [doUpdate, setDoUpdate] = useState(false);
    const [selected, setSelected] = useState([]);
    const [warnDel, setWarnDel] = useState(false);
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = staffs.map((staff) => staff.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    useEffect(() => {
        api.getEngineers()
            .then(response => {
                setStaffs(response.data); // 将返回的邮件数据设置到 mails 数组中
            })
            .catch(error => {
                console.error('メール取得エラー:', error);
            });
        getActiveProjects();
    }, []);
    const [staffs, setStaffs] = useState([])
    const [updateStaffs, setupdateStaffs] = useState([]);
    const [projects, setProjects] = useState([])
    const handleStaffFieldChange = (staffId, field, value) => {
        setStaffs(prevStaffs => {
            const newStaffs = prevStaffs.map(staff =>
                staff.id === staffId ? {...staff, [field]: value} : staff
            );

            // 1. 获取最新的updateItem（基于newStaffs）
            const latestUpdateItem = newStaffs.find(staff => staff.id === staffId);

            // 2. 更新updateStaffs
            setupdateStaffs(prevItems => {
                const existingIndex = prevItems.findIndex(item => item.id === staffId);

                if (existingIndex >= 0) {
                    // 存在则更新
                    const updatedItems = [...prevItems];
                    updatedItems[existingIndex] = latestUpdateItem;
                    return updatedItems;
                } else {
                    // 不存在则添加
                    return [...prevItems, latestUpdateItem];
                }
            });
            return newStaffs;
        });
    };

    function getStaffs() {
        api.searchEngineers({
            status: selectedValues,
            name_or_skill: searchQuery
        })
            .then(response => {
                setStaffs(response.data);
                setupdateStaffs([]);
            })
            .catch(error => {
                console.error('メール取得エラー:', error);
            });
    }

    function getActiveProjects() {
        api.getActiveProjectsSummary()
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('メール取得エラー:', error);
            });
    }

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
    const handleChange = (value) => {
        setSelectedValues((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value) // 如果已选中，则移除
                : [...prev, value] // 如果未选中，则添加
        );
    };
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


    const styles = {
        '3': { // 稼働中
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
        '1': { // 調整中
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

    function doUpdateStaffs() {
        console.log(updateStaffs)
        if (updateStaffs.length === 0) {
            setDoUpdate(true)
        } else {
            api.updateEngineersBatch(updateStaffs).then(response => {
                getStaffs();
                setupdateStaffs([]);
            }).catch(error => {
                console.error('メール取得エラー:', error);
            });
        }
    }

    function doDeleteStaffs() {
        if (selected.length===0){
            setWarnDel(true)
        }else {
        const ids = selected.map(id =>
            staffs.find(staff => staff.id === id)?.人材ID
        ).filter(Boolean);
        api.deleteEngineersByIds(ids).then(response => {
            getStaffs();
            setupdateStaffs([]);
        }).catch(error => {
            console.error('メール取得エラー:', error);
        });}
    }

    return (
        <Box>
            <TextField
                fullWidth
                placeholder="名前または件名で検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => getStaffs()}
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
                <Typography variant="subtitle2" sx={{mb: 1}}>ステータスフィルター</Typography>
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
                                    "&.Mui-checked": {color: styles["1"].iconColor}, // 仅选中时图标变色
                                }}
                            />
                        }
                        label="提案中"
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
                                    "&.Mui-checked": {color: styles["2"].iconColor},
                                }}
                            />
                        }
                        label="面談待ち"
                        sx={{
                            height: "30px",
                            width: "110px",
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
                                    "&.Mui-checked": {color: styles["3"].iconColor},
                                }}
                            />
                        }
                        label="面談済"
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
            <TableContainer component={Paper} elevation={1} sx={{
                maxHeight: 600,
                overflowX: 'auto',      // 横向滚动
                overflowY: 'auto',      // 保留纵向滚动
                position: 'relative'
            }}>
                <Table stickyHeader sx={{ minWidth: 1600,tableLayout: 'fixed'}}>
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
                                    indeterminate={selected.length > 0 && selected.length < staffs.length}
                                    checked={staffs.length > 0 && selected.length === staffs.length}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '120px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>名前</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '100px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>ステータス</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '100px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5',
                                with:50
                            }}>年齢</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '400px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>スキル</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5',
                                width: '160px'
                            }}>稼働可能時間</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '100px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>単価希望</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '400px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>AI推薦案件</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '400px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>案件</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '400px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>履歴書
                            </TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '400px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>備考
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedStaffs.map((staff) => {
                            const isItemSelected = isSelected(staff.id);
                            return (
                                <TableRow key={staff.id} hover sx={{cursor: 'pointer', height: '48px'}}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleCheckboxClick(event, staff.id)}
                                        />
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        {staff.氏名}
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <Select
                                            value={staff.ステータス}
                                            onChange={(e) => {
                                                handleStaffFieldChange(staff.id, 'ステータス', e.target.value)
                                            }}
                                            sx={(theme) => {
                                                const style = getSelectStyle(staff.ステータス, theme);
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
                                            <MenuItem value="1">提案中</MenuItem>
                                            <MenuItem value="2">面談待ち</MenuItem>
                                            <MenuItem value="3">面談済</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5',
                                    }}>
                                        {staff.年齢}
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        color: '#1976d2',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <TextField
                                            value={staff.スキル}
                                            onChange={(e) => handleStaffFieldChange(staff.id, 'スキル', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            InputProps={{
                                                sx: {
                                                    fontSize: '0.75rem', // 更小的字体
                                                    padding: '6px 8px',  // 可选，控制内部 padding
                                                },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <TextField
                                            value={staff.稼働開始可能日}
                                            onChange={(e) => handleStaffFieldChange(staff.id, '稼働開始可能日', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            InputProps={{
                                                sx: {
                                                    fontSize: '0.75rem', // 更小的字体
                                                    padding: '6px 8px',  // 可选，控制内部 padding
                                                },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <TextField
                                            value={staff.単価}
                                            onChange={(e) => handleStaffFieldChange(staff.id, '単価', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            InputProps={{
                                                sx: {
                                                    fontSize: '0.75rem', // 更小的字体
                                                    padding: '6px 8px',  // 可选，控制内部 padding
                                                },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        {staff.推薦案件ID1}
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <Select
                                            value={staff.案件ID}
                                            onChange={(e) => {
                                                handleStaffFieldChange(staff.id, '案件ID', e.target.value)
                                            }}
                                        >
                                            {projects.map((project) => (
                                                <MenuItem
                                                    value={project.案件ID}
                                                >
                                                    {project.案件名}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            border: '1px solid #ddd',
                                            whiteSpace: 'nowrap',
                                            fontSize: '0.8rem',
                                            py: 1,
                                            lineHeight: '1.5',
                                            // Conditional styles based on whether スキルシート exists
                                            cursor: staff.スキルシート ? 'pointer' : 'default',
                                            color: staff.スキルシート ? 'primary.main' : 'inherit',
                                            textDecoration: staff.スキルシート ? 'underline' : 'none',
                                            userSelect: 'none',
                                            WebkitUserModify: 'read-only',
                                            '&:hover': {
                                                backgroundColor: staff.スキルシート ? 'action.hover' : 'inherit',
                                                textDecoration: staff.スキルシート ? 'none' : 'inherit'
                                            }
                                        }}
                                        onClick={staff.スキルシート ? () => api.downloadFileEndpoint(staff.MSGID,staff.スキルシート) : undefined}
                                    >
                                        {staff.スキルシート || ''}
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        color: '#1976d2',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <TextField
                                            value={staff.備考}
                                            onChange={(e) => handleStaffFieldChange(staff.id, '備考', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            InputProps={{
                                                sx: {
                                                    fontSize: '0.75rem', // 更小的字体
                                                    padding: '6px 8px',  // 可选，控制内部 padding
                                                },
                                            }}
                                        />
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
                    labelDisplayedRows={({from, to, count}) =>
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
                        sx={{fontSize: '0.7rem', py: 0.5, px: 1.5, minWidth: 'auto'}}
                        onClick={(event) => doUpdateStaffs()}
                    >
                        <EditDocumentIcon fontSize="small" sx={{mr: 1}}/>
                        更新
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={(event) => doDeleteStaffs()}
                        sx={{
                            fontSize: '0.7rem',
                            py: 0.5,
                            px: 1.5,
                            minWidth: 'auto'
                        }}
                        startIcon={<DeleteSweepIcon fontSize="small"/>}  // ✅ 图标放在startIcon中
                    >
                        削除
                    </Button>
                    <Dialog
                        open={doUpdate}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <Alert severity="warning" sx={{mb: 2}}>
                            警告
                        </Alert>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                少なくとも1件のメール情報を更新してください。
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(event) => {
                                setDoUpdate(false)
                            }} autoFocus>
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
                </Stack>
            </Box>
        </Box>
    );
};

export default StaffListTable;