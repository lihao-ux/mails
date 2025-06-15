// import React, { useState } from 'react';
// import {
//     TableContainer,
//     Table,
//     TableHead,
//     TableBody,
//     TableRow,
//     TableCell,
//     Paper,
//     Stack,
//     Typography,
//     Select,
//     MenuItem,
//     Button,
//     Box
// } from '@mui/material';
// import {
//     CheckCircle,       // 通过 (绿色)
//     Warning,           // 警告 (黄色)
//     Error
// } from '@mui/icons-material';
// const StaffListTable = ({ staffs, handleDetailClick, onStatusChange }) => {
//     const renderStatusIcon = (status) => {
//         if (status === '1') {
//             return <CheckCircle fontSize="small" color="success" />;
//         }
//         if (status === '2') {
//             return <Warning fontSize="small" color="warning" />;
//         }
//         if (status === '3') {
//             return <Error fontSize="small" color="error" />;
//         }
//         return <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>{status}</Typography>;
//     };
//     const [statusValues, setStatusValues] = React.useState(
//         staffs.reduce((acc, staff) => ({ ...acc, [staff.id]: staff.status }), {})
//     );

//     const handleStatusChange = (staffId, newStatus) => {
//         setStatusValues((prev) => ({ ...prev, [staffId]: newStatus }));
//         onStatusChange(staffId, newStatus);
//         console.log(staffs)
//     };
//     const getSelectStyle = (value, theme) => {
//         const styles = {
//             '1': { // 稼働中
//                 bgcolor: '#d8edd9',  // 比 #e8f5e9 深一点的浅绿色
//                 color: '#1b5e20',    // 比 #2e7d32 更深的绿色
//                 iconColor: '#388e3c', // 中等深度的绿色
//                 borderColor: '#81c784', // 边框色
//                 fontWeight: 'bold'    // 加粗字体
//             },
//             '2': { // 待機中
//                 bgcolor: '#d1e4f7',  // 浅蓝色背景 (类似浅绿的明度)
//                 color: '#0d47a1',    // 深蓝色文字 (类似深绿的对比度)
//                 iconColor: '#1976d2', // 图标蓝色
//                 borderColor: '#64b5f6', // 边框色
//                 fontWeight: 'bold'
//             },
//             '3': { // 調整中
//                 bgcolor: '#ffecb3',  // 浅橙色背景 (类似浅绿的明度)
//                 color: '#e65100',    // 深橙色文字 (类似深绿的对比度)
//                 iconColor: '#ff9800', // 图标橙色
//                 borderColor: '#ffb74d', // 边框色
//                 fontWeight: 'bold'
//             }
//         };
//         return styles[value] || styles['3']; // 默认使用調整中样式
//     };
//     return (
//         <Box>
//             <Box sx={{
//                 mb: 2,
//                 mt: 2,
//                 p: 1.5, // 内边距
//                 backgroundColor: '#e8f5e9', // 浅绿色背景
//                 borderRadius: 1, // 圆角边框
//                 boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' // 可选：添加轻微阴影
//             }}>
//                 <Typography variant="subtitle2" sx={{ mb: 1 }}>ステータスフィルター</Typography>
//                 <Stack direction="row" spacing={1}>
//                     <Button variant="contained" size="small" color="info">稼働中</Button>
//                     <Button variant="outlined" size="small">待機中</Button>
//                     <Button variant="outlined" size="small">調整中</Button>
//                 </Stack>
//             </Box>
//             <TableContainer component={Paper} elevation={1} sx={{ maxHeight: 600 }}>
//                 <Table stickyHeader sx={{ minWidth: 800 }}>
//                     <TableHead sx={{
//                         backgroundColor: '#f5f5f5',
//                         '& .MuiTableCell-root': {  
//                             backgroundColor: '#f5f5f5',
//                             fontWeight: 'bold',
//                             border: '1px solid #ddd',
//                             whiteSpace: 'nowrap',
//                             fontSize: '0.8rem',
//                             py: 1,
//                             lineHeight: '1.5'
//                         }
//                     }}>
//                         <TableRow>
//                             <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '120px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>名前</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '100px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>ステータス</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '100px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>年齢</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '400px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>スキル</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>稼働可能時間</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '100px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>単価希望</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '400px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>AI推薦案件</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ddd', whiteSpace: 'nowrap', width: '220px', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>アクション</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {staffs.map((staff) => (
//                             <TableRow key={staff.id} hover sx={{ cursor: 'pointer', height: '48px' }}>
//                                 <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
//                                     {staff.staffName}
//                                 </TableCell>
//                                 <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
//                                     <Select
//                                         value={statusValues[staff.id] || staff.status}
//                                         onChange={(e) => handleStatusChange(staff.id, e.target.value)}
//                                         sx={(theme) => {
//                                             const value = statusValues[staff.id] || staff.status;
//                                             const style = getSelectStyle(value, theme);
//                                             return {
//                                                 height: '32px',
//                                                 fontSize:'12px',
//                                                 backgroundColor: style.bgcolor,
//                                                 color: style.color,
//                                                 '& .MuiSelect-icon': { color: style.iconColor },
//                                                 '&:hover': {
//                                                     backgroundColor: style.bgcolor,
//                                                     opacity: 0.9
//                                                 }
//                                             };
//                                         }}
//                                     >
//                                         <MenuItem value="1">稼働中</MenuItem>
//                                         <MenuItem value="2">待機中</MenuItem>
//                                         <MenuItem value="3">調整中</MenuItem>
//                                     </Select>
//                                 </TableCell>
//                                 <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
//                                     {staff.staffAge}
//                                 </TableCell>
//                                 <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', color: '#1976d2', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
//                                     {staff.skills}
//                                 </TableCell>
//                                 <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
//                                     {staff.workDate}
//                                 </TableCell>
//                                 <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
//                                     {staff.desiredSalary}
//                                 </TableCell>
//                                 <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
//                                     {staff.aiRecommendedProjects}
//                                 </TableCell>
//                                 <TableCell sx={{ border: '1px solid #ddd', whiteSpace: 'nowrap', fontSize: '0.8rem', py: 1, lineHeight: '1.5' }}>
//                                     <Stack direction="row" spacing={1}>
//                                         <Button
//                                             size="small"
//                                             variant="contained"
//                                             color="primary"
//                                             sx={{ fontSize: '0.7rem', py: 0.5, px: 1.5, minWidth: 'auto' }}
//                                             onClick={() => console.log(staffs)}
//                                         >
//                                             詳細
//                                         </Button>
//                                     </Stack>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Box>
//     );
// };

// export default StaffListTable;