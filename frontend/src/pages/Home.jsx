import React, { useEffect, useState } from 'react'
import logo from "../assets/icons/e_com_logo.jpg";
import Location from "../assets/icons/location.png"
import Phone from "../assets/icons/telephone.png"
import Person from "../assets/icons/person.png"
import Cart from "../assets/icons/cart.png"
import HomePic from "../assets/images/homePicture.png"
import Stars from "../assets/icons/stars.png"
import { API_URL } from '../constant/url';
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ProductDetails from './ProductDetails';

const Home = () => {
    const [show, setShow] = useState(false);
    const [animate, setAnimate] = useState(false);
    const location = useLocation();
    

    const [flash, setFlash] = useState({
        show: false,
        message: "",
        type: ""
      });


   useEffect(() => {

      if(location.state?.flashMessage){

         showFlash(
            location.state.flashMessage,
            location.state.type
         );

      }

   }, [location]);

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


    const navigate = useNavigate();

   useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/`, {
                withCredentials: true,
            });

            // console.log("Flash Message from backend:", response.data.flashMessage);
            setFlash(response.data.flashMessage);

        } catch (error) {
            navigate("/login", {
                state: {
                    flashMessage: "Please login to access the home page",
                    type: "error",
                },
            });
        }
    };

    fetchData();
}, []);


    // console.log(flash);
    const AddToCart = async () => {

        navigate("/productDetails");
    }

    return (

        <div className='w-full flex flex-col font-serif bg-white'>
            <div className="w-full ">
                {
                    flash.show && (
                        <div
                            className={`
            mt-30 fixed top-5 right-5 z-50
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


            <div className='bg-gradient-to-r from-[#c4e3d4] to-[#b8a88a] flex justify-around items-center pt-36'>

                <div className=" lg:w-1/3 text-zinc-900 flex flex-col py-[10%] ml-[10%] gap-6 justify-start">
                    <h1 className='text-3xl font-bold'>Shopping and Department Store.</h1>
                    <p>Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</p>
                    <button className='flex justify-center px-2 py-2 rounded-3xl bg-[#1a472a] text-white w-1/2 '>Learn More</button>
                </div>
                <div className='hidden lg:flex w-[50%] px-10 py-20'>
                    <img src={HomePic} alt="" />
                </div>
            </div>


            <div className='w-full px-5 pt-10 bg-white text-zinc-900 pb-10'>
                <h1 className='text-3xl lg:ml-[6%] font-[rounded] font-bold'>Shops Our Top Categories</h1>
                <div className='flex flex-wrap justify-center items-center gap-5 mt-10'>
                    <a className='relative' href="">
                        <img className='rounded-2xl lg:w-[13vw]' src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=160&h=160&fit=crop" alt="" />
                        <p className='absolute top-2 text-white text-2xl mx-5 font-medium'>bags</p>
                    </a>
                    <a className='relative' href="">
                        <img className='rounded-2xl lg:w-[13vw]' src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=160&h=160&fit=crop" alt="" />
                        <p className='absolute top-2 text-white text-2xl mx-5 font-medium'>bags</p>
                    </a><a className='relative' href="">
                        <img className='rounded-2xl lg:w-[13vw]' src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=160&h=160&fit=crop" alt="" />
                        <p className='absolute top-2 text-white text-2xl mx-5 font-medium'>bags</p>
                    </a><a className='relative' href="">
                        <img className='rounded-2xl lg:w-[13vw]' src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=160&h=160&fit=crop" alt="" />
                        <p className='absolute top-2 text-white text-2xl mx-5 font-medium'>bags</p>
                    </a><a className='relative' href="">
                        <img className='rounded-2xl lg:w-[13vw]' src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=160&h=160&fit=crop" alt="" />
                        <p className='absolute top-2 text-white text-2xl mx-5 font-medium'>bags</p>
                    </a><a className='relative' href="">
                        <img className='rounded-2xl lg:w-[13vw]' src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=160&h=160&fit=crop" alt="" />
                        <p className='absolute top-2 text-white text-2xl mx-5 font-medium'>bags</p>
                    </a>
                </div>

            </div>
            <div className='bg-white text-black py-10'>
                <h1 className='text-3xl font-[rounded] font-bold lg:ml-[7%] pb-5'>Featured Products</h1>
                <div className='flex flex-wrap justify-center items-center gap-10 py-10'>


                    <div className='flex flex-col justify-start items-center '>
                        <img className='rounded-xl lg:w-[17vw] w-[300px]' src="https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500" alt="" />



                        <p className='sm:px-5vw lg:p-5 w-full py-2 flex justify-around px-4'>
                            <span className='w-full font-semibold flex justify-start'>Ultimate Ears Boom 3</span>
                            <span className='w-full flex justify-end font-bold '>₹180</span>

                        </p>
                        <p className='max-w-xs px-4 text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis'> Portable Waterproof Bluetooth Speaker with 360° Sound and 15-Hour Battery</p>
                        <p className='w-full relative '>
                            <img width='100px' height='0px' className='absolute bottom-[-70px] ml-4 flex justify-start' src={Stars} alt="" />

                        </p>
                        <p className='mt-1'>(121)</p>
                        <div className='w-full relative'>

                            <button className='relative bottom-4 mt-10 ml-5 hover:bg-green-900 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2 ' onClick={() => {
                                AddToCart()
                            }}>Add to Cart</button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-center'>
                        <img className='rounded-xl lg:w-[17vw] w-[300px]' src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" alt="" />



                        <p className='sm:px-5vw lg:p-5 w-full py-2 flex justify-around px-4'>
                            <span className='w-full font-semibold flex justify-start'>JBL TUNE 600BTNC</span>
                            <span className='w-full flex justify-end font-bold'>₹150</span>

                        </p>
                        <p className='max-w-xs px-4 text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis'> Premium Noise-Cancelling Bluetooth Headphones with Superior Bass and 40-Hour Battery Life</p>
                        <p className='w-full relative '>
                            <img width='100px' height='0px' className='absolute bottom-[-70px] ml-4 flex justify-start' src={Stars} alt="" />

                        </p>
                        <p className='mt-1'>(121)</p>
                        <div className='w-full relative'>

                            <button className='relative bottom-4 mt-10 ml-5 hover:bg-green-900 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2 ' onClick={() => {
                                AddToCart()
                            }}>Add to Cart</button>

                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-center'>
                        <img className='rounded-xl lg:w-[17vw] w-[300px]' src="https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80" alt="" />



                        <p className='sm:px-5vw lg:p-5 w-full py-2 flex justify-around px-4'>
                            <span className='w-full font-semibold flex justify-start'>SONOS MOVES 2</span>
                            <span className='w-full flex justify-end font-bold'>₹450</span>

                        </p>
                        <p className='max-w-xs px-5 text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis'> Smart Portable Speaker with Powerful Sound and Extended Battery Life</p>
                        <p className='w-full relative '>
                            <img width='100px' height='0px' className='absolute bottom-[-70px] ml-4 flex justify-start' src={Stars} alt="" />

                        </p>
                        <p className='mt-1'>(121)</p>
                        <div className='w-full relative'>

                            <button className='relative bottom-4 mt-10 ml-5 hover:bg-green-900 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2 ' onClick={() => {
                                AddToCart()
                            }}>Add to Cart</button>

                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-center'>
                        <img className='rounded-xl lg:w-[17vw] w-[300px]' src="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80" alt="" />



                        <p className='sm:px-5vw lg:p-5 w-full py-2 flex justify-around px-4'>
                            <span className='w-full font-semibold flex justify-start'>BEATS PILL 200TB</span>
                            <span className='w-full flex justify-end font-bold'>₹200</span>

                        </p>
                        <p className='max-w-xs px-5 text-zinc-500 overflow-hidden whitespace-nowrap text-ellipsis'> Compact Portable Speaker with Premium Sound Quality and Long Battery</p>
                        <p className='w-full relative '>
                            <img width='100px' height='0px' className='absolute bottom-[-70px] ml-4 flex justify-start' src={Stars} alt="" />

                        </p>
                        <p className='mt-1'>(121)</p>
                        <div className='w-full relative'>

                            <button className='relative bottom-4 mt-10 ml-5 hover:bg-green-900 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2 ' onClick={() => {
                                AddToCart()
                            }}>Add to Cart</button>

                        </div>
                    </div>





                </div>
            </div>

        </div>
    )
}

export default Home
