import React from 'react'
import "./updater.css"

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Updater = (props) => {
  return (
    <div className="updater">
        <Button className="dashboard-button btn-remove" onClick={() => props.catchDelete()} variant="contained" color="error" endIcon={<DeleteIcon />}>
            Xóa
        </Button>

        <Button className="dashboard-button btn-add" onClick={() => props.catchAdd()} variant="contained" color="success" startIcon={<AddIcon />}>
            Thêm
        </Button>
        
    </div>
  )
}

export default Updater