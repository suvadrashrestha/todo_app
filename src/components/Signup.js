import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import InputControl from './InputControl'
import { createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth';
import { auth } from '../firebaseConfig';
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
            Signup
        </h1>
        <InputControl label="Name" placeholder="Enter your name"
        onChange={event=>Setvalues((prev)=>({...prev,name:event.target.value}))}/>
        <InputControl label="Email" placeholder="Enter email address"
        onChange={event=>Setvalues((prev)=>({...prev,email:event.target.value}))}/>
        <InputControl label="Password"  type="password" placeholder="Enter password "
        onChange={event=>Setvalues((prev)=>({...prev,pass:event.target.value}))}/>

        <div className="flex flex-col gap-10">
          <p className="font-bold text-sm text-red-700 items-center">{errorMsg}</p>
          <button className="bg-sky-500 text-white font-bold text-base w-[100%] rounded-md py-3 px-10 -mt-10 outline-none"
          disabled={submitButtonDisabled}
          onClick={handleSubmission}>Signup</button>
          <p className="font-bold text-black">
            Already have an account?{" "}
            <span>
              <Link  className="font-bold text-teal-400 tracking-1 text-base no-underline " to="/">Signin</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )

}
