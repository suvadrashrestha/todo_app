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

    auth.currentUser===null?<div>Please Login first..<Link to="/" >Login</Link></div>: <form onSubmit={handleSubmit}>
    <input type={'text'} placeholder="Enter Todo Task.." 
    value={title} onChange={(e)=>setTitle(e.target.value)}/>
  <button>+</button>
  
   </form>
   
  }
  </>)
}
