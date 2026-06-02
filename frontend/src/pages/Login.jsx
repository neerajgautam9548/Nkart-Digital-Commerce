import React, { useEffect } from 'react'
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../constant/url";
import ForgotPassword from './ForgotPassword';
import axios from "axios";
// import 
const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  

  const [flash, setFlash] = useState({
    show: false,
    message: "",
    type: ""
  });

  useEffect(() => {

    if (location.state?.flashMessage) {

      showFlash(
        location.state.flashMessage,
        location.state.type
      );
    }

  }, []);



  const showFlash = (message, type) => {

    setFlash({
      show: true,
      message,
      type
    });

    // slide in
    setTimeout(() => {
      setFlash(prev => ({
        ...prev,
        animate: true
      }));
    }, 100);

    // slide out
    setTimeout(() => {
      setFlash(prev => ({
        ...prev,
        animate: false
      }));
    }, 2000);

    // remove completely
    setTimeout(() => {
      setFlash({
        show: false,
        message: "",
        type: "",
        animate: false
      });
    }, 2600);
  };


  // useEffect(() => {

  //   // first show component
  //   setShow(true);

  //   // then animate inside
  //   setTimeout(() => {
  //     setAnimate(true);
  //   }, 100);

  //   // after 2 sec move out
  //   setTimeout(() => {
  //     setAnimate(false);
  //   }, 2000);

  //   // remove completely
  //   setTimeout(() => {
  //     setShow(false);
  //   }, 2600);

  // }, []);

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  const { email } = useParams();

  function updateEmail(e) {
    setEmail(e);
  }
  function updatePassword(e) {
    setPassword(e);
  }
  function register(e) {
    navigate("/register");
  }
  function ForgotPassword(e) {
    navigate(`/forgotpassword/${email}`, { state: { email: email } });
  }
  function person(e) {
    setRole(e);

  }




  async function formsubmit(e) {
    e.preventDefault();
    try {
      // console.log(email + " " + password);
      let user = { email, password, role };
      // console.log(user);
      let res = await axios.post(`${API_URL}/users/login`, user, {
        withCredentials: true
      });
      // setSuccess("Login successful!");
      // showFlash("Login Successful", "success");
      // flashMessage = res.data.flashMessage;
      // showFlash(res.data.flashMessage, "success");
      // console.log(res.data.flashMessage[0]);
      navigate("/",{
        state:{
          flashMessage:res.data.flashMessage[0],
          type:"success",
        }
      });
      // setTimeout(() => {
        // navigate("/", {
        //   state: {
        //     flashMessage: res.data.flashMessage[0],
        //     type: "success",
        //   },
        // });

      // },1000);

    } catch (err) {
      // console.log(err.response.data); // ❗ THIS LINE FIXES YOUR ISSUE
      const errorMessage =
        err.response?.data?.message ||
        "An error occurred during login";

      setError(errorMessage);

      showFlash(errorMessage, "error");
    }
  }
  // console.log(error);
  return (

    <div className='min-h-screen flex flex-wrap'>
      {/* <div className="w-full ">
                {
                    show && (
                        <div
                            className={`mt-10 
                        fixed top-5 right-5
                        transition-all duration-500 ease-in-out
                        ${animate
                                    ? "translate-x-0 opacity-200"
                                    : "translate-x-full opacity-0"
                                }
                    `}
                        >
                            <p className="bg-green-500 text-black px-6 py-4 shadow-lg ">
                                {error || success}
                            </p>
                        </div>
                    )
                }
            </div> */}

      <div>

        {
          flash.show && (
            <div
              className={`
            fixed top-5 right-5 z-50
            transition-all duration-500 ease-in-out
            ${flash.animate
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
                }
         `}
            >
              <p
                className={`
               px-6 py-4 rounded-md shadow-lg text-white
               ${flash.type === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                  }
            `}
              >
                {flash.message}
              </p>
            </div>
          )
        }

      </div>
      <div className='lg:w-1/2 lg:px-30 w-full min-h-screen bg-gradient-to-br from-[#1a472a] to-[#2d5a3d] px-10 py-30 flex flex-col justify-center items-start gap-5'>
        <h1 className='text-3xl font-bold pb-5'>🛒 Shopcart</h1>
        <h1 className='text-4xl font-bold'>Welcome Back!</h1>
        <p>Sign in to access your account and continue shopping with exclusive deals and offers.</p>
        <div className='flex flex-col justify-center items-start text-xl mt-5 gap-5'>

          <div className='flex justify-center items-center pr-5 xl text-center ' >
            <p className=' flex justify-center items-center rounded-full bg-white/50 w-10 h-10'>💰</p>
            <p className='ml-3'>Exclusive member discounts</p>
          </div>
          <div className='flex justify-center items-center pr-5 xl text-center ' >
            <p className=' flex justify-center items-center rounded-full bg-white/50 w-10 h-10'>🚚</p>
            <p className='ml-3'>Fast & free delivery</p>
          </div>
          <div className='flex justify-center items-center pr-5 xl text-center ' >
            <p className=' flex justify-center items-center rounded-full bg-white/50 w-10 h-10'>🔒</p>
            <p className='ml-3'>Secure checkout</p>
          </div>

        </div>

      </div>
      <div className='font-serif lg:w-1/2 lg:px-30 w-full min-h-screen bg-white flex flex-col justify-start items-start px-10 py-20 gap-2 text-zinc-900 '>
        <h1 className='text-2xl font-bold '>Sign In</h1>
        <p className='text-zinc-500'>Don't have an account? <a className='text-green-900 cursor-pointer' onClick={(e) => { register(e.target.value) }}> Create Account</a></p>
        <form onSubmit={(e) => { formsubmit(e) }} className='mt-5 w-[90%] flex flex-col gap-2' action="">
          <select onChange={(e) => { person(e.target.value) }} className='outline-none border-2 border-zinc-300  rounded-md px-3 py-2 mb-4' name="" id="" defaultValue="" required>
            <option className='' value="" disabled required>Select Role</option>
            <option className='' value="user">user</option>
            <option className='' value="admin">admin</option>

          </select>
          <label className='mb-2' htmlFor="">Email Address
            <input onChange={(e) => { updateEmail(e.target.value) }} className='block border-2 placeholder:text-muted-foreground outline-none border-zinc-300 rounded-md px-3 py-3 w-full' type="email" placeholder='Enter your email' required />

          </label>
          <label htmlFor="">Password
            <input onChange={(e) => { updatePassword(e.target.value) }} className='block border-2 placeholder:text-muted-foreground outline-none border-zinc-300 rounded-md px-3 py-3 w-full' type="password" placeholder='Enter your password' required />
          </label>
          <div className='w-full flex gap-1 justify-start items-center py-2'>
            <input className='text-xl' type="checkbox" required />
            <p className='w-full' >Remember me</p>

            <p className="w-full flex justify-end cursor-pointer" onClick={(e) => { ForgotPassword(e) }} value={email}>Forgot Password?</p>
          </div>
          <input className='cursor-pointer w-full rounded-4xl text-white font-bold bg-green-900 mt-5 py-3 ' type="submit" value="Sign In" />

        </form>

      </div>
    </div>

  )
}

export default Login

