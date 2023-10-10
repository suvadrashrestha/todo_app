
import '../../App.css';
import InputTodo from '../InputTodo';
import TodoList from '../TodoList';
import React from 'react';
import {collection,query,onSnapshot,doc,updateDoc,deleteDoc,where} from '@firebase/firestore';
import {auth, db} from "../../firebaseConfig";

export default function Homepage(props) {
const[todos,setTodos]=React.useState([]);
const userId=auth?.currentUser?.uid|| "";
console.log(userId);

React.useEffect(()=>{
  if(userId==="")
     return;
  const q=query(collection(db,"todos"),where("uid","==",userId));
  
  const unsub=onSnapshot(q,(querySnapshot)=>{
let todosArray=[];
querySnapshot.forEach((doc)=>{
 // console.log(doc.data())
  todosArray.push({...doc.data(),id:doc.id});
});
console.log(auth.currentUser.uid);
setTodos(todosArray);

  });
  return()=>unsub();
},[userId]);
const handleEdit=async(todo,title)=>{
  await updateDoc(doc(db,"todos",todo.id),{title:title});
}
const toggleComplete=async(todo)=>{
  await updateDoc(doc(db,"todos",todo.id),{complete:!todo.complete});
}
const handleDelete=async(id)=>{
  await deleteDoc(doc(db,"todos",id));
}
console.log(todos)
  return (<>

   <div className="App">
    <div className=" p-4 text-black    ">
      <h1 className="mb-3 text-4xl s rounded-xl text-white  inline">Todo~App</h1>
      <div>
      <p className="  pl-20  text-white text-2xl "> Welcome {auth?.currentUser?.displayName}</p>
      </div>
    </div>
    <div>
      <InputTodo></InputTodo>
    </div>
    <div >
    {todos.map((todo)=>{
     return <TodoList    todo={todo} key  ={todo.id} toggleComplete={toggleComplete}
      handleDelete={handleDelete} handleEdit={handleEdit}
      ></TodoList>
     })}
    </div>
   </div>
  </>
  )
}
