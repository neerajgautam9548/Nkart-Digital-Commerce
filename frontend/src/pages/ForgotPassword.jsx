import React, { useState } from 'react'
import { useNavigate,useParams  } from 'react-router-dom';
import { API_URL } from "../constant/url";
import axios from "axios";

const ForgotPassword = (user) => {
  let navigate=useNavigate();
  let [password,setPassword]=useState("");
  const {email}=useParams();
  
  let ChangePassword = (e) => {
    setPassword(e);
  }
  
  let Back = ()=>{
    navigate("/");
  }
  let formSubmit = async (e)=>{
    e.preventDefault();
    let user={email,password};
    console.log(user);
    try{
      let res=await axios.post(`${API_URL}/users/forgotpassword`,user)
      console.log(res.data);
      navigate("/login")

    }catch(err){
      console.log(err.data);
    }
  }

  return (
    <div className='w-full min-h-screen text-black p-10'>
      <p onClick={(e)=>{Back(e.target.value)}} className='px-4 py-2 rounded-md border-2 h-10 w-20 bg-green-900 text-white hover:bg-yellow-500 flex justify-center items-center'>back</p>
      <h1 className='py-4 text-2xl'>Forgot Password</h1>
      <form onSubmit={(e)=>{formSubmit(e)}} className='w-1/4 rounded-md border-2 flex flex-col gap-3 px-5 py-3' action="">
        <label className='flex justify-between items-center' htmlFor="">Email : 
        <input className='px-4 py-2 rounded-md border-2 ' type="text" defaultValue={email} required/>

        </label>
        <label className='flex justify-between items-center' htmlFor="">Create Password : 

        <input onChange={(e)=>{ChangePassword(e.target.value)}} type="password" className='px-4 py-2 rounded-md border-2 ' placeholder='Create your new password' required/>
        </label>
        <label className='w-full flex justify-center' htmlFor="">

        <button className='flex justify-center px-4 py-2 bg-green-900 rounded-md w-1/2 text-white items-center'>Submit</button>
        </label>
      </form>

    </div>
  )
}

export default ForgotPassword
