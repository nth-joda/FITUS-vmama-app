import React from "react";
import AuthHeader from "./header/AuthHeader";
import LoginForm from "./loginForm/LoginForm";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import "./auth.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Auth = (props) => {
  const [openToast, setOpenToast] = React.useState(false);
  const [msg, setMsg] = React.useState({
    code: "501",
    msg: "Lỗi khác",
  });
  const handleMsg = (m) => {
    setMsg(m);
    setOpenToast(true);
    props.handleAuth(m);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  return (
    <div id="auth">
      <Snackbar
        open={openToast}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={msg.code === 200 ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {msg.msg}
        </Alert>
      </Snackbar>
      <AuthHeader />
      <LoginForm handleLoginMsg={(m) => handleMsg(m)} />
    </div>
  );
};

export default Auth;
