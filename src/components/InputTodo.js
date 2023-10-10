import React, { useEffect, useState } from 'react'
import{addDoc,collection} from "firebase/firestore";
import {Link} from "react-router-dom";
import {auth, db} from "../firebaseConfig";
export default function InputTodo() {
    const[title,setTitle]=React.useState("");
const[loading,setLoading]=useState(true);
const[uid,setUid]=useState(auth?.currentUser?.uid||"")

    const handleSubmit=async(e)=>{
      if(uid===""){
        alert(" please login  ")
        return;
      }
        e.preventDefault();
        if(title!==""){
            await addDoc(collection(db,"todos"),{
                 title,
                 completed:false,
                 uid
                 
            })
            setTitle("")
        }
    }
    // if(loading)return <>iiiiiii</>

  return (<>
  {

    auth.currentUser===null?<div>Please Login first..<Link to="/" >Login</Link></div>:
    <div className="flex justify-center items-center mb-20">
      <div className="  rounded-2xl border-2 border-solid h-auto bg-teal-400 w-[90%]  md:w-[60%] lg:w-[50%] ">
     <form
     className="flex  p-1  "
     onSubmit={handleSubmit}>
    <input type={'text'} 
    className=" w-[100%] rounded-xl p-2 font-extralight text-2xl"
    placeholder="Enter Todo Task....." 
    value={title} 
  
    onChange={(e)=>setTitle(e.target.value)}/>
  <button className=" bg-black text-white font-bold text-3xl px-2  border rounded-3xl ml-3 ">+</button>
  
   </form>
   </div>
   </div>
   
  }
  </>)
}
