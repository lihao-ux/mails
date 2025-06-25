import React, {useState} from 'react';
import {Link} from 'react-router-dom';
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
import {
    CheckCircle,       // 通过 (绿色)
    Warning,           // 警告 (黄色)
    Error
} from '@mui/icons-material';

const MailDetailPage = () => {
    const [tabValue, setTabValue] = useState(1); // 默认显示人材情報管理标签
    const [status, setStatus] = useState('1');
    const [personnel, setPersonnel] = useState([
        {id: 1, name: '', age: '', skill: '', availableTime: '', hourlyRate: '¥8500', details: ''},
        {id: 2, name: '', age: '', skill: '', availableTime: '', hourlyRate: '¥8500', details: ''},
        {id: 3, name: '', age: '', skill: '', availableTime: '', hourlyRate: '¥8500', details: ''}
    ]);
    const mail =
        {
            id: 1,
            status: '1',
            category: '人材情報',
            date: '2025/03/08 20:40',
            sender: 'yamada@company.co.jp',
            subject: '契約書の締結について',
            html: '<div dir="ltr"><br><div class="gmail_quote gmail_quote_container"><div dir="ltr"><span style="font-size:large;font-weight:bold">Forwarded Conversation</span><br><span style="font-weight:bold">Subject: 李寧さんの交代要員について</span><br>------------------------<br></div><br><div dir="ltr" class="gmail_attr" style="color:#888">发件人： <strong class="gmail_sendername" dir="auto">錦沢 直樹（NISHIKIZAWA Naoki）</strong> <span dir="auto">&lt;nnishiki@crossfusion.co.jp&gt;</span><br>Date: 2025年3月3日周一 12:56<br>To: CHIHARU KURODA &lt;&gt;<br>Cc:  &lt;&gt;, 李 正遠 (LI Zhengyuan) &lt;&gt;, 魏 巍 (WEI Wei) &lt;&gt;<br></div><br><br>',
            link: '李昊履历书.xls'
        }
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
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
        if (personnel.length > 0) {
            const newId = Math.max(...personnel.map(p => p.id)) + 1;
            setPersonnel([...personnel, {
                id: newId,
                name: '',
                age: '',
                skill: '',
                availableTime: '',
                hourlyRate: '¥8500',
                details: ''
            }]);
        } else {
            setPersonnel([...personnel, {
                id: 1,
                name: '',
                age: '',
                skill: '',
                availableTime: '',
                hourlyRate: '¥8500',
                details: ''
            }]);
        }

        console.log(personnel)
    };

    const deletePersonnelRow = (id) => {
        setPersonnel(personnel.filter(p => p.id !== id));
    };

    const handlePersonnelChange = (id, field, value) => {
        setPersonnel(personnel.map(p =>
            p.id === id ? {...p, [field]: value} : p
        ));
        console.log(personnel);
    };

    const TabPanel = ({children, value, index, ...other}) => (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {/* 移除条件渲染，始终保留 children */}
            <Box sx={{p: 3}}>{children}</Box>
        </div>
    );

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
                            value={mail.date}
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
                            value={mail.sender}
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
                            value={mail.subject}
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
                                inputProps: {html: mail.html}, // 传递HTML内容
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
                                value={status}
                                onChange={handleStatusChange}
                            >
                                <MenuItem value="1"><CheckCircle sx={{fontSize: '14px'}}
                                                                 color="success"/> 解約成功</MenuItem>
                                <MenuItem value="２"><Warning sx={{fontSize: '14px'}}
                                                             color="warning"/> 解約失敗</MenuItem>
                                <MenuItem value="３"><Error sx={{fontSize: '14px'}} color="error"/> 解約対象</MenuItem>
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
                                        {personnel.map((person) => (
                                            <TableRow key={person.id}>
                                                <TableCell>
                                                    <TextField
                                                        size="small"
                                                        placeholder="名前を..."
                                                        value={person.name}
                                                        onChange={(e) => handlePersonnelChange(person.id, 'name', e.target.value)}
                                                        sx={{minWidth: 100}}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        size="small"
                                                        placeholder="年..."
                                                        value={person.age}
                                                        onChange={(e) => handlePersonnelChange(person.id, 'age', e.target.value)}
                                                        sx={{width: 60}}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormControl size="small" sx={{minWidth: 80}}>
                                                        <Select
                                                            value={person.skill}
                                                            onChange={(e) => handlePersonnelChange(person.id, 'skill', e.target.value)}
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
                                                            value={person.availableTime}
                                                            onChange={(e) => handlePersonnelChange(person.id, 'availableTime', e.target.value)}
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
                                                        value={person.hourlyRate}
                                                        onChange={(e) => handlePersonnelChange(person.id, 'hourlyRate', e.target.value)}
                                                        sx={{width: 80}}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        size="small"
                                                        placeholder="詳細を入力"
                                                        value={person.details}
                                                        onChange={(e) => handlePersonnelChange(person.id, 'details', e.target.value)}
                                                        sx={{minWidth: 100}}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => deletePersonnelRow(person.id)}
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