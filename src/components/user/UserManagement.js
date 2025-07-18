import React, {useContext, useEffect, useState} from 'react';
import {
    Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Select,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Typography, Paper, TablePagination
} from '@mui/material';
import {UserContext} from '../tools/UserContext';
import UserRegistrationDialog from '../tools/UserRegistrationDialog'
import api from '../../api/api';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import ja from "date-fns/locale/ja";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        getUsers()
    }, []);
    const [status, setStatus] = useState('');
    const [searchName, setSearchName] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const {user, logout} = useContext(UserContext);
    const [selected, setSelected] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchParams,setSearchParams] = useState({
        username:'',
        status:'',
        last_login_from:null,
        last_login_to:null
    });
    const handleSearch = () => {
        // 此处应发起请求，现在略过
        console.log('搜索', searchParams);
    };
    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((user) => user.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
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
    const isSelected = (id) => selected.indexOf(id) !== -1;
    const getUsers = () => {
        const params ={
            username:searchParams.username,
            status:searchParams.status,
            last_login_from:dateParse(searchParams.last_login_from),
            last_login_to:dateParse(searchParams.last_login_to),
            limit:100
        }
        api.searchUsers(params)
            .then(response => {
                console.log(response)
                setUsers(response.data)
                // 将返回的邮件数据设置到 mails 数组中
            })
            .catch(error => {
                console.error('メール取得エラー:', error);
            });
    }
    const doResetUsersStatus = async () => {
        const params = {
            userIds:selected,
            updater:user.username
        }
        api.resetUsersStatus(params)
            .then(response => {
                console.log(response)
                getUsers()
                // 将返回的邮件数据设置到 mails 数组中
            })
            .catch(error => {
                console.error('メール取得エラー:', error);
            });
    }
    const doDeleteUser = async () => {
        const params = {
            userIds:selected,
            updater:user.username
        }
        api.deleteUsers(params)
            .then(response => {
                getUsers()
                // 将返回的邮件数据设置到 mails 数组中
            })
            .catch(error => {
                console.error('メール取得エラー:', error);
            });
    }
    const updateSearchParam = (fieldName, value) => {
        console.log(fieldName,value)
        setSearchParams(prev => ({
            ...prev,
            [fieldName]: value // 动态属性名
        }));
    };
    const dateParse = (newValue) => {
        if (newValue!=null){
            const year = newValue.getFullYear();
            const month = String(newValue.getMonth() + 1).padStart(2, '0');
            const day = String(newValue.getDate()).padStart(2, '0');
            console.log(`${year}-${month}-${day}`)
            return `${year}-${month}-${day}`
        }
        return newValue;
    };
    return (
        <Box p={3}>
            <Typography variant="h6" mb={2}>ユーザー管理</Typography>

            {/* 搜索栏 */}
            <Stack direction="row" spacing={2} mb={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
                    <Stack direction="row" spacing={2} mb={2} alignItems="center">
                        {/* 用户名搜索 */}
                        <TextField
                            label="ユーザー名を入力"
                            value={searchParams.username}
                            onChange={(e) => updateSearchParam('username', e.target.value)}
                            size="small"
                            sx={{ flex: 1 }}
                        />

                        {/* 状态选择 */}
                        <FormControl size="small" sx={{ width: 200 }}>
                            <InputLabel>ステータス</InputLabel>
                            <Select value={searchParams.status} onChange={(e) => updateSearchParam('status', e.target.value)} label="ステータス">
                                <MenuItem value="">選択してください</MenuItem>
                                <MenuItem value="1">有効</MenuItem>
                                <MenuItem value="2">無効</MenuItem>
                            </Select>
                        </FormControl>

                        {/* 开始日期 */}
                        <DatePicker
                            label="開始日"
                            value={searchParams.last_login_from}
                            onChange={(newValue) => {updateSearchParam('last_login_from', newValue);}}
                            slotProps={{ textField: { size: 'small', sx: { width: 150 } } }}
                        />

                        {/* 结束日期 */}
                        <DatePicker
                            label="終了日"
                            value={searchParams.last_login_to}
                            onChange={(newValue) => {updateSearchParam('last_login_to', newValue);}}
                            slotProps={{ textField: { size: 'small', sx: { width: 150 } } }}
                            minDate={startDate} // 可选：限制结束日期不能早于开始日期
                        />

                        {/* 搜索按钮 */}
                        <Button variant="contained"   sx={{
                            height: '45px', // 与 TextField 高度一致
                            minWidth: '80px' // 防止文字被挤压
                        }} onClick={getUsers}>検索</Button>
                    </Stack>
                </LocalizationProvider>
            </Stack>

            {/* 表格 */}
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    indeterminate={selected.length > 0 && selected.length < users.length}
                                    checked={users.length > 0 && selected.length === users.length}
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell>ユーザー名</TableCell>
                            <TableCell>ロール</TableCell>
                            <TableCell>ステータス</TableCell>
                            <TableCell>最終ログイン</TableCell>
                            <TableCell>パスワード変更時間</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
                            const isItemSelected = isSelected(user.id);
                            return (<TableRow key={user.id}
                                       hover
                                       sx={{cursor: 'pointer', height: '48px'}}
                                       onClick={(event) => handleCheckboxClick(event, user.id)}
                                       role="checkbox"
                                       aria-checked={isItemSelected}
                                       selected={isItemSelected}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            onChange={(event) => handleCheckboxClick(event, user.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Typography color={user.status === '1' ? 'green' : 'gray'}>
                                            {user.status === '1' ? '有効' : '無効'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>{user.last_login}</TableCell>
                                    <TableCell>{user.last_password_changed}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 分页 */}
            <TablePagination
                component="div"
                count={users.length}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[10, 20, 50]}
                labelRowsPerPage="表示件数:"
            />

            {/* 按钮 */}
            <Stack direction="row" spacing={2} mt={2}>
                <Button onClick={() => setOpenDialog(true)} variant="contained" color="success">＋ 登録</Button>
                <Button onClick={doResetUsersStatus}　variant="contained" color="info">初期</Button>
                <Button onClick={doDeleteUser} variant="contained" color="error">削除</Button>
            </Stack>
            <UserRegistrationDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onRegister={(userData) => console.log('Register:', userData)}
            />
        </Box>
    );
};

export default UserManagement;
