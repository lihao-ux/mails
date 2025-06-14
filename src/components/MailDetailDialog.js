// MailDetailDialog.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Tabs,
  Tab,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Box
} from '@mui/material';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
const MailDetailDialog = ({ open, onClose, mail }) => {
  const [detailTab, setDetailTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    skill: '',
    startDate: null,
    duration: '',
    status: '',
    details: ''
  });
  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };
  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      startDate: date
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('表单数据:', formData);
    // 这里添加提交逻辑
  };


  const handleDetailTabChange = (event, newValue) => {
    setDetailTab(newValue);
  };

  if (!mail) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ fontSize: '1rem', py: 1 }}>メール詳細</DialogTitle>
      <DialogContent dividers sx={{ overflow: 'hidden', fontSize: '0.875rem' }}>
        <Grid container spacing={1} sx={{ flexWrap: 'nowrap', overflow: 'hidden' }}>
          {/* 左侧区域 - 邮件内容 */}
          <Grid item sx={{
            minWidth: '50%',
            overflow: 'hidden',
            pr: 1,
            height: 600,
            borderRight: '1px solid #e0e0e0'
          }}>
            <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
              受信日時
            </Typography>
            <Typography variant="body2" sx={{
              fontSize: '0.8125rem',
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: 0.5,
              mb: 1
            }}>
              {mail.date}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5, mt: 1 }}>
              分類
            </Typography>
            <Typography variant="body2" sx={{
              fontSize: '0.8125rem',
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: 0.5,
              mb: 1
            }}>
              {mail.category}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5, mt: 1 }}>
              送信者
            </Typography>
            <Typography variant="body2" sx={{
              fontSize: '0.8125rem',
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: 0.5,
              mb: 1
            }}>
              {mail.sender}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5, mt: 1 }}>
              件名
            </Typography>
            <Typography variant="body2" sx={{
              fontSize: '0.8125rem',
              borderBottom: "1px solid #e0e0e0",
              paddingBottom: 0.5,
              mb: 1
            }}>
              {mail.subject}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5, mt: 1 }}>
              本文
            </Typography>
            <Paper variant="outlined" sx={{ p: 1, minHeight: 60, fontSize: '0.8125rem' }}>
              <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                これは{mail.subject}についてのメール本文です。詳細な情報がここに表示されます。送信者: {mail.sender}
              </Typography>
            </Paper>
            <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5, mt: 1 }}>
              ステータス
            </Typography>
            <Typography variant="body2" color="error" sx={{ fontSize: '0.8125rem', mb: 1.5 }}>
              解析失敗
            </Typography>
          </Grid>
          {/* 右侧区域 - 导航和表单 */}
          <Grid item sx={{
            minWidth: '50%',
            overflow: 'hidden',
            pl: 1
          }}>
            <Tabs
              value={detailTab}
              onChange={handleDetailTabChange}
              variant="fullWidth"
              TabIndicatorProps={{ style: { backgroundColor: '#32cd32' } }} // 浅绿色横线
              sx={{
                mb: 1.5,
                minHeight: 40,
                '& .MuiTab-root': {
                  fontSize: '0.8125rem',
                  padding: '6px 12px',
                  minHeight: 40
                }
              }}
            >
              <Tab label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <DescriptionOutlinedIcon fontSize="small" />
                  <span>案件情報登録</span>
                </Stack>
              } sx={{
                backgroundColor: 'transparent', // 默认背景透明
                '&.Mui-selected': {
                  color: '#32cd32', // 选中时字体绿色
                  backgroundColor: 'transparent', // 保持选中状态时背景仍透明
                },
              }} />
              <Tab label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PermIdentityOutlinedIcon fontSize="small" />
                  <span>人材情報登録</span>
                </Stack>
              } sx={{
                backgroundColor: 'transparent', // 默认背景透明
                '&.Mui-selected': {
                  color: '#32cd32', // 选中时字体绿色
                  backgroundColor: 'transparent', // 保持选中状态时背景仍透明
                },
              }} />
            </Tabs>
            {detailTab === 0 && (
              <Box sx={{ '& > *:not(:last-child)': { mb: 0.3 } }}>
                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  案件名
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="案件名を入力"
                  sx={{ mb: 0.75, maxWidth: 550 }}
                  InputProps={{ sx: { fontSize: '0.8125rem' } }}
                />
                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  場所
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  select
                  SelectProps={{
                    native: true,
                    sx: { fontSize: '0.8125rem' }
                  }}
                  sx={{ mb: 0.75, maxWidth: 550 }}
                >
                  <option value="">場所を選択</option>
                  <option value="tokyo">東京</option>
                  <option value="osaka">大阪</option>
                </TextField>
                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  必要スキル
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  select
                  SelectProps={{
                    native: true,
                    sx: { fontSize: '0.8125rem' }
                  }}
                  sx={{ mb: 0.75, maxWidth: 550 }}
                >
                  <option value="">スキルを選択</option>
                  <option value="java">Java</option>
                  <option value="react">React</option>
                </TextField>
                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  単価
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="例：650000円"
                  sx={{ mb: 0.75, maxWidth: 550 }}
                  InputProps={{ sx: { fontSize: '0.8125rem' } }}
                />
                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  期間
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="例：3ヶ月"
                  sx={{ mb: 0.75, maxWidth: 550 }}
                  InputProps={{ sx: { fontSize: '0.8125rem' } }}
                />
                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  ステータス
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  select
                  SelectProps={{
                    native: true,
                    sx: { fontSize: '0.8125rem' }
                  }}
                  sx={{ mb: 0.75, maxWidth: 550 }}
                >
                  <option value="">ステータスを選択</option>
                  <option value="open">オープン</option>
                  <option value="closed">クローズ</option>
                </TextField>
                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  詳細
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  placeholder="案件の詳細情報を入力"
                  sx={{ mb: 0.75, maxWidth: 550 }}
                  InputProps={{ sx: { fontSize: '0.8125rem' } }}
                />
                <Button
                  onClick={onClose}
                  variant="outlined"
                  size="small"
                  sx={{
                    fontSize: '0.8125rem',
                    mt: 1,
                    width: '97%',
                    color: 'green',
                    borderColor: 'green',
                    '&:hover': {
                      borderColor: 'darkgreen',
                      color: 'darkgreen',
                    },
                  }}
                >
                  案件情報を登録
                </Button>
              </Box>
            )}
            {detailTab === 1 && (
              <Box component="form" onSubmit={handleSubmit} sx={{ '& > *:not(:last-child)': { mb: 0.3 } }}>
                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  名前
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="名前を入力"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                  sx={{ mb: 0.75, maxWidth: 550 }}
                  InputProps={{ sx: { fontSize: '0.8125rem' } }}
                />

                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  年齢
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  placeholder="年齢を入力"
                  value={formData.age}
                  onChange={handleChange('age')}
                  required
                  sx={{ mb: 0.75, maxWidth: 550 }}
                  InputProps={{ sx: { fontSize: '0.8125rem' } }}
                />

                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  スキル
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  select
                  value={formData.skill}
                  onChange={handleChange('skill')}
                  required
                  SelectProps={{
                    native: true,
                    sx: { fontSize: '0.8125rem' }
                  }}
                  sx={{ mb: 0.75, maxWidth: 550 }}
                >
                  <option value="">スキルを選択</option>
                  <option value="java">Java</option>
                  <option value="react">React</option>
                  <option value="python">Python</option>
                  <option value="nodejs">Node.js</option>
                </TextField>

                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  稼働可能時期
                </Typography>
                <Box sx={{ mb: 0.75, maxWidth: 550 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={formData.startDate}
                      onChange={handleDateChange}
                      slotProps={{
                        textField: {
                          size: "small",
                          required: true,
                          sx: {
                            fontSize: '0.8125rem',
                            '& .MuiInputBase-input': {
                              fontSize: '0.8125rem',
                              py: '8.5px'
                            }
                          }
                        }
                      }}
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Box>

                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  期間
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="例：3ヶ月"
                  value={formData.duration}
                  onChange={handleChange('duration')}
                  required
                  sx={{ mb: 0.75, maxWidth: 550 }}
                  InputProps={{ sx: { fontSize: '0.8125rem' } }}
                />

                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  ステータス
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  select
                  value={formData.status}
                  onChange={handleChange('status')}
                  required
                  SelectProps={{
                    native: true,
                    sx: { fontSize: '0.8125rem' }
                  }}
                  sx={{ mb: 0.75, maxWidth: 550 }}
                >
                  <option value="">ステータスを選択</option>
                  <option value="open">オープン</option>
                  <option value="closed">クローズ</option>
                  <option value="pending">保留中</option>
                </TextField>

                <Typography variant="subtitle1" sx={{ fontSize: '0.875rem', mb: 0.5 }}>
                  詳細
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={4}
                  size="small"
                  placeholder="案件の詳細情報を入力"
                  value={formData.details}
                  onChange={handleChange('details')}
                  sx={{ mb: 0.75, maxWidth: 550 }}
                  InputProps={{ sx: { fontSize: '0.8125rem' } }}
                />
                <Button
                type="submit"
                  onClick={handleSubmit}
                  variant="outlined"
                  size="small"
                  sx={{
                    fontSize: '0.8125rem',
                    mt: 2,
                    width: '97%',
                    color: 'green',
                    borderColor: 'green',
                    '&:hover': {
                      borderColor: 'darkgreen',
                      color: 'darkgreen',
                    },
                  }}
                >
                  人材情報を登録
                </Button>
              </Box>)}

            <Box sx={{
              mt: 'auto',
              py: 1,
              display: 'flex',
              ml: 32, // 或 marginRight: 2
              width: '100%'
            }}>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button
                  onClick={onClose}
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: '0.8125rem', height: '27px' }}
                >
                  閉じる
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ fontSize: '0.8125rem', height: '27px' }}
                >
                  解析失敗
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ fontSize: '0.8125rem', height: '27px' }}
                >
                  再解析
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{ fontSize: '0.8125rem', height: '27px' }}
                >
                  削除
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default MailDetailDialog;