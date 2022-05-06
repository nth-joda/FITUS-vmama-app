import React from 'react'
import "./loginForm.css"
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
                        <input type="text" name="username" placeholder="Username/email" />
                    </div>

                    <div className="loginForm__userInput-field">
                        <label htmlFor="password"><i className='bx bxs-lock'></i></label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                </div>
            </div>
            <div className="loginForm__help">
                <label><input type="checkbox" name="rememberAcc" id="rememberAcc"></input>Nhớ tài khoản</label>
                <a href="#" className="forgotPassword">Quên mật khẩu?</a>
            </div>
            <div className="loginForm__cta">
                <button className="btn btn-primary loginForm__submit" onClick={formSubmitHandler}>Đăng nhập</button>
            </div>
            
        </form>

    </div>
  )
}

export default LoginForm