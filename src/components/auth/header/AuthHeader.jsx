import React from 'react'
import "./authHeader.css"

const AuthHeader = () => {
  return (
    <div id="authHeader">
      <img id="authHeader__logo" src="logo.png" alt="logo"></img>
      <header id="authHeader__appname">VMAMA</header>
    </div>
  )
}

export default AuthHeader