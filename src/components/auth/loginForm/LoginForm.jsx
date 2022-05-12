import React from 'react'
import Checkbox from '@mui/material/Checkbox';

import "./loginForm.css"
import "./forgotPassword/ForgotPassword"
import FormForgotPassword from './forgotPassword/ForgotPassword';

const label_NhoMK = { inputProps: { 'aria-label': 'Nhớ Mật Khẩu' } };

const LoginForm = () => {
    const formSubmitHandler = (value) =>{
        console.alert(value);
    }
  return (
    <div className="loginForm">
        <form className="loginForm__form">
            <h2 className="loginForm__greeting">Xin Chào</h2>
            <div className="loginForm__userInput">
                <div className="loginForm__fields">
                    <div className="loginForm__userInput-field">
                        <label htmlFor="username">
                        <i className='bx bx-user'></i>
                        </label>
                        <input type="text" name="username" placeholder="Tên đăng nhập / Địa chỉ email" />
                    </div>

                    <div className="loginForm__userInput-field">
                        <label htmlFor="password"><i className='bx bxs-lock'></i></label>
                        <input type="password" name="password" placeholder="Mật khẩu" />
                    </div>
                </div>
            </div>
            <div className="loginForm__help">
                <label>
                    <Checkbox name="rememberAcc" id="rememberAcc" />
                    Nhớ tài khoản</label>
                <a href="#" className="forgotPassword" > 
                <FormForgotPassword/>
                </a>
            </div>
            <div className="loginForm__cta">
                <button className="btn btn-primary loginForm__submit" onClick={formSubmitHandler}>Đăng nhập</button>
            </div>
            
        </form>

    </div>
  )
}

export default LoginForm