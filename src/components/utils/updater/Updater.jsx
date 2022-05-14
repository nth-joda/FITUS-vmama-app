import React from 'react'
import "./updater.css"

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

const Updater = (props) => {
  return (
    <div className="updater">
        <Button className="dashboard-button btn-remove" size="small" disabled={props.isDelDisabled} onClick={() => props.catchDelete()} variant="contained" color="error" endIcon={<DeleteIcon />}>
            Xóa
        </Button>

        <Button className="dashboard-button btn-add" disabled={props.isAddDisabled} onClick={() => props.catchAdd()} variant="contained" color="success" startIcon={<AddIcon />}>
            Thêm
        </Button>

        <Button className="dashboard-button btn-refresh" disabled={props.isRefreshDisabled} onClick={() => props.catchRefresh()} variant="contained" color="secondary" endIcon={<RotateLeftIcon />}>
            Làm mới
        </Button>
        
    </div>
  )
}

export default Updater