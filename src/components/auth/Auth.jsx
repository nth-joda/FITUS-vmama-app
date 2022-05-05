import React from 'react'
import AuthHeader from './header/AuthHeader'
import LoginForm from './loginForm/LoginForm'

import "./auth.css";

const Auth = () => {
  return (
    <div id="auth">
      <AuthHeader />
      <LoginForm />
    </div>
  )
}

export default Auth
