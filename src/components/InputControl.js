import React from 'react'

export default function InputControl(props) {
  return (
    <div className="flex flex-col gap-2">
      {
        props.label && <label className="font-bold text- color-313131">{props.label}
        </label>}
        <input className="rounded-md border-1 border-solid border-grey-300  text-000 p-2" type="text" {...props}/>
      
    </div>
  )
}
