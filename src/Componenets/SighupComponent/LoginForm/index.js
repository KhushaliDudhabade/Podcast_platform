import React, { useState } from 'react'
import InputComponent from '../../common/Inputs'
import Button from '../../common/Button'
import{
    signInWithEmailAndPassword,
} from "firebase/auth";
import {auth,db} from '../../../Pages/firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUser} from '../../../slices/userSlice';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';



function LoginForm() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handlelogin= async()=>{
        console.log("handling Login")
        setLoading(true)
        if (email && password){
            try{
                //create user account
                const userCredential=await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                //save user details
                const user=userCredential.user;
                
                const userDoc = await getDoc(doc(db,"users",user.uid));
                const userData=userDoc.data();
                console.log("userData",userData);
             
                //save data in redux
                dispatch(
                    setUser({
                        name: userData.name,
                        email: user.email,
                        uid: user.uid,
    
                    })
            );
            toast.success("Login successfully")
            setLoading(false)
                navigate("/profile");  //navigate to the profile page
            }
            
            catch(e){
                console.log("error",e);
                setLoading(false)
                toast.error(e.message);
            }
        }
        
        else{
          toast.error("You need to fill your valid Email & Password !")
          setLoading(false)
        }
        
    }
  return (
    <>
    <InputComponent state={email} 
    setState={setEmail} 
    placeholder="Email Id" 
    type="text"
    required={true}/>

    <InputComponent state={password} 
    setState={setPassword} 
    placeholder="Password" 
    type="password"
    required={true}/>

<Button text={loading ?"Loading...":"Login"} onClick={handlelogin} disabled={loading}/>
    </>
  )
}

export default LoginForm