import React from 'react'

interface FormSuccessProp{
    message?:string
  }
  
export const FormSuccess = ({message}:FormSuccessProp) => {
  return (
    <div>FormSuccess</div>
  )
}
