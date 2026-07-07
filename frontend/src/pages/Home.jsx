import React, { useEffect, useState } from 'react'
import logo from "../assets/icons/e_com_logo.jpg";
import Location from "../assets/icons/location.png"
import Phone from "../assets/icons/telephone.png"
import Person from "../assets/icons/person.png"
import Cart from "../assets/icons/cart.png"
// import HomePic from "../assets/images/homePicture.png"
// import HomePic from "../../public/nkart1.png"
// import HomePic from "../public/nkart1.png";
// import HomePic from "./public/nkart1.png";
import Stars from "../assets/icons/stars.png"
import { API_URL } from '../constant/url';
import axios from 'axios';
import { Navigate, useLocation, useNavigate  } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import { CheckCircle } from 'lucide-react';

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

        if (location.state?.flashMessage) {

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

    async function shopNow(e) {
        // e.preventDefault();
        console.log("Shop Now button clicked");
        navigate("/productDetails");

    }


    // console.log(flash);
    const AddToCart = async () => {

        navigate("/productDetails");
    }

    return (

        <div className='w-full flex flex-col font-serif bg-white'>
            <div className="w-full ">
                 {/* Flash Messages */}
      {flash.show && (
        <div
          className={`fixed top-6 right-6 z-50 transition-all duration-500 ease-in-out ${
            flash.animate ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <div
            className={`px-6 py-4 rounded-lg shadow-lg text-white flex items-center gap-3 ${
              flash.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
          >
            {flash.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <span>✕</span>
            )}
            {flash.message}
          </div>
        </div>
      )}
            </div>


            <div className="lg:mt-31 mt-30 pt-5 md:mt-30  bg-gradient-to-r from-[#c4e3d4] via-[#c9d8c7] to-[#b8a88a] min-h-[90vh] flex items-center">
                <div className="max-w-7xl mx-auto w-full px-6 lg:px-14">

                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

                        {/* Left Content */}
                        <div className="space-y-8">

                            <span className="inline-block bg-green-100 text-[#1a472a] px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
                                WELCOME TO NKARTINDIA
                            </span>

                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-zinc-900">
                                Shopping and <br />
                                <span className="text-[#1a472a]">
                                    Department Store.
                                </span>
                            </h1>

                            <p className="text-lg text-zinc-700 leading-8 max-w-xl">
                                Shopping is a bit of a relaxing hobby for me,
                                which is sometimes troubling for the bank
                                balance.
                            </p>

                            <div onClick={(e)=>{shopNow(e)}} className="flex gap-5">
                                <button onClick={(e)=>{shopNow(e)}} className="bg-[#1a472a] hover:bg-[#153820] duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-lg">
                                    Learn More →
                                </button>

                                <button onClick={(e)=>{shopNow(e)}} className="border-2 border-[#1a472a] text-[#1a472a] hover:bg-[#1a472a] hover:text-white duration-300 px-8 py-4 rounded-full font-semibold">
                                    Shop Now
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">

                                <div>
                                    <h3 className="font-semibold text-[#1a472a]">
                                        Secure Payment
                                    </h3>
                                    <p className="text-sm text-zinc-600">
                                        100% Secure
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#1a472a]">
                                        Fast Delivery
                                    </h3>
                                    <p className="text-sm text-zinc-600">
                                        Quick & Reliable
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#1a472a]">
                                        Best Quality
                                    </h3>
                                    <p className="text-sm text-zinc-600">
                                        Top Rated Products
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#1a472a]">
                                        Easy Returns
                                    </h3>
                                    <p className="text-sm text-zinc-600">
                                        Hassle Free
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Right Image */}
                        <div className="overflow-hidden left-60 hidden lg:flex justify-center items-center w-full h-[550px]">
                            <img
                                src="/nkart1.png" 
                                alt="Hero"
                                className="h-full w-auto  max-w-6xl object-contain drop-shadow-2xl"
                            />
                        </div>

                    </div>

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
