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
    Checkbox
} from '@mui/material';
import MailDetailDialog from '../MailDetailDialog'; // 导入封装好的对话框组件
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
const MailListTable = ({ mails, handleDetailClick }) => {
    const [selected, setSelected] = useState([]);
    const [warnOpen, setWarnOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedMail, setSelectedMail] = useState(null);
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
            const mail = mails.find(mail => mail.id === firstSelectedId);
            console.log(mail)
            setSelectedMail(mail);
            setDetailOpen(true);
        }
    };
    const handleCloseDialog = () => {
        setDetailOpen(false);
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
    // 检查是否选中
    const isSelected = (id) => selected.indexOf(id) !== -1;
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
    return (
        <Box>
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
                        {mails.map((mail) => {
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
            <MailDetailDialog
                open={detailOpen}
                onClose={handleCloseDialog}
                mail={selectedMail}
            />
        </Box>
    );
};

export default MailListTable;