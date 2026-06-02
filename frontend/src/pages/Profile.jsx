import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Mail, Phone, MapPin, LogOut, Edit, Edit2 } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constant/url';


const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [profilePicture, setProfilePicture] = useState();
  const [profileImage, setProfileImage] = useState(
    `${API_URL}/users/profile-picture`
  );

  const fileInputRef = useRef(null);

  const [flash, setFlash] = useState({
    show: false,
    message: "",
    type: ""
  });


  const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post(
        `${API_URL}/users/updatepicture`,
        formData,
        {
          withCredentials: true,
        }
      );
      setProfileImage(URL.createObjectURL(file));
      // console.log("chal gya")
    } catch (err) {
      console.log(err);
    }
  };

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


  function Back() {
    navigate("/");
  }
  function EditProfile() {
    //console.log("Navigating to Edit Profile");
    navigate("/profile/EditProfile", { state: { userData } });
  }


  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`${API_URL}/users/Details`, {
          withCredentials: true
        });
        // console.log(response.data.userData);
        setUserData(response.data.userData);
        // console.log("User data fetched successfully");
        //  console.log(userData);

      } catch (err) {
        //console.log(err.response.data);
        navigate("/login", { state: { message: "Please login to continue" } });

      }
    };
    fetchData();
  }, []);




  return (
    <div className=' text-zinc-900 text-2xl w-full min-h-screen bg-gray-100'>
      <div className="w-full ">
        {
          show && (
            <div
              className={`mt-30 
                        fixed top-5 right-5
                        transition-all duration-500 ease-in-out
                        ${animate
                  ? "translate-x-0 opacity-200"
                  : "translate-x-full opacity-0"
                }
                    `}
            >
              <p className="bg-green-500 text-black px-6 py-4 rounded-md shadow-lg ">
                Welcome to the Home page
              </p>
            </div>
          )
        }
      </div>

      <div className='bg-green-900 p-5 pt-10  flex gap-10 text-white flex-col lg:flex-row w-full'>

        <div className='flex gap-10 w-[95%]'>


          <div className="flex flex-col gap-5">

            <div
              onClick={() => fileInputRef.current.click()}
              className="w-[100px] h-[100px] border-white text-white rounded-full border-2 overflow-hidden flex justify-center items-center cursor-pointer"
            >
              <img
                src={profileImage}
                className="w-[100px] h-[100px] rounded-full"
              />
              {/* Profile */}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  uploadProfilePicture(file);
                }
              }}
            />

            {/* <div
              onClick={() => fileInputRef.current.click()}
              className="w-[100px] h-[100px] border-white text-white rounded-full border-2 overflow-hidden flex justify-center items-center cursor-pointer"
            >
              Profile
            </div> */}


            {/* <input
              type="file"
              name="image"
              ref={fileInputRef}
              hidden
              onChange={(e) => {
                setProfilePicture(e.target.files[0]);
                console.log(e.target.files[0]);
              }}
            /> */}
            {/* {profilePicture && (
  <img
    src={URL.createObjectURL(profilePicture)}
    alt="Preview"
    className="w-[100px] h-[100px] rounded-full"
  />
)} */}

            {/* <button
              className="border-2 px-3 py-2 rounded-md bg-white text-green-800 text-sm"
              onClick={uploadProfilePicture}
            >
              Upload
            </button> */}

          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-3xl'>{userData.firstName} {userData.lastName}</h1>
            <p className='text-lg'>{userData.email}</p>
            <div className='text-lg hover:border-white cursor-pointer  border-2 w-[70%] rounded-md text-green-900 bg-white flex px-2 py-2 items-center justify-center gap-2' onClick={() => { EditProfile() }}>
              <Edit2 size={18} />Edit Profile
            </div>
          </div>
        </div>

        <div className='lg:flex lg:w-1/2 float-right w-[20vw] lg:w-30 h-15 flex items-center '>
          <button onClick={() => {
            console.log("Current:", window.location.pathname);
            navigate("/cart", { replace: true });
          }} className='w-full  flex justify-center border-2 px-3 py-2 bg-green text-white border-white hover:border-white  hover:bg-white hover:text-green-900 px-4 text-lg  rounded-md'>Back</button>

        </div>

      </div>


      <div className='lg:flex-row lg:justify-center lg:items-center mx-5 my-5 flex flex-col gap-5 text-black'>

        <div className='lg:w-1/2 px-5 py-10 bg-white shadow'>

          <div className='flex justify-start items-center gap-3'>
            <h1 className='w-full font-semibold '>Contact Information</h1>
            <div onClick={() => EditProfile()} className='cursor-pointer flex w-1/2 justify-end items-center gap-5 text-green-900'>

              <Edit size={20} />Edit All
            </div>
          </div>

          <div className='text-[70%] pb-5 '>
            <div className='flex justify-between items-center gap-2 pt-4'>
              <div className='flex justify-center items-center gap-4'>
                <Mail size={20} />
                <div>
                  <p>Email</p>
                  <p>{userData.email}</p>
                </div>
              </div>
              <p className='text-green-900'>Edit</p>
            </div>
          </div>
          <hr />

          <div className='text-[70%] pb-5 '>
            <div className='flex justify-between items-center gap-2 pt-4'>
              <div className='flex justify-center items-center gap-4'>
                <Phone size={20} />
                <div>
                  <p>Phone</p>
                  <p>{userData.phone}</p>
                </div>
              </div>
              <p className='text-green-900'>Edit</p>
            </div>
          </div>
          <hr />

          <div className='text-[70%] pb-5 '>
            <div className='flex justify-between items-center gap-2 pt-4'>
              <div className='flex justify-center items-center gap-4'>
                <MapPin size={20} />
                <div>
                  <p>Address</p>
                  <p>{userData.Address}</p>
                </div>
              </div>
              <p className='text-green-900'>Edit</p>
            </div>
          </div>
          <hr />


        </div>

        <div className='lg:w-1/2 flex flex-col gap-[15px]'>

          <div className='bg-white shadow px-5 flex flex-col justify-center items-center rounded-md py-5'>
            <p className='text-blue-900 text-3xl font-bold'>24</p>
            <h1 className='text-zinc-500'>Total Orders</h1>
          </div>

          <div className='bg-white shadow px-5 flex flex-col justify-center rounded-md items-center py-5'>
            <p className='text-yellow-300 text-3xl font-bold'>$2450</p>
            <h1 className='text-zinc-500'>Total Spent</h1>
          </div>

          <div className='bg-white shadow px-5 flex flex-col justify-center rounded-md items-center py-5'>
            <p className='text-red-700 text-3xl font-bold'>850</p>
            <h1 className='text-zinc-500'>Loyalty Points</h1>
          </div>


        </div>

      </div>


      <h1 className='text-2xl ml-5 p-2'>Account Settings</h1>
      <div className='text-sm  bg-grey-100 border-0 my-5 mx-5 rounded-md'>

        {/* <div className='p-5'> */}
        <div className='lg:flex-row w-full flex flex-col gap-4 '>

          <div className='px-5  lg:w-1/2 border-0 py-3 rounded-md shadow bg-white'>
            <h1 className='text-[18px] font-semibold'>Change Password</h1>
            <p>Update password</p>
          </div>
          <div className='px-5  lg:w-1/2 border-0 py-3 rounded-md shadow bg-white'>
            <h1 className='text-[18px] font-semibold'>Email Preferences</h1>
            <p>Manage notifications</p>
          </div>
          <div className='px-5 lg:w-1/2 border-0 py-3 rounded-md shadow bg-white'>
            <h1 className='text-[18px] font-semibold'>Privacy Settings</h1>
            <p>Control privacy</p>
          </div>


        </div>
      </div>
      {/* </div> */}

      <button className='border-2 bg-red-600 text-white m-4 px-2 py-2 rounded-md text-[4vw] lg:text-[1vw] flex justify-center items-center'>
        <LogOut size={20} /><Link className='text-sm' to="/login" >LogOut</Link>
      </button>
    </div>
  )
}

export default Profile
