import React from 'react'
import './style.css'

function FileInput({accept,id, onChange}) {
  return (
    <>
    <label htmlFor='id' className='custom-input'>Click me</label>
    <input type="file" 
    accept={accept} 
    id={id} 
    style={{display:'none'}} 
    onChange={onChange}></input>
    </>
  )
}

export default FileInput