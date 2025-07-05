import React, {useEffect, useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Tabs,
    Tab,
    Select,
    MenuItem,
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Breadcrumbs
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import api from "../api/api";

const MailDetailPage = () => {
    const [tabValue, setTabValue] = useState(1); // 默认显示人材情報管理标签
    const [mail, setMail] = useState({
        id: "",
        MSGID: "",
        種別: "",
        タイトル: "",
        送信者: "",
        CC: "",
        受信時刻: "",
        ステータス: "",
        本文_TEXT: "",
        本文_HTML: "",
        メールID: "",
        添付: "",
        作成者: "",
        作成時刻: "",
        更新者: "",
        更新時刻: "",
        related_data: []
    });
    const [relatedStaffs, setRelatedStaffs] = useState([]); // 用于存储 API 返回值
    const { msgid } = useParams();
    useEffect(() => {
        getMail()
    }, []);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
const getMail = (event) => {
    api.getMessageWithAttachments(msgid)
        .then(response => {
            setMail(response.data); // 将返回的邮件数据设置到 mails 数组中
            console.log("Loaded mail data:", mail); // 确认数据加载
        })
        .catch(error => {
            console.error('メール取得エラー:', error);
        });
}
    const handleStatusChange = (event) => {
        console.log(event.target.value)
        setMail({
            ...mail,
            ステータス: event.target.value
        });
        console.log("test",mail.ステータス)
    };
    const HtmlInput = ({html, ...props}) => {
        return (
            <div
                dangerouslySetInnerHTML={{__html: html}}
                style={{
                    padding: '16.5px 14px', // 匹配 TextField 默认内边距
                    whiteSpace: 'pre-wrap',
                    overflow: 'auto',
                    maxHeight: '200px',     // 限制高度触发滚动
                }}
                {...props}
            />
        );
    };
    const addPersonnelRow = () => {
        if (relatedStaffs.length > 0) {
            const newId = Math.max(...relatedStaffs.map(p => p.id)) + 1;
            setRelatedStaffs([...relatedStaffs, {
                id: newId,
                name: '',
                age: '',
                skill: '',
                availableTime: '',
                hourlyRate: '¥8500',
                details: ''
            }]);
        } else {
            setRelatedStaffs([...relatedStaffs, {
                id: 1,
                name: '',
                age: '',
                skill: '',
                availableTime: '',
                hourlyRate: '¥8500',
                details: ''
            }]);
        }
    };

    const deletePersonnelRow = (id) => {
        setRelatedStaffs(relatedStaffs.filter(p => p.id !== id));
    };

    const handlePersonnelChange = (id, field, value) => {
        setRelatedStaffs(relatedStaffs.map(p =>
            p.id === id ? {...p, [field]: value} : p
        ));
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
        },
        '11': { bgcolor: '#f5f5f5', color: '#666666', iconColor: '#999999' }   // 默认空状态
    };
    const getSelectStyle = (value, theme) => {
        return styles[value] || styles['11']; // 默认使用調整中样式
    };

    function doUpdateMail() {
        const updateArray = [
            {
                msgid: mail.MSGID,  // 替换成你的值
                status: mail.ステータス // 替换成你的值
            }
        ];
        api.updateMessagesStatusBatch(updateArray).then(response => {
            getMail()
        })
            .catch(error => {
                console.error('メール取得エラー:', error);
            });
    }

    return (
        <Box sx={{minHeight: '100vh', bgcolor: '#f5f5f5'}}>
            {/* 面包屑导航 */}
            <Box sx={{p: 1, mb: 1}}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    aria-label="breadcrumb"
                    sx={{fontSize: '0.875rem'}}
                >
                    <Link
                        underline="hover"
                        color="primary"
                        to="/mails"
                        sx={{cursor: 'pointer', fontSize: '0.875rem'}}
                    >
                        メール一覧
                    </Link>
                    <Typography color="text.primary" sx={{fontSize: '0.875rem'}}>
                        メール情報詳細
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Box sx={{display: 'flex', gap: 2, p: 2}}>
                <Paper sx={{flex: 1, p: 3}}>
                    <Typography variant="h6" sx={{mb: 3, borderBottom: '1px solid #ddd', pb: 1}}>
                        メール詳細
                    </Typography>

                    <Box sx={{mb: 1, mt: 1}}>
                        <Typography variant="subtitle1" sx={{mb: 1, color: '#666'}}>
                            受付日時
                        </Typography>
                        <TextField
                            fullWidth
                            value={mail.受信時刻}
                            variant="outlined"
                            size="small"
                            InputProps={{readOnly: true}}
                            sx={{bgcolor: '#f9f9f9'}}
                        />
                    </Box>

                    <Box sx={{mb: 1}}>
                        <Typography variant="subtitle1" sx={{mb: 1, color: '#666'}}>
                            差出者
                        </Typography>
                        <TextField
                            fullWidth
                            value={mail.送信者}
                            variant="outlined"
                            size="small"
                            InputProps={{readOnly: true}}
                            sx={{bgcolor: '#f9f9f9'}}
                        />
                    </Box>

                    <Box sx={{mb: 1}}>
                        <Typography variant="subtitle1" sx={{mb: 1, color: '#666'}}>
                            件名
                        </Typography>
                        <TextField
                            fullWidth
                            value={mail.タイトル}
                            variant="outlined"
                            size="small"
                            InputProps={{readOnly: true}}
                            sx={{bgcolor: '#f9f9f9'}}
                        />
                    </Box>

                    <Box sx={{mb: 1}}>
                        <Typography variant="subtitle1" sx={{mb: 1, color: '#666'}}>
                            本文
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            value="" // 必须留空，否则会覆盖自定义输入
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                                inputComponent: HtmlInput, // 替换默认 input 组件
                                inputProps: {html: mail.本文_HTML}, // 传递HTML内容
                            }}
                            sx={{
                                bgcolor: '#f9f9f9',
                                '& .MuiInputBase-root': {
                                    maxHeight: '300px',       // 容器高度限制
                                    overflow: 'auto',         // 滚动条
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{mb: 1}}>
                        <Typography variant="subtitle1" sx={{mb: 1, color: '#666'}}>
                            ステータス
                        </Typography>
                        <FormControl size="small" sx={{minWidth: 150}}>
                            <Select
                                value={mail.ステータス || ""}
                                onChange={handleStatusChange}
                                sx={(theme) => {
                                    const style = getSelectStyle(mail.ステータス || '', theme);
                                    return {
                                        height: '32px',
                                        fontSize: '12px',
                                        backgroundColor: style.bgcolor,
                                        color: style.color,
                                        '& .MuiSelect-icon': { color: style.iconColor },
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
                        </FormControl>
                    </Box>
                    <Box sx={{mb: 1}}>
                        <Typography variant="subtitle1" sx={{mb: 1, color: '#666'}}>
                            添付：履歴書リンク
                        </Typography>
                        <TextField
                            fullWidth
                            value={mail.link}
                            variant="outlined"
                            size="small"
                            InputProps={{readOnly: true}}
                            sx={{bgcolor: '#f9f9f9'}}
                        />
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: '#2196f3',
                                '&:hover': {bgcolor: '#1976d2'},
                                px: 4
                            }}
                            onClick={(event) => doUpdateMail()}
                        >
                            更新
                        </Button>
                    </Box>
                </Paper>

                {/* 右侧人员信息管理 */}
                <Paper sx={{flex: 1.5, p: 0}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="案件情報確認"/>
                            <Tab
                                label="人材情報管理"
                                sx={{
                                    color: tabValue === 1 ? '#2196f3' : 'inherit',
                                    fontWeight: tabValue === 1 ? 'bold' : 'normal'
                                }}
                            />
                        </Tabs>
                    </Box>

                    {/* 案件情報確認标签内容 */}
                    {tabValue === 0 && (
                        <Box sx={{p: 3}}>
                            <Typography>案件情報確認の内容がここに表示されます。</Typography>
                        </Box>
                    )}

                    {/* 人材情報管理标签内容 */}
                    {tabValue === 1 && (
                        <Box sx={{p: 3}}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{bgcolor: '#f8f9fa'}}>
                                            <TableCell sx={{fontWeight: 'bold', fontSize: '0.875rem'}}>氏名</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>年齢</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>スキル</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>稼働可能時間</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>想定単価</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>詳細</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {relatedStaffs.map((relatedStaff) => (
                                            <TableRow key={relatedStaff.id}>
                                                <TableCell>
                                                    <TextField
                                                        size="small"
                                                        placeholder="名前を..."
                                                        value={relatedStaff.name}
                                                        onChange={(e) => handlePersonnelChange(relatedStaff.id, 'name', e.target.value)}
                                                        sx={{minWidth: 100}}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        size="small"
                                                        placeholder="年..."
                                                        value={relatedStaff.age}
                                                        onChange={(e) => handlePersonnelChange(relatedStaff.id, 'age', e.target.value)}
                                                        sx={{width: 60}}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl size="small" sx={{minWidth: 80}}>
                                                        <Select
                                                            value={relatedStaff.skill}
                                                            onChange={(e) => handlePersonnelChange(relatedStaff.id, 'skill', e.target.value)}
                                                            displayEmpty
                                                        >
                                                            <MenuItem value="">スキル...</MenuItem>
                                                            <MenuItem value="Java">Java</MenuItem>
                                                            <MenuItem value="Python">Python</MenuItem>
                                                            <MenuItem value="React">React</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl size="small" sx={{minWidth: 80}}>
                                                        <Select
                                                            value={relatedStaff.availableTime}
                                                            onChange={(e) => handlePersonnelChange(relatedStaff.id, 'availableTime', e.target.value)}
                                                            displayEmpty
                                                        >
                                                            <MenuItem value="">Sele...</MenuItem>
                                                            <MenuItem value="フルタイム">フルタイム</MenuItem>
                                                            <MenuItem value="パートタイム">パートタイム</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        size="small"
                                                        value={relatedStaff.hourlyRate}
                                                        onChange={(e) => handlePersonnelChange(relatedStaff.id, 'hourlyRate', e.target.value)}
                                                        sx={{width: 80}}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        size="small"
                                                        placeholder="詳細を入力"
                                                        value={relatedStaff.details}
                                                        onChange={(e) => handlePersonnelChange(relatedStaff.id, 'details', e.target.value)}
                                                        sx={{minWidth: 100}}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => deletePersonnelRow(relatedStaff.id)}
                                                        sx={{color: '#f44336'}}
                                                    >
                                                        <DeleteIcon fontSize="small"/>
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3, px: 2}}>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddCircleOutlineIcon/>}
                                    onClick={addPersonnelRow}
                                    sx={{
                                        color: '#f44336',
                                        borderColor: '#f44336',
                                        '&:hover': {
                                            borderColor: '#d32f2f',
                                            bgcolor: 'rgba(244, 67, 54, 0.04)'
                                        }
                                    }}
                                >
                                    行追加
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#4caf50',
                                        '&:hover': {bgcolor: '#388e3c'}
                                    }}
                                >
                                    登録
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default MailDetailPage;