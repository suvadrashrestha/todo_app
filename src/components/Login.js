import React ,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom";
import InputControl from './InputControl'
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../firebaseConfig';

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
    <div className=" flex justify-center items-center bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 w-[100%] h-full min-h-screen">
      <div className="flex flex-col gap-8 rounded-lg p-8 shadow-md bg-white w-fit-content h-auto min-w-480">
        <h1 className="text-x-large font-bold">
            Login
        </h1>
        <InputControl label="Email" placeholder="Enter email address"
        onChange={event=>setValues(prev=>({...prev,email:event.target.value}))}
        />
        <InputControl label="Password"  type= "password" placeholder="Enter password "
                onChange={event=>setValues(prev=>({...prev,pass:event.target.value}))}

        />
        <div className="flex flex-col gap-10">
          <b className="font-bold text-sm text-red-700 items-center">{errorMsg}</b>
          <button className="bg-sky-500 text-white font-bold text-base w-[100%] rounded-md py-3 px-10 outline-none -mt-7" disabled={submitButtonDisabled} onClick={handleSubmission}>Login</button>
          <p className="font-bold text-black">
           Don't have an account?{" "}
            <span>
              <Link  className="font-bold text-teal-400 tracking-1 text-base no-underline " to="/Signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )

}
