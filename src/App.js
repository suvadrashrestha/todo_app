
import './App.css';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';
import React from 'react';
import {collection,query,onSnapshot,doc,updateDoc,deleteDoc,} from '@firebase/firestore';
import {db} from "./firebaseConfig";

export default function App() {
const[todos,setTodos]=React.useState([]);
React.useEffect(()=>{
  const q=query(collection(db,"todos"));
  const unsub=onSnapshot(q,(querySnapshot)=>{
let todosArray=[];
querySnapshot.forEach((doc)=>{
 // console.log(doc.data())
  todosArray.push({...doc.data(),id:doc.id});
});

setTodos(todosArray);

  });
  return()=>unsub();
},[]);
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
    <div className="title">
      <h1>Todo App</h1>
    </div>
    <div>
      <InputTodo></InputTodo>
    </div>
    <div className="todo_container">
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
