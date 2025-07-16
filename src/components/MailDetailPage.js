import React, {useEffect, useState,useRef} from 'react';
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
import EditablePopoverCell from './tools/EditablePopoverCell';
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
    const [relatedEvents, setRelatedEvents] = useState([]); // 用于存储 API 返回值
    const { msgid } = useParams();
    useEffect(() => {
        getMail()
    }, []);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const scrollRef = useRef(null);
    const [scrollTop, setScrollTop] = useState(0);
    const handleScroll = () => {
        if (scrollRef.current) {
            setScrollTop(scrollRef.current.scrollTop);
        }
    };
  useEffect(() => {
           if (scrollRef.current && mail.本文_HTML) {
                 scrollRef.current.scrollTop = 0; // 仅在切换 HTML 时复位
               }
         }, [mail.本文_HTML]);
const getMail = (event) => {
    api.getMessageWithAttachments(msgid)
        .then(response => {
            setMail(response.data); // 将返回的邮件数据设置到 mails 数组中
            const list = response.data.related_data;
            const type =response.data.種別;
            const staffId = list?.[0]?.人材ID;
            const eventId = list?.[0]?.案件ID;
            if(type ==='人材'||(typeof staffId === 'string' && staffId.trim() !== '')){
                setRelatedStaffs(list)
                setTabValue(1)
            }else
            if(type ==='案件'||(typeof eventId === 'string' && eventId.trim() !== '')){
                setRelatedEvents(list)
                setTabValue(0)
            }

        })
        .catch(error => {
            console.error('メール取得エラー:', error);
        });
}
    const handleStatusChange = (event) => {
        setMail({
            ...mail,
            ステータス: event.target.value
        });
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
                msgid:mail.MSGID,
                氏名: '',
                年齢: '',
                スキル: '',
                最寄駅: '',
                稼働可能時間: '',
                日本語: '',
                英語: '',
                稼働年数: '',
                来日年数: '',
                履歴書: '',
                備考: ''
            }]);
        } else {
            setRelatedStaffs([...relatedStaffs, {
                id: 1,
                msgid:mail.MSGID,
                氏名: '',
                年齢: '',
                スキル: '',
                最寄駅: '',
                稼働可能時間: '',
                日本語: '',
                英語: '',
                稼働年数: '',
                来日年数: '',
                履歴書: '',
                備考: ''
            }]);
        }
    };
    const addEventsRow = () => {
        if (relatedEvents.length > 0) {
            const newId = Math.max(...relatedEvents.map(e => e.id)) + 1;
            setRelatedEvents([...relatedEvents, {
                id: newId,
                案件名: '',
                msgid:mail.MSGID,
                案件概要: '',
                作業工程: '',
                作業場所: '',
                期間: '',
                必要なスキル: '',
                単価: '',
                時間制限: '',
                連絡先: '',
                備考: ''
            }]);
        } else {
            setRelatedEvents([...relatedStaffs, {
                id: 1,
                案件名: '',
                msgid:mail.MSGID,
                案件概要: '',
                作業工程: '',
                作業場所: '',
                期間: '',
                必要なスキル: '',
                単価: '',
                時間制限: '',
                連絡先: '',
                備考: ''
            }]);
        }
    };

    const deletePersonnelRow = (id) => {
        setRelatedStaffs(relatedStaffs.filter(p => p.id !== id));
    };
    const deleteEventRow = (id) => {
        setRelatedEvents(relatedEvents.filter(e => e.id !== id));
    };

    const handlePersonnelChange = (id, field, value) => {
        setRelatedStaffs(relatedStaffs.map(p =>
            p.id === id ? {...p, [field]: value} : p
        ));
    };
    const handleEventChange = (id, field, value) => {
        setRelatedEvents(relatedEvents.map(e =>
            e.id === id ? {...e, [field]: value} : e
        ))
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

    function doSubmitEvents() {
        const params = {
            msg:mail.MSGID,
            relatedEvents:relatedEvents
        }
        console.log(params)
    }

    function doSubmitStaffs() {
        const params = {
            MSGID:mail.MSGID,
            relatedStaffs:relatedStaffs
        }
        console.log(params)
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

                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, color: '#666' }}>
                            本文
                        </Typography>

                        <Box
                            ref={scrollRef}
                            onScroll={handleScroll}
                            sx={{
                                bgcolor: '#f9f9f9',
                                p: 2,
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                maxHeight: '300px',
                                overflow: 'auto',
                                whiteSpace: 'pre-wrap',
                            }}
                            dangerouslySetInnerHTML={{ __html: mail.本文_HTML }}
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
                        <Box sx={{width: '900px',
                            overflowX: 'auto',
                            p: 3,
                            whiteSpace: 'nowrap'}}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{bgcolor: '#f8f9fa'}}>
                                            <TableCell sx={{fontWeight: 'bold', fontSize: '0.875rem'}}>案件名</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>案件概要</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>作業工程</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>作業場所</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>期間</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>必要なスキル</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>募集人数</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>単価</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>時間制限</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>連絡先</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>備考</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {relatedEvents.map((relatedEvent) => (
                                            <TableRow key={relatedEvent.id}>
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="案件名"
                                                    value={relatedEvent.案件名}
                                                    placeholder="案件名を..."
                                                    onChange={handleEventChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="案件概要"
                                                    value={relatedEvent.案件概要}
                                                    placeholder="案件概要を..."
                                                    onChange={handleEventChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="作業工程"
                                                    value={relatedEvent.作業工程}
                                                    placeholder="作業工程を..."
                                                    onChange={handleEventChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="作業場所"
                                                    value={relatedEvent.作業場所}
                                                    placeholder="作業場所を..."
                                                    onChange={handleEventChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="期間"
                                                    value={relatedEvent.期間}
                                                    placeholder="期間を..."
                                                    onChange={handleEventChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="必要なスキル"
                                                    value={relatedEvent.必要なスキル}
                                                    placeholder="必要なスキルを..."
                                                    onChange={handleEventChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="募集人数"
                                                    value={relatedEvent.募集人数}
                                                    placeholder="募集人数を..."
                                                    onChange={handleEventChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="単価"
                                                    value={relatedEvent.単価}
                                                    placeholder="単価を..."
                                                    onChange={handleEventChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="時間制限"
                                                    value={relatedEvent.時間制限}
                                                    placeholder="時間制限を..."
                                                    onChange={handleEventChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="連絡先"
                                                    value={relatedEvent.連絡先}
                                                    placeholder="連絡先を..."
                                                    onChange={handleEventChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedEvent.id}
                                                    fieldKey="備考"
                                                    value={relatedEvent.備考}
                                                    placeholder="備考を..."
                                                    onChange={handleEventChange}
                                                />
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => deleteEventRow(relatedEvent.id)}
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
                                    onClick={addEventsRow}
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
                                    onClick={doSubmitEvents}
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

                    {/* 人材情報管理标签内容 */}
                    {tabValue === 1 && (
                        <Box sx={{width: '900px',
                            overflowX: 'auto',
                            p: 3,
                            whiteSpace: 'nowrap'}}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{bgcolor: '#f8f9fa'}}>
                                            <TableCell sx={{fontWeight: 'bold', fontSize: '0.875rem'}}>氏名</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>年齢</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>スキル</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>最寄駅</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>稼働可能時間</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>単価</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>日本語</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>英語</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>稼働年数</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>来日年数</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>営業状況</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>履歴書</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>備考</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {relatedStaffs.map((relatedStaff) => (
                                            <TableRow key={relatedStaff.id}>
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="氏名"
                                                    value={relatedStaff.氏名}
                                                    placeholder="氏名を..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="年齢"
                                                    value={relatedStaff.年齢}
                                                    placeholder="年齢を..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="スキル"
                                                    value={relatedStaff.スキル}
                                                    placeholder="スキルを..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="最寄駅"
                                                    value={relatedStaff.最寄駅}
                                                    placeholder="最寄駅を..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="稼働可能時間"
                                                    value={relatedStaff.稼働可能時間}
                                                    placeholder="稼働可能時間を..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="単価"
                                                    value={relatedStaff.単価}
                                                    placeholder="単価を..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="日本語"
                                                    value={relatedStaff.日本語}
                                                    placeholder="日本語を..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="英語"
                                                    value={relatedStaff.英語}
                                                    placeholder="英語を..."
                                                    onChange={handlePersonnelChange}
                                                />

                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="稼働年数"
                                                    value={relatedStaff.稼働年数}
                                                    placeholder="稼働年数を..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="来日年数"
                                                    value={relatedStaff.来日年数}
                                                    placeholder="来日年数を..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="営業状況"
                                                    value={relatedStaff.営業状況}
                                                    placeholder="営業状況を..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="スキルシート"
                                                    value={relatedStaff.スキルシート}
                                                    placeholder="履歴書を..."
                                                    onChange={handlePersonnelChange}
                                                />
                                                <EditablePopoverCell
                                                    id={relatedStaff.id}
                                                    fieldKey="備考"
                                                    value={relatedStaff.備考}
                                                    placeholder="備考を..."
                                                    onChange={handlePersonnelChange}
                                                />
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
                                    onClick={doSubmitStaffs}
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