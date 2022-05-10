import React from 'react'
import "./authHeader.css"
import logoVmama from "../../../assets/VMAMA logo/VMAMA.png"
const AuthHeader = () => {
  return (
    <div id="authHeader">
      {/* <img id="authHeader__logo" src="logo.png" alt="logo-payoo"></img> */}
      <img id="authHeader__appname" src={logoVmama} alt="logo-vmama"></img>
    </div>
  )
}

export default AuthHeader