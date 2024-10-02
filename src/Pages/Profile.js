import React from 'react'
import { useSelector } from 'react-redux';
import Header from '../Componenets/common/Header';
import {signOut} from 'firebase/auth';
import { toast } from 'react-toastify';
import {auth,db} from './firebase';

function Profile() {
    const user=useSelector((state)=>state.user.user);
    console.log("my user",user);
    if(!user){
      return <p>Loading...</p>
    }

    const handleLogout=()=>{
      signOut(auth)
      .then(()=>{
        toast.success("User logged out");
      })
      .catch((error)=>{
        toast.error(error.message);
      })
    }
  return (
    <div><Header/>
    <div style={{textAlign:'center',width:'100%',height:'100vh',border:'1px solid grey',borderRadius:'15px'}}>
    <h1>{user.name}</h1>
    <h3>{user.email}</h3>
    <h5>{user.uid}</h5>
    <button text={"Logout"} onClick={handleLogout}>Logout</button>
    </div>
    
    
    </div>
    
    
  )
}

export default Profile