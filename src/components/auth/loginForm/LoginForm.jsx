import React, { useState } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";

import "./loginForm.css";
import "./forgotPassword/ForgotPassword";
import FormForgotPassword from "./forgotPassword/ForgotPassword";

const label_NhoMK = { inputProps: { "aria-label": "Nhớ Mật Khẩu" } };

const url = `https://rpa-voucher-exchange.herokuapp.com`;
const endpoint = `/api/v1/auth/login`;

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const formSubmitHandler = () => {
    setIsWaiting(true);
    const config = {
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    };
    axios
      .post(url + endpoint, config)
      .then((res) => {
        console.log("result: ", res);
        setIsWaiting(false);
      })
      .catch((err) => {
        console.log("error: ", err);
        setIsWaiting(false);
      });
  };

  return (
    <div className="loginForm">
      <form className="loginForm__form">
        <h2 className="loginForm__greeting">Xin Chào</h2>
        <div className="loginForm__userInput">
          <div className="loginForm__fields">
            <div className="loginForm__userInput-field">
              <label htmlFor="username">
                <i className="bx bx-user"></i>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Tên đăng nhập / Địa chỉ email"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>

            <div className="loginForm__userInput-field">
              <label htmlFor="password">
                <i className="bx bxs-lock"></i>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="loginForm__help">
          <label>
            <Checkbox name="rememberAcc" id="rememberAcc" />
            Nhớ tài khoản
          </label>
          <a href="#" className="forgotPassword">
            <FormForgotPassword />
          </a>
        </div>
        <div className="loginForm__cta">
          {!isWaiting ? (
            <button
              className="btn btn-primary loginForm__submit"
              type="submit"
              disabled={userName === "" || password === "" ? true : false}
              onClick={() => formSubmitHandler()}
            >
              Đăng nhập
            </button>
          ) : (
            <CircularProgress />
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
