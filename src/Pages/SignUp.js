import React, { useState } from 'react'
import Header from '../Componenets/common/Header'
import SignupForm from '../Componenets/SighupComponent/signupForm';
import LoginForm from '../Componenets/SighupComponent/LoginForm';

function SignUp() {
    
    const [flag,setFlag]=useState(false);
    console.log("Rendering SignUp component");
    
  return (
    <div>
        <Header/>
        <div className='wrapper'>
            {!flag ?<h1>Sign Up</h1>:<h1>Login</h1>}
            {!flag ?<SignupForm/>:<LoginForm/>}
            {!flag ?<p onClick={()=>setFlag(!flag)} style={{cursor:"pointer"}}>Already have an Account?Click here to Login</p>:
            <p onClick={()=>setFlag(!flag)} style={{cursor:"pointer"}}>Don't have an Account? Click here to Signup</p>}
        </div>
    </div>
  )
}

export default SignUp