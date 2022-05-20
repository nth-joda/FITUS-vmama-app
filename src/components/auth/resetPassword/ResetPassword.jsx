import React from 'react'
import { useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

import "./resetPassword.css";
import VMAMA_logo from "../../../assets/VMAMA logo/VMAMA.png"
import payoo_logo from "../../../assets/Payoo Logo 0 link.png"

const empty_err = "Mật khẩu không thể trống";
const upper_err = "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa";
const lower_err = "Mật khẩu phải chứa ít nhất 1 ký tự viết thường";
const digit_err = "Mật khẩu phải chứa ít nhất 1 chữ số";
const special_err = "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt";
const length_err = "Mật khẩu phải tối thiểu 8 ký tự";
const match_err = "Mật khẩu khum khớp";

// REgex:
const uppercaseRegExp   = /(?=.*?[A-Z])/;
const lowercaseRegExp   = /(?=.*?[a-z])/;
const digitsRegExp      = /(?=.*?[0-9])/;
const specialCharRegExp = /(?=.*?[#?!@$%^&*-.,])/;

const SuccessMsgItem = (props) => (
  <div className="success_msg-item">
    <span>
      <CheckIcon className="success_msg-item__icon"></CheckIcon>
    </span>
    {props.msg}
  </div>
)

const CheckMsgItem = (props) => (
  <div className="check_msg-item">
  <span>
    <ClearIcon className="check_msg-item__icon"></ClearIcon>
  </span>
  {props.msg}
</div>
)

function NewPassword() {
  const [errList, setErrList] = useState([empty_err,upper_err,lower_err, digit_err, special_err, length_err]);
  const [pass, setPass] = useState("");
  const [pass2, setpass2] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const checkPassErr = (e) => {
    setPass(e.target.value);
    const tempPass = e.target.value;
    const list = [];
    if(tempPass.length === 0){
      list.push(empty_err);
    }
    if(tempPass.length < 8){
      list.push(length_err);
    }
    if(!lowercaseRegExp.test(tempPass)){
      list.push(lower_err);
    }
    if(!uppercaseRegExp.test(tempPass)){
      list.push(upper_err)
    }
    if(!digitsRegExp.test(tempPass)){
      list.push(digit_err)
    }
    if(!specialCharRegExp.test(tempPass)){
      list.push(special_err)
    }
    setErrList(list);
  }

  const checkMatch = (e) => {
    setpass2(e.target.value);
    const tempPass2 = e.target.value;
    if (pass === tempPass2 && pass !== "" && errList.length ===0)
      setCanSubmit(true);
  }

  return (
    <div className="NewPassword">
      <div className="NewPassword__header">
        <div className="NewPassword__header-logoes">
          <img
            className="NewPassword__header-logo logo__payoo"
            src={payoo_logo}
            alt="logo payoo"
          />
          <img
            className="NewPassword__header-logo logo__vmama"
            src={VMAMA_logo}
            alt="logo VMAMA"
          />
        </div>
      </div>
      <div className="NewPassword__form">
        <form>
          <div className="form__header">Đặt lại Mật Khẩu</div>
          <div className="form__body">
            <div className="form__field">
              <label className="form__field-label">Nhập mật khẩu mới</label>
              <input type="password" className="form__field-input" onChange={e => checkPassErr(e)}></input>
              <div className="check_msg">
                {
                  errList.length > 0 ? errList.map(item =>  (<CheckMsgItem msg={item} />)) : (<SuccessMsgItem msg={"Có thể sứ dụng mật khẩu"}/>)
                }
              </div>
            </div>

            <div className="form__field">
              <label className="form__field-label">Xác nhận mật khẩu mới</label>
              <input type="password" className="form__field-input" onChange={e => checkMatch(e)}></input>
              <div className="check_msg">
                {
                  canSubmit ? (<SuccessMsgItem msg={"Mật khẩu trùng khớp"} />) : (<CheckMsgItem msg={"Mật khẩu không trùng khớp"} />)
                }
              </div>
            </div>
          </div>
          <div className="form__submit">
            <Button onClick={() => alert("Submit successful!")} size="large" variant="contained" disabled={!canSubmit}>
              Xác nhận
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
    
    export default NewPassword;