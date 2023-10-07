import React, { useState } from 'react'
import styles from "./Signup.module.css"
import {Link,useNavigate} from "react-router-dom";
import InputControl from '../InputControl/InputControl'
import { createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth';
import { auth } from '../../firebaseConfig';
export default function Signup() {
  const navigate= useNavigate();
  const[values,Setvalues]=useState({
    name:"",
    email:"",
    pass:""
  });
  const[errorMsg,setErrorMsg]=useState("");
const[submitButtonDisabled,setSubmitButtonDisabled]=useState(false);
  const handleSubmission=()=>{
  if(!values.name || !values.pass || !values.email){
    setErrorMsg("Fill all fields");
    return;
  }
  setErrorMsg("");
  setSubmitButtonDisabled(true);

  createUserWithEmailAndPassword(auth,values.email,values.pass).then(
   async ( res)=>{
    setSubmitButtonDisabled(false);
    const user=res.user;
    await  updateProfile(user,{
      displayName:values.name,
    });
navigate("/");
    

    })
    .catch((err)=>{
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>
            Signup
        </h1>
        <InputControl label="Name" placeholder="Enter your name"
        onChange={event=>Setvalues((prev)=>({...prev,name:event.target.value}))}/>
        <InputControl label="Email" placeholder="Enter email address"
        onChange={event=>Setvalues((prev)=>({...prev,email:event.target.value}))}/>
        <InputControl label="Password" placeholder="Enter password "
        onChange={event=>Setvalues((prev)=>({...prev,pass:event.target.value}))}/>

        <div className={styles.footer}>
          <p className={styles.error}>{errorMsg}</p>
          <button
          disabled={submitButtonDisabled}
          onClick={handleSubmission}>Signup</button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/Login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )

}
