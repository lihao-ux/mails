import React, {useEffect, useState} from 'react';
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
    Box, TablePagination, InputAdornment, FormControlLabel, Checkbox,OutlinedInput,ListItemText
} from '@mui/material';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import SearchIcon from '@mui/icons-material/Search';
import api from "../../api/api";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const ProjectTable = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selected, setSelected] = useState([]);
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const [selectedValues, setSelectedValues] = useState('');
    const [warnDel, setWarnDel] = useState(false);
    const [projects, setProjects] = useState([]);
    const [updateProjects, setUpdateProjects] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [doUpdate, setDoUpdate] = useState(false);
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

    useEffect(() => {
        getProjects();
        getStaffs();
    }, []);
    const getProjects = () =>{
        api.getProjects()
            .then(response => {
                setProjects(response.data); // 将返回的邮件数据设置到 mails 数组中
            })
            .catch(error => {
                console.error('案件情報取得エラー:', error);
            });
    }
    const findByConditions= () => {
        const params = {
            status:selectedValues,
            name_or_skill: searchQuery
        };
        api.searchProjects(params)
            .then(response => {
                console.log(response.data)
                setProjects(response.data);
            })
            .catch(error => {
                console.error('案件情報取得エラー:', error);
            });
    };
    function getStaffs() {
        api.getAvailableEngineersSummary()
            .then(response => {
                setStaffs(response.data);
            })
            .catch(error => {
                console.error('メール取得エラー:', error);
            });
    }
    const handleProjectFieldChange = (projectId, field, value) => {
        setProjects(prevProjects => {
            const newProjects = prevProjects.map(project =>
                project.id === projectId ? {...project, [field]: value} : project
            );

            // 1. 获取最新的updateItem（基于newStaffs）
            const latestUpdateItem = newProjects.find(project => project.id === projectId);

            // 2. 更新updateStaffs
            setUpdateProjects(prevItems => {
                const existingIndex = prevItems.findIndex(item => item.id === projectId);

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

            console.log('最新updateItem:', latestUpdateItem);
            return newProjects;
        });
    };
    // 全选/取消全选
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = projects.map((project) => project.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };
    function doDeleteProjects() {
        if (selected.length===0){
            setWarnDel(true)
        }else {
        const ids = selected.map(id =>
            projects.find(project => project.id === id)?.案件ID
        ).filter(Boolean);
        api.deleteProjectsByIds(ids).then(response => {
            findByConditions()
            setUpdateProjects([]);
        }).catch(error => {
            console.error('メール取得エラー:', error);
        });}
    }
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
    const paginatedProjects = projects.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    const handleChange = (value) => {
        setSelectedValues((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value) // 如果已选中，则移除
                : [...prev, value] // 如果未选中，则添加
        );
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
        '0': { // 調整中
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
    function doUpdateProject() {
        console.log(updateProjects)
        if (updateProjects.length === 0) {
            setDoUpdate(true)
        } else {
            api.updateProjectsBatch(updateProjects).then(response => {
                findByConditions()
                setUpdateProjects([]);
            }).catch(error => {
                console.error('メール取得エラー:', error);
            });
        }
    }
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
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>findByConditions()}
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

                    {/* 終了 (value="0") */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedValues.includes("0")}
                                onChange={() => handleChange("0")}
                                value="0"
                                sx={{
                                    color: "inherit",
                                    "&.Mui-checked": {color: styles["0"].iconColor},
                                }}
                            />
                        }
                        label="終　了"
                        sx={{
                            height: "30px",
                            width: "95px",
                            fontSize: "12px",
                            padding: "0 8px",
                            ...(selectedValues.includes("0") && {
                                backgroundColor: styles["0"].bgcolor,
                                color: styles["0"].color,
                                border: `1px solid ${styles["0"].borderColor}`,
                                borderRadius: "4px",
                                "&:hover": {
                                    backgroundColor: styles["0"].bgcolor,
                                    opacity: 0.9,
                                },
                            }),
                        }}
                    />

                    {/* 提案済 (value="2") */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedValues.includes("2")}
                                onChange={() => handleChange("2")}
                                value="3"
                                sx={{
                                    color: "inherit",
                                    "&.Mui-checked": {color: styles["2"].iconColor},
                                }}
                            />
                        }
                        label="提案済"
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
                </Stack>
            </Box>
            <TableContainer component={Paper}
                            elevation={1}
                            sx={{
                                maxHeight: 600,
                                overflowX: 'auto',      // 横向滚动
                                overflowY: 'auto',      // 保留纵向滚动
                                position: 'relative'
                            }}
            >
                <Table stickyHeader sx={{
                    minWidth: 1600,           // 整张表的宽度（保证可横向滚动）
                    tableLayout: 'fixed'      // 列宽固定
                }}>
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
                                    indeterminate={selected.length > 0 && selected.length < projects.length}
                                    checked={projects.length > 0 && selected.length === projects.length}
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
                            }}>案件名</TableCell>
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
                                lineHeight: '1.5'
                            }}>場所</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '400px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>スキル条件</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5',
                                width: '160px'
                            }}>単価</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '100px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>期間</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '400px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>AI推薦技術者</TableCell>
                            <TableCell sx={{
                                fontWeight: 'bold',
                                border: '1px solid #ddd',
                                whiteSpace: 'nowrap',
                                width: '400px',
                                fontSize: '0.8rem',
                                py: 1,
                                lineHeight: '1.5'
                            }}>技術者
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

                        {paginatedProjects.map((project) => {
                            const isItemSelected = isSelected(project.id);
                            return (
                                <TableRow key={project.id}
                                          hover
                                          sx={{cursor: 'pointer', height: '48px'}}
                                          onClick={(event) => handleCheckboxClick(event, project.id)}
                                          role="checkbox"
                                          aria-checked={isItemSelected}
                                          selected={isItemSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleCheckboxClick(event, project.id)}
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
                                            value={project?.案件名}
                                            onChange={(e) => handleProjectFieldChange(project.id, '案件名', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <Select
                                            value={project.ステータス}
                                            onChange={(e) => {
                                                handleProjectFieldChange(project.id, 'ステータス', e.target.value)
                                            }}
                                            sx={(theme) => {
                                                const style = getSelectStyle(project.ステータス, theme);
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
                                            <MenuItem value="1">募集中</MenuItem>
                                            <MenuItem value="0">終 了</MenuItem>
                                            <MenuItem value="2">提案済</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <TextField
                                            value={project?.作業場所}
                                            onChange={(e) => handleProjectFieldChange(project.id, '作業場所', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        color: '#1976d2',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <TextField
                                            value={project?.必要なスキル}
                                            onChange={(e) => handleProjectFieldChange(project.id, '必要なスキル', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
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
                                            value={project?.単価}
                                            onChange={(e) => handleProjectFieldChange(project.id, '単価', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
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
                                            value={project?.期間}
                                            onChange={(e) => handleProjectFieldChange(project.id, '期間', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                        />
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        {project?.推薦案件ID1}
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <Select
                                            multiple
                                            value={Array.isArray(project.人材ID) ? project.人材ID : []}
                                            onChange={(e) => handleProjectFieldChange(project.id, '人材ID', e.target.value)}
                                            input={<OutlinedInput label="人材" />}
                                            renderValue={(selected) =>
                                                Array.isArray(selected)
                                                    ? selected
                                                        .map(id => staffs.find(t => t.人材ID === id)?.氏名 || id)
                                                        .join(', ')
                                                    : ''
                                            }
                                        >
                                            {staffs.map(staff => (
                                                <MenuItem key={staff.人材ID} value={staff.人材ID}>
                                                    <Checkbox
                                                        checked={(project.人材ID || []).includes(staff.人材ID)}
                                                    />
                                                    <ListItemText
                                                        primary={`${staff.氏名}（${staff.人材ID}）`}
                                                    />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                    <TableCell sx={{
                                        border: '1px solid #ddd',
                                        whiteSpace: 'nowrap',
                                        fontSize: '0.8rem',
                                        py: 1,
                                        lineHeight: '1.5'
                                    }}>
                                        <TextField
                                            value={project?.備考}
                                            onChange={(e) => handleProjectFieldChange(project.id, '備考', e.target.value)}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
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
                    count={projects.length}
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
                        variant="contained"s
                        color="warning"
                        sx={{fontSize: '0.7rem', py: 0.5, px: 1.5, minWidth: 'auto'}}
                        onClick={(event) => doUpdateProject()}
                    >
                        <EditDocumentIcon fontSize="small" sx={{mr: 1}}/>
                        更新
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={(event) => doDeleteProjects()}
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

export default ProjectTable;