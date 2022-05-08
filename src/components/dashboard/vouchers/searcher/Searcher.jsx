import React from 'react'
import "./searcher.css";
import SearchIcon from '@mui/icons-material/Search';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Searcher = () => {
  return (
    <div className="searcher">
        <form className="searcher__form">
            <TextField
                className="searcher__form-input" 
                sx={{fontSize:16, "& .MuiOutlinedInput-input": {padding:'0'} }} 
                label="Nhập tên voucher..." 
                variant="filled" />
            <Button className="searcher__button" type="submit" variant="outlined">
                <SearchIcon className="searcher__icon" />
            </Button>
        </form>
    </div>
  )
}

export default Searcher