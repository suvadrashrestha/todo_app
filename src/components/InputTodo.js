import React from 'react'
import{addDoc,collection} from "firebase/firestore";
import {db} from "../firebaseConfig";
export default function InputTodo() {
    const[title,setTitle]=React.useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(title!==""){
            await addDoc(collection(db,"todos"),{
                 title,
                 completed:false
            })
            setTitle("")
        }
    }
  return (
   <form onSubmit={handleSubmit}>
    <input type={'text'} placeholder="Enter Todo Task.." 
    value={title} onChange={(e)=>setTitle(e.target.value)}/>
  <button>+</button>
   </form>
  )
}
