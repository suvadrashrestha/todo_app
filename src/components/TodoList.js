import React from 'react'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from '@mui/icons-material/Edit' 
import DeleteIcon from '@mui/icons-material/Delete'

export default function TodoList({todo,toggleComplete,handleDelete,handleEdit}) {
    const[newTitle,setNewTitle]=React.useState(todo.title);
    const handleChange=(e)=>{
        e.preventDefault() ;
         if (todo.complete===true){
            setNewTitle(todo.title);
         }
         else{
            todo.title="";
            setNewTitle(e.target.value);
         }
    }
  return (
    <div className="flex mt-3 justify-center items-center w-[90%]">
       <div className=" md:ml-5 flex  rounded-xl   h-14   ">
        
      <input 
      style={{textDecoration:todo.complete && "line-through"}}
      type="text"
       value={todo.title===""?newTitle:todo.title} 
      className="p-2 border-[1px] border-grey-300 rounded-lg font-light text-xl  "
      onChange={handleChange}
      />
      
       <div className=" p-2  flex  rounded-xl ">

        <button className="border-none outline-none cursor-poiner bg-transparent rounded-full text-green-400"
              onClick={()=>toggleComplete(todo)}
              >
            <CheckCircleIcon  />
             </button>
        <button className="border-none outline-none cursor-poiner bg-transparent rounded-full text-teal-300"
        onClick={()=>handleEdit(todo,newTitle)}> 
        <EditIcon/>
</button>
        <button className="border-none outline-none cursor-poiner bg-transparent rounded-full text-red-400"
        onClick={()=>handleDelete(todo.id)}>
        <DeleteIcon id/>
 </button>

 </div>
       </div>
    </div>
  )
}
