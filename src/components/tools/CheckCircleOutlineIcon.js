import React, {useState, useEffect} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    Alert,
    CircularProgress
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import api from '../../api/api';
import snackbar from "./Snackbar";

const PasswordChangeDialog = ({open, onClose, onPasswordChangeSuccess, username}) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // 添加加载状态
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        if (!open) {
            // 当对话框关闭时重置所有状态
            setNewPassword('');
            setConfirmPassword('');
            setErrors({
                current: false,
                new: false,
                confirm: false
            });
            setSuccess(false);
            setLoading(false);
            setErrorMessage('')
        }
    }, [open]);

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLengthValid = password.length >= 8;

        return {
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSpecialChar,
            isLengthValid,
            isValid: hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLengthValid
        };
    };

    const handleSubmit = async () => {
        const newErrors = {
            new: !validatePassword(newPassword).isValid,
            confirm: newPassword !== confirmPassword
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) {
            return;
        }

        setLoading(true);

        try {
            // 这里替换为实际的API调用
            // const response = await api.changePassword({ currentPassword, newPassword });
            // 模拟API调用
            const params = {
                username: username,
                new_password: newPassword
            }
            const response = await api.changePassword(params)
            console.log(response)
            if (!response.success){
                setErrorMessage(response.error)
                return
            }

            // 假设API调用成功
            setSuccess(true);

            // 通知父组件密码更改成功
            if (onPasswordChangeSuccess) {
                onPasswordChangeSuccess();
            }
        } catch (error) {
            console.log(11111)
            console.error('Password change failed:', error);
            // 显示错误消息
            setErrors({
                ...errors,
                current: true
            });
            // 这里可以添加更具体的错误处理
        } finally {
            setLoading(false);
        }
    };

    const passwordValidation = validatePassword(newPassword);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>初期パスワードの変更</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    セキュリティ保護のため、新しいパスワードを設定してください。
                </Typography>

                {success && (
                    <Alert severity="success" sx={{mb: 2}}>
                        パスワードが正常に変更されました
                    </Alert>
                )}
                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Alert>
                )}
                <Box sx={{mt: 2}}>
                    <TextField
                        fullWidth
                        label="新しいパスワード"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        error={errors.new}
                        helperText={errors.new && "8文字以上の英数字を含むパスワードを設定してください"}
                        margin="normal"
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        label="新しいパスワード（確認）"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={errors.confirm}
                        helperText={errors.confirm && "パスワードが一致しません"}
                        margin="normal"
                        disabled={loading}
                    />

                    <Box sx={{mt: 3, mb: 2}}>
                        <Typography variant="subtitle2" gutterBottom>
                            パスワード要件:
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Box display="flex" alignItems="center">
                                    <CheckCircleOutlineIcon
                                        color={passwordValidation.isLengthValid ? "success" : "disabled"}
                                        fontSize="small"
                                    />
                                    <Typography variant="body2" sx={{ml: 1}}>
                                        8文字以上
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" alignItems="center">
                                    <CheckCircleOutlineIcon
                                        color={passwordValidation.hasUpperCase ? "success" : "disabled"}
                                        fontSize="small"
                                    />
                                    <Typography variant="body2" sx={{ml: 1}}>
                                        大文字を含む
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" alignItems="center">
                                    <CheckCircleOutlineIcon
                                        color={passwordValidation.hasLowerCase ? "success" : "disabled"}
                                        fontSize="small"
                                    />
                                    <Typography variant="body2" sx={{ml: 1}}>
                                        小文字を含む
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" alignItems="center">
                                    <CheckCircleOutlineIcon
                                        color={passwordValidation.hasNumber ? "success" : "disabled"}
                                        fontSize="small"
                                    />
                                    <Typography variant="body2" sx={{ml: 1}}>
                                        数字を含む
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box display="flex" alignItems="center">
                                    <CheckCircleOutlineIcon
                                        color={passwordValidation.hasSpecialChar ? "success" : "disabled"}
                                        fontSize="small"
                                    />
                                    <Typography variant="body2" sx={{ml: 1}}>
                                        記号を含む
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{p: 3}}>
                <Button onClick={onClose} variant="outlined" disabled={loading}>
                    キャンセル
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!newPassword || !confirmPassword || loading}
                    sx={{position: 'relative'}}
                >
                    {loading ? (
                        <>
                            <CircularProgress size={24} sx={{
                                color: 'inherit',
                                position: 'absolute',
                                left: '50%',
                                marginLeft: '-12px',
                            }}/>
                            <span style={{opacity: 0}}>パスワードを変更</span>
                        </>
                    ) : 'パスワードを変更'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PasswordChangeDialog;