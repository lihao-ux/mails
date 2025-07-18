import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import { UserContext } from '../tools/UserContext';
import api from '../../api/api';

const UserRegistrationDialog = ({open, onClose, onRegister}) => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const { user, logout } = useContext(UserContext);
    const handleRegister = async () => {
        const params ={
            username:username,
            role: role,
            creator:user.username
        }
        const response =  await api.createUser(params)
        console.log(response)
        onRegister({username, role})
        setUsername('')
        setRole('')
        onClose()
    };
    useEffect(() => {
        if (!open) {
            setRole('')
            setUsername('')
        }
    }, [open]);
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">ユーザー登録</Typography>
            </DialogTitle>

            <DialogContent>
                <Typography variant="body1" paragraph>
                    必要な情報を入力してください
                </Typography>

                <Box mb={3}>
                    <Typography variant="subtitle1" gutterBottom>ユーザー名</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        placeholder="ユーザー名を入力してください"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Box>

                <Box mb={3}>
                    <Typography variant="subtitle1" gutterBottom>ロール</Typography>
                    <FormControl fullWidth size="small">
                        <InputLabel>ロールを選択してください</InputLabel>
                        <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="ロールを選択してください"
                        >
                            <MenuItem value="10">管理者</MenuItem>
                            <MenuItem value="30">一般ユーザー</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary">
                    キャンセル
                </Button>
                <Button
                    onClick={handleRegister}
                    color="primary"
                    variant="contained"
                    disabled={!username || !role}
                >
                    登録
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default UserRegistrationDialog;