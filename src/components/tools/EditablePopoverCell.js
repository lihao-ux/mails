import React, { useState } from 'react';
import { TableCell, TextField, Popover, Button } from '@mui/material';

function EditablePopoverCell({ id, fieldKey, value, onChange, placeholder, minWidth = 100 }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [tempValue, setTempValue] = useState(value);

    const open = Boolean(anchorEl);

    const handleOpen = (event) => {
        setTempValue(value);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSave = () => {
        onChange(id, fieldKey, tempValue);
        handleClose();
    };

    return (
        <TableCell>
            <TextField
                size="small"
                placeholder={placeholder || ''}
                value={value}
                onClick={handleOpen}
                readOnly
                sx={{ minWidth, cursor: 'pointer' }}
            />

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <div style={{ padding: 16, maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <TextField
                        multiline
                        rows={4}
                        value={tempValue}
                        onChange={e => setTempValue(e.target.value)}
                        autoFocus
                        variant="outlined"
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button size="small" onClick={handleClose}>キャンセル</Button>
                        <Button size="small" variant="contained" onClick={handleSave}>保存</Button>
                    </div>
                </div>
            </Popover>
        </TableCell>
    );
}

export default EditablePopoverCell;
