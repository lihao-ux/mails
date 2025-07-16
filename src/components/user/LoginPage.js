import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import snackbar from '../tools/Snackbar';
import PasswordChangeDialog from '../tools/CheckCircleOutlineIcon';
import api from '../../api/api';
const LoginPage = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        username: false,
        password: false
    });
    const [openDialog, setOpenDialog] = useState(false);
    const handlePasswordChangeSuccess = () => {
        setIsAuthenticated(true);
        navigate('/');
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // 输入时清除错误状态
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: false
            }));
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const doLogin = async (e) => {
        e.preventDefault();

        // 验证邮箱格式
        const isEmailValid = validateEmail(formData.username);
        const isPasswordValid = formData.password.length > 0;

        setErrors({
            username: !isEmailValid,
            password: !isPasswordValid
        });

        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        try {
            // 异步调用API
            const response = await api.authenticateUser(formData);
            console.log(response)
            if (response.user.status==='0') {
                setIsAuthenticated(true);
                navigate('/');
            } else if (response.user.status==='1'){
                snackbar.show('3回以上パス間違った、管理者ログインしてアカウント初期化必要', 'error');
            }else if (response.user.status==='2'){
                setOpenDialog(true);
            }
        } catch (error) {
            snackbar.show(error.error, 'error');
        } finally {
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                bgcolor: '#f5f5f5'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: '400px',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h4" sx={{ mb: 4 }}>
                    社内システムログイン
                </Typography>

                <Box sx={{ mb: 3, textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        メールアドレス
                    </Typography>
                    <TextField
                        fullWidth
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="company@example.com"
                        variant="outlined"
                        size="small"
                        required
                        error={errors.username}
                        helperText={errors.username && "有効なメールアドレスを入力してください"}
                    />
                </Box>

                <Box sx={{ mb: 4, textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        パスワード
                    </Typography>
                    <TextField
                        fullWidth
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        variant="outlined"
                        size="small"
                        required
                        error={errors.password}
                        helperText={errors.password && "パスワードを入力してください"}
                    />
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    onClick={doLogin}
                    size="large"
                    sx={{
                        mb: 3,
                        py: 1.5,
                        bgcolor: '#2196f3',
                        '&:hover': { bgcolor: '#1976d2' }
                    }}
                >
                    ログイン
                </Button>

                <Typography variant="body2" color="textSecondary">
                    アカウントに関するお問い合わせは、システム管理者までご連絡ください。
                    <br />
                    <Link href="mailto:system-admin@company.com">
                        system-admin@company.com
                    </Link>
                </Typography>
            </Paper>
            <PasswordChangeDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onPasswordChangeSuccess={handlePasswordChangeSuccess}
            />
        </Box>
    );
};

export default LoginPage;