import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
//import { Redirect } from 'react-router-dom';

import "./loginForm.css";
import "./forgotPassword/ForgotPassword";
import FormForgotPassword from "./forgotPassword/ForgotPassword";

const label_NhoMK = { inputProps: { "aria-label": "Nhớ Mật Khẩu" } };

const url = `https://rpa-voucher-exchange.herokuapp.com`;
const endpoint = `/api/v1/auth/login`;

const LoginForm = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isRemember, setIsRemember] = useState("false");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const formSubmitHandler = () => {
    setIsWaiting(true);
    const body = {
      username: userName,
      password: password,
    };
    axios
      .post(url + endpoint, body)
      .then((res) => {
        setIsWaiting(false);
        props.handleLoginMsg({ code: "200", msg: "Đăng nhập thành công" });
        localStorage.setItem("name", res.data.data.name);
        localStorage.setItem("token", res.data.data.token);
      })
      .catch((err) => {
        console.log("error: ", err);
        setIsWaiting(false);
        props.handleLoginMsg({ code: "401", msg: "Đăng nhập thất bại" });
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
              <div className="password-input">
                <input
                  type={isHidden ? "password" : "text"}
                  name="password"
                  placeholder="Mật khẩu"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {isHidden ? (
                  <label className="password-eye">
                    <VisibilityIcon
                      onClick={() => setIsHidden(false)}
                    ></VisibilityIcon>
                  </label>
                ) : (
                  <label className="password-eye">
                    <VisibilityOffIcon
                      onClick={() => setIsHidden(true)}
                    ></VisibilityOffIcon>
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="loginForm__help">
          <label>
            <Checkbox
              name="rememberAcc"
              id="rememberAcc"
              onChange={(e) => setIsRemember(e.target.value)}
            />
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
