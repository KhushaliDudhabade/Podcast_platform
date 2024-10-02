import React, { useState } from 'react'
import InputComponent from '../../common/Inputs'
import Button from '../../common/Button'
import {auth,db} from '../../../Pages/firebase'
import{
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setUser} from '../../../slices/userSlice';
import { toast } from 'react-toastify';

function SignupForm() {
    const [fullName,setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleInput= async()=>{
        console.log("handling signup");
        setLoading(true);
        if(password===confirmPassword && password.length>6 &&fullName && email){
            try{
                //create user account
                const userCredential=await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                //save user details
                const user=userCredential.user;
                console.log("user",user);
                await setDoc(doc(db,"users",user.uid),{
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                });
                //save data in redux
                dispatch(
                    setUser({
                    name:fullName,
                    email:user.email,
                    uid:user.uid,
                }));
                toast.success("User has been created !")
                navigate("/profile");
                setLoading(false)
            }
            
            catch(e){
                console.log("error",e);
                toast.error(e.message);
                setLoading(false)
            }
        }else{
            //throw error
            if(password!==confirmPassword){
                toast.error("Please make sure your Password and Confirm Password matches!");
            }
            else if(password>6){
                toast.error("Your Password must be greater than 6 letters!")
            }
            setLoading(false)
        }
        
     };

  return (
    <>
    <InputComponent state={fullName} 
    setState={setFullName} 
    placeholder="Full Name" 
    type="text"
    required={true}/>

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

    <InputComponent state={confirmPassword} 
    setState={setconfirmPassword} 
    placeholder="Confirm Password" 
    type="password"
    required={true}/>
    <Button text={loading ?"Loading.." : "Signup"} disabled={loading} onClick={handleInput}/>
    </>
  )
}

export default SignupForm