import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from "../constant/url";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  let [firstname, setFirstName] = useState("");
  let [lastname, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [otp, setOtp] = useState();
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

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




  function updateFirstName(e) {
    setFirstName(e);
  }
  function UpdateLastName(e) {
    setLastName(e);
  }

  function updateEmail(e) {
    setEmail(e);
  }

  function updatePassword(e) {

    setPassword(e);
  }
  function signIn(e) {
    navigate("/login")
  }
  function otpset(e) {
    setOtp(e);
  }
  const verifyOTP = async () => {
    try {

      let user = { email, otp };
      const res = await axios.post(`${API_URL}/users/register/verifyOTP`, user);
      if (res.data.success) {
        setIsOtpVerified(true); // ✅ unlock register
        showFlash(
          res.data.flashMessage[0],
          "success"
        );
      }

      // console.log(res.data);

    } catch (err) {
      showFlash(
        err.response.data.flashMessage[0],
        "error"
      );
      console.log(err.response.data); // 🔥 shows exact error
    }

  }
  const sendOtp = async () => {
    try {

      console.log(email + " " + firstname + " " + lastname + " " + password + " " + API_URL);
      const user = { email };
      const response = await axios.post(`${API_URL}/users/register/reqOTP`,user,{
        withCredentials: true
      });
      // console.log(response.data.flashMessage[0]);
      showFlash(
        response.data.flashMessage[0],
        "success"
      );
    } catch (err) {
      showFlash(
        err.response.data.flashMessage[0],
        "error"
      );
    }

  }



  async function formsubmit(e) {
    e.preventDefault();

    // ❌ block if OTP not verified
    // if (!isOtpVerified) {
    //   alert("Please verify OTP first");
    //   return;
    // }

    const user = { firstname, lastname, email, password };

    try {
      const res = await axios.post(
        `${API_URL}/users/register`,
        user
      );

      console.log(res.data);
      showFlash(
        res.data.flashMessage[0],
        "success"
      );

      navigate("/login", { state: { flashMessage: res.data.flashMessage[0], type: "success" } });

    } catch (err) {
      showFlash(
        err.response.data.flashMessage[0],
        "error"
      );
      console.log(err.response.data.message);
    }
  }
  return (
    <div className='w-full min-h-screen flex flex-wrap'>
      <div className="w-full ">
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

      <div className='lg:w-1/2 lg:px-30  w-full min-h-screen bg-gradient-to-br from-[#1a472a] to-[#2d5a3d] px-10 py-30 flex flex-col justify-center items-start gap-5'>
        <h1 className='text-3xl font-bold pb-5'>🛒 Shopcart</h1>
        <h1 className='text-4xl font-bold'>Join Our Community!</h1>
        <p>Create an account to start shopping and enjoy exclusive member benefits.</p>
        <div className='flex flex-col justify-center items-start text-xl mt-5 gap-5'>

          <div className='flex justify-center items-center pr-5 xl text-center ' >
            <p className=' flex justify-center items-center rounded-full bg-white/50 w-10 h-10'>🎁</p>
            <p className='ml-3'>Welcome gift on first purchase</p>
          </div>
          <div className='flex justify-center items-center pr-5 xl text-center ' >
            <p className=' flex justify-center items-center rounded-full bg-white/50 w-10 h-10'>🚀</p>
            <p className='ml-3'>Early access to new arrivals</p>
          </div>
          <div className='flex justify-center items-center pr-5 xl text-center ' >
            <p className=' flex justify-center items-center rounded-full bg-white/50 w-10 h-10'>⭐</p>
            <p className='ml-3'>Earn points on every purchase</p>
          </div>

        </div>

      </div>
      <div className='font-serif lg:w-1/2 lg:px-30  w-full min-h-screen bg-white flex flex-col justify-start items-start px-10 py-20 gap-2 text-zinc-900 '>
        <h1 className='text-2xl font-bold '>Create Account</h1>
        <p className='text-zinc-500'>Already have an account?<a onClick={(e) => { signIn(e.target.value) }} className='cursor-pointer text-green-900 underline '>Sign In</a></p>
        <form onSubmit={(e) => { formsubmit(e) }} className='mt-5 w-[90%] flex flex-col gap-2' action="">
          <div className='pb-2 flex gap-15 w-full' >

            <label htmlFor="">First Name
              <input onChange={(e) => { updateFirstName(e.target.value) }} className='block border-2 placeholder:text-muted-foreground outline-none border-zinc-300 rounded-md px-3 py-3 w-full' type="text" placeholder='John' required />

            </label>
            <label htmlFor="">Last Name
              <input onChange={(e) => { UpdateLastName(e.target.value) }} className='block border-2 placeholder:text-muted-foreground outline-none border-zinc-300 rounded-md px-3 py-3 w-full' type="text" placeholder='Doe' required />

            </label>
          </div>
          <label className='pb-2' htmlFor="">Email Address
            <input onChange={(e) => { updateEmail(e.target.value) }} className='block border-2 placeholder:text-muted-foreground outline-none border-zinc-300 rounded-md px-3 py-3 w-full' type="email" placeholder='Enter your email' required />

          </label>
          <label htmlFor="">Password
            <input onChange={(e) => { updatePassword(e.target.value) }} className='block border-2 placeholder:text-muted-foreground outline-none border-zinc-300 rounded-md px-3 py-3 w-full' type="password" placeholder='Enter your password' required />
          </label>
          <button type='button' onClick={sendOtp} className='flex justify-center px-4 py-2 bg-green-900 text-white w-1/2 rounded-md mt-4 cursor-pointer'>Send OTP</button>
          <div className='flex w-full items-center text-center py-5'>


            <label className='w-1/3 flex justify-start items-center' htmlFor="">OTP
              <input onChange={(e) => otpset(e.target.value)} type="password" className='ml-3 border-2 placeholder:text-muted-foreground outline-none border-zinc-300 rounded-md px-3 py-3 w-full' placeholder='Enter OTP' required />
            </label>
            <button onClick={() => { verifyOTP() }} type="button" className=' mx-10 bg-green-900 text-white px-5 py-3 cursor-pointer rounded-md'>Verify OTP</button>

          </div>

          <div className='w-full flex gap-1 justify-start items-center py-2'>
            <input className='text-xl' type="checkbox" required />
            <p className='w-full'>Remember me</p>
            {/* <label for="remember" class="text-zinc-600 w-full text-sm text-muted-foreground">Remember me</label> */}

            <p className="w-full flex justify-end">Forgot Password?</p>
          </div>
          <input className='cursor-pointer w-full rounded-4xl text-white font-bold bg-green-900 mt-5 py-3 ' type="submit" value="Register" />

        </form>

      </div>
    </div>
  )
}

export default Register
