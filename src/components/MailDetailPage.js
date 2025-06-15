import React, { useState } from 'react';
import {Link } from 'react-router-dom';
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

const MailDetailPage = () => {
  const [tabValue, setTabValue] = useState(1); // 默认显示人材情報管理标签
  const [status, setStatus] = useState('ステータス１');
  const [personnel, setPersonnel] = useState([
    { id: 1, name: '', age: '', skill: '', availableTime: '', hourlyRate: '¥8500', details: '' },
    { id: 2, name: '', age: '', skill: '', availableTime: '', hourlyRate: '¥8500', details: '' },
    { id: 3, name: '', age: '', skill: '', availableTime: '', hourlyRate: '¥8500', details: '' }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const addPersonnelRow = () => {
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
  };

  const deletePersonnelRow = (id) => {
    setPersonnel(personnel.filter(p => p.id !== id));
  };

  const handlePersonnelChange = (id, field, value) => {
    setPersonnel(personnel.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* 面包屑导航 */}
      <Box sx={{ p: 1, mb: 1 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ fontSize: '0.875rem' }}
        >
          <Link
            underline="hover"
            color="primary"
            to="/mails"
            sx={{ cursor: 'pointer', fontSize: '0.875rem' }}
          >
            メール一覧
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.875rem' }}>
            メール情報詳細
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
        {/* 左侧邮件详情 */}
        <Paper sx={{ flex: 1, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, borderBottom: '1px solid #ddd', pb: 1 }}>
            メール詳細
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: '#666' }}>
              受付日時
            </Typography>
            <TextField
              fullWidth
              value="2023年09月08日 19:40:53"
              variant="outlined"
              size="small"
              InputProps={{ readOnly: true }}
              sx={{ bgcolor: '#f9f9f9' }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: '#666' }}>
              差出者
            </Typography>
            <TextField
              fullWidth
              value="yamada@company.co.jp"
              variant="outlined"
              size="small"
              InputProps={{ readOnly: true }}
              sx={{ bgcolor: '#f9f9f9' }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: '#666' }}>
              件名
            </Typography>
            <TextField
              fullWidth
              value="契約者の情報について"
              variant="outlined"
              size="small"
              InputProps={{ readOnly: true }}
              sx={{ bgcolor: '#f9f9f9' }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: '#666' }}>
              本文
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={8}
              value="これは契約者の情報についてのメールを送ります。詳細な情報はここに表示されます。送信者: yamada@company.co.jp"
              variant="outlined"
              InputProps={{ readOnly: true }}
              sx={{ bgcolor: '#f9f9f9' }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, color: '#666' }}>
              ステータス
            </Typography>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={status}
                onChange={handleStatusChange}
              >
                <MenuItem value="ステータス１">ステータス１</MenuItem>
                <MenuItem value="ステータス２">ステータス２</MenuItem>
                <MenuItem value="ステータス３">ステータス３</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#2196f3', 
                '&:hover': { bgcolor: '#1976d2' },
                px: 4
              }}
            >
              更新
            </Button>
          </Box>
        </Paper>

        {/* 右侧人员信息管理 */}
        <Paper sx={{ flex: 1.5, p: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="案件情報確認" />
              <Tab 
                label="人材情報管理" 
                sx={{ 
                  color: tabValue === 1 ? '#2196f3' : 'inherit',
                  fontWeight: tabValue === 1 ? 'bold' : 'normal'
                }} 
              />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Typography>案件情報確認の内容がここに表示されます。</Typography>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>氏名</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>年齢</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>スキル</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>稼働可能時間</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>想定単価</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>詳細</TableCell>
                    <TableCell width={50}></TableCell>
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
                          sx={{ minWidth: 100 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          placeholder="年..."
                          value={person.age}
                          onChange={(e) => handlePersonnelChange(person.id, 'age', e.target.value)}
                          sx={{ width: 60 }}
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl size="small" sx={{ minWidth: 80 }}>
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
                        <FormControl size="small" sx={{ minWidth: 80 }}>
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
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          placeholder="詳細を入力"
                          value={person.details}
                          onChange={(e) => handlePersonnelChange(person.id, 'details', e.target.value)}
                          sx={{ minWidth: 100 }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => deletePersonnelRow(person.id)}
                          sx={{ color: '#f44336' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, px: 2 }}>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
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
                  '&:hover': { bgcolor: '#388e3c' }
                }}
              >
                登録
              </Button>
            </Box>
          </TabPanel>
        </Paper>
      </Box>
    </Box>
  );
};

export default MailDetailPage;