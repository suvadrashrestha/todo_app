import React ,{useState} from 'react'
import styles from "./Login.module.css"
import {Link,useNavigate} from "react-router-dom";
import InputControl from '../InputControl/InputControl'
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function Login() {
  const navigate= useNavigate();
  const[values,setValues]=useState({
   
    email:"",
    pass:""
  });
  const[errorMsg,setErrorMsg]=useState("");
const[submitButtonDisabled,setSubmitButtonDisabled]=useState(false);
  const handleSubmission=()=>{
  if( !values.pass || !values.email){
    setErrorMsg("Fill all fields");
    return;
  }
  setErrorMsg("");
  setSubmitButtonDisabled(true);

 signInWithEmailAndPassword(auth,values.email,values.pass).then(
   async ( res)=>{
    setSubmitButtonDisabled(false);
   
navigate("/Homepage");
    

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
            Login
        </h1>
        <InputControl label="Email" placeholder="Enter email address"
        onChange={event=>setValues(prev=>({...prev,email:event.target.value}))}
        />
        <InputControl label="Password"  type= "password" placeholder="Enter password "
                onChange={event=>setValues(prev=>({...prev,pass:event.target.value}))}

        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>Login</button>
          <p>
           Don't have an account?{" "}
            <span>
              <Link to="/Signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )

}
