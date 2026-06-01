import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/icons/e_com_logo.jpg";
import Location from "../../assets/icons/location.png"
import Person from "../../assets/icons/person.png"
import Cart from "../../assets/icons/cart.png"
import Exit from "../../assets/icons/exit.png"
import { Search, User, ShoppingCart, ChevronDown, Phone, MapPin, Settings } from "lucide-react";
import axios from 'axios';
import { API_URL } from '../../constant/url';

const Navbar = () => {

    const navigate = useNavigate();
    const [search,setSearch]=useState("");
    
    const handleSearch = (e) => {
        const value=e.target.value;
        setSearch(value);
        navigate(`/productDetails?search=${value}`);
    };

    async function logout() {
        try {
            
            const response = await axios.get(`${API_URL}/users/logout`, {
                withCredentials: true,
            });
            navigate("/login", {
                state: {    
                    flashMessage: response.data.flashMessage[0],
                    type: "success"
                }
            });
        } catch (err) {
            // console.log("chal raha hai logout")
            console.log(err);
        }


    }

    return (
        <div className='w-full flex flex-col font-serif bg-white'>
            <div className='fixed top-0 z-50 w-full overflow-y-auto'>

                <div className='w-full bg-[#1a472a] flex justify-around items-center text-sm'>
                    <div className='p-2 flex '>

                        <Phone className="h-4 w-4" />
                        <span className='lg:ml-2'>+9548320715</span>
                    </div>
                    <div className='lg:justify-center flex justify-between items-center gap-3  w-[40vw]'>

                        <span className='text-amber-200 fond-bold'>Get 50% Off on Selected Items</span>
                        <span>|</span>
                        <span>Shop Now</span>

                    </div>
                    <div className='lg:gap-3 flex items-center justify-end '>

                        <span>Eng</span>
                        <ChevronDown className="h-4 w-4" />

                        <MapPin className="h-4 w-4" />

                        <span>Location</span>
                        <ChevronDown className="h-4 w-4" />


                    </div>
                </div>

                <div className='w-full h-20px bg-[#f5f7f5] flex items-center px-3 py-5 text-black'>

                    <div className='w-full gap-4 lg:pl-10'>
                        <span className='text-2xl'>🛒</span>

                        <Link className='text-[#1a472a] text-2xl ml-2 font-bold' to="/" >nkartindia</Link>
                    </div>

                    <div className='hidden lg:flex justify-start w-1/2 gap-5 mr-5'>
                        <Link className='  rounded-md px-3 py-2 hover:bg-zinc-300' to="/">Home</Link>
                        <Link className='rounded-md px-3 py-2 hover:bg-zinc-300' to="/productDetails">Products</Link>

                        <Link className=' rounded-md px-3 py-2 hover:bg-zinc-300 mr-5' to="/cart">Cart</Link>


                    </div>

                    <div className='hidden lg:flex w-full justify-start relative'>
                        <input value={search}  onChange={handleSearch} className='border-0 bg-zinc-200 px-3 py-3 mr-5 text-black w-full rounded-md outline-none' type="text" placeholder="Enter your products name..." />
                    </div>

                    <div className='flex justify-end gap-4'>
                        <span className='flex items-center justify-center gap-2 rounded-md lg:hover:bg-zinc-300 w-full ml-2  '>
                            <Link className='rounded-md flex justify-between items-center gap-2  pr-3 py-2 ' to="/admin">
                                <Settings className="h-4 w-4" />


                                <p className='hidden lg:flex '>Admin</p>
                            </Link>
                        </span>
                        <span className='flex items-center justify-center gap-2 rounded-md lg:hover:bg-zinc-300 w-full ml-2  '>
                            <Link className='rounded-md flex justify-between items-center gap-2  px-3 py-2 ' to="/profile">

                                <User className="w-5" />

                                <p className='hidden lg:flex '>Account</p>
                            </Link>

                        </span>
                        <span className='lg:hidden flex items-center gap-2'>
                            <Link to="/cart" >
                                <ShoppingCart className="w-7" />
                            </Link>

                            <p className=' hidden lg:flex'>Cart</p>

                        </span>

                        <span className='hidden lg:flex items-center justify-center px-5 py-2 gap-2 hover:bg-zinc-300 rounded-md'>
                            <ShoppingCart className="w-5" />

                            <button onClick={() => { logout() }} className='hidden lg:flex  rounded-md  ' >Logout</button>


                        </span>
                    </div>


                </div>

            </div>



        </div>
    )
}

export default Navbar
