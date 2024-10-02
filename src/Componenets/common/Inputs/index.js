import React, { useState } from 'react'
import './style.css'

function InputComponent({type, state, placeholder, setState, required}) {

  // const [state, setState] = React.useState('');

  return (
    <input type={type} 
    value={state} 
    placeholder={placeholder} 
    onChange={(e)=>setState(e.target.value)} 
    required={required}
    className="custom-input"
    >
    </input>
  )
}

export default InputComponent
