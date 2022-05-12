
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./forgotPassword.css"


const diaGetEmail = () => {
    return (
         <form>
             <label>
             Vui lòng nhập email vào ô bên dưới . Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu qua email.
             </label>
        
             <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nhập Email..."
            type="email"
            fullWidth
            variant="standard"
          />
          </form>

    );
}

const confirmEmail = () => {
    return (
        <h4>Chúng tôi sẽ gửi hướng dẫn lấy lại mật khẩu vào email của bạn. Vui lòng chờ ít nhất 5 phút và kiểm tra hộp thư spam nếu không thấy email được gửi đến.</h4>
    );
}
export default function FormForgotPassword() {
  const [open, setOpen] = React.useState(false);
  const [isWaiting, setIsWaiting] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setIsWaiting(true);
  };



  return (
    <div>
      <Button  variant="text" onClick={handleClickOpen}>
      Quên mật khẩu?
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Quên mật khẩu?</DialogTitle>
        <DialogContent>
          {
            isWaiting ? confirmEmail() : diaGetEmail()
          }

          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleConfirm}>{isWaiting? "Gửi lại": "Xác nhận"}</Button>
        </DialogActions>
      </Dialog>
    </div>

    
  );
  
}
