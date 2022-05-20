import React from 'react'
import { useState } from 'react';

import "./resetPassword.css";
import VMAMA_logo from "../../../assets/VMAMA logo/VMAMA.png"


function NewPassword(){

    const formSubmitHandler = (value) =>{
        console.alert(value);
    }

    const [passwordError, setPasswordErr] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordInput, setPasswordInput]= useState({
        password:'',
        confirmPassword:''
    })
    
    const handlePasswordChange =(evnt)=>{
    
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;
        const NewPasswordInput = {...passwordInput,[passwordInputFieldName]:passwordInputValue}
        setPasswordInput(NewPasswordInput);
        
    }
    const handleValidation= (evnt)=>{
    
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;
    
            //for password 
    if(passwordInputFieldName==='password'){
        const uppercaseRegExp   = /(?=.*?[A-Z])/;
        const lowercaseRegExp   = /(?=.*?[a-z])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp   = /.{8,}/;
    
        const passwordLength =      passwordInputValue.length;
        const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
        const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
        const digitsPassword =      digitsRegExp.test(passwordInputValue);
        const specialCharPassword = specialCharRegExp.test(passwordInputValue);
        const minLengthPassword =   minLengthRegExp.test(passwordInputValue);
    
        let errMsg ="";
        if(passwordLength===0){
                errMsg="Password is empty";
        }else if(!uppercasePassword){
                errMsg="At least one Uppercase";
        }else if(!lowercasePassword){
                errMsg="At least one Lowercase";
        }else if(!digitsPassword){
                errMsg="At least one digit";
        }else if(!specialCharPassword){
                errMsg="At least one Special Characters";
        }else if(!minLengthPassword){
                errMsg="At least minumum 8 characters";
        }else{
            errMsg="";
        }
        setPasswordErr(errMsg);
        }
    
        // for confirm password
        if(passwordInputFieldName=== "confirmPassword" || (passwordInputFieldName==="password" && passwordInput.confirmPassword.length>0) ){
                
            if(passwordInput.confirmPassword!==passwordInput.password)
            {
            setConfirmPasswordError("Confirm password is not matched");
            }else{
            setConfirmPasswordError("");
            }
            
        }
    
    }
    
        return (
          <div className='NewPassword'>
            <div className='NewPassword__header'>
              <img src={VMAMA_logo} alt="logo payoo" />
              <img src={VMAMA_logo} alt="logo VMAMA" />
            </div>
            <div className='NewPassword__form'>
              <form>
                <div className="form__header">Dat lai mk</div>
                <div className="form__body">
                  <div className="form__field">
                    <label className="form__field-label">Nhap MK moi</label>
                    <input type="password" className='form__field-input'></input>
                    <div className="check_msg">
                      <div className="check_msg-item">
                        It nhat 8 kt
                      </div>
                      <div className="check_msg-item">
                        It nhat 10 kt
                      </div>
                    </div>
                  </div>

                  <div className="form__field">
                    <label className="form__field-label">Xac nhan mk</label>
                    <input type="password" className='form__field-input'></input>
                    <div className="check_msg">
                      <div className="check_msg-item">
                        MK ko khop
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
    }
    
    export default NewPassword;