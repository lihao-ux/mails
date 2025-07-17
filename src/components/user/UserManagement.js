import React, {useContext, useEffect, useState} from 'react';
import {
    Box, Button, Checkbox, FormControl, InputLabel, MenuItem, Select,
    Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, Typography, Paper, TablePagination
} from '@mui/material';
import { UserContext } from '../tools/UserContext';
import api from '../../api/api';
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers()
    }, []);
    const [status, setStatus] = useState('');
    const [searchName, setSearchName] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { user, logout } = useContext(UserContext);

    const handleSearch = () => {
        // 此处应发起请求，现在略过
        console.log('搜索', searchName, status);
    };
    const getUsers =() => {
        api.searchUsers()
            .then(response => {
                console.log(response)
                setUsers(response.data); // 将返回的邮件数据设置到 mails 数组中
            })
            .catch(error => {
                console.error('メール取得エラー:', error);
            });
    }
    return (
        <Box p={3}>
            <Typography variant="h6" mb={2}>ユーザー管理</Typography>

            {/* 搜索栏 */}
            <Stack direction="row" spacing={2} mb={2}>
                <TextField
                    label="ユーザー名を入力"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    size="small"
                />
                <FormControl size="small">
                    <InputLabel>ステータス</InputLabel>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)} label="ステータス">
                        <MenuItem value="">選択してください</MenuItem>
                        <MenuItem value="有効">有効</MenuItem>
                        <MenuItem value="無効">無効</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleSearch}>検索</Button>
            </Stack>

            {/* 表格 */}
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"><Checkbox /></TableCell>
                            <TableCell>ユーザー名</TableCell>
                            <TableCell>ロール</TableCell>
                            <TableCell>ステータス</TableCell>
                            <TableCell>最終ログイン</TableCell>
                            <TableCell>パスワード変更時間</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                            <TableRow key={user.id}>
                                <TableCell padding="checkbox"><Checkbox /></TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Typography color={user.status === '有効' ? 'green' : 'gray'}>{user.status}</Typography>
                                </TableCell>
                                <TableCell>{user.lastLogin}</TableCell>
                                <TableCell>{user.pwChange}</TableCell>
                            </TableRow>
                        ))}
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
                <Button variant="contained" color="success">＋ 登録</Button>
                <Button variant="contained" color="info">初期</Button>
                <Button variant="contained" color="error">削除</Button>
            </Stack>
        </Box>
    );
};

export default UserManagement;
