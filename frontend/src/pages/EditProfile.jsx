import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { Upload, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import axios from "axios";
import { API_URL } from "../constant/url"


const Edit = () => {


    const navigate = useNavigate();
    const data = useParams();
    // const [cancel,setcancel]=useState(1);

    const { id } = useParams();
    const [product, setProduct] = useState([]);


    const location = useLocation();


    const userData = location.state?.userData || {};
    // console.log(userData);

    const [firstName, setFirstName] = useState(userData?.firstName || "");
    const [lastName, setLastName] = useState(userData?.lastName || "");
    const [email, setEmail] = useState(userData?.email || "");
    const [phone, setPhone] = useState(userData?.phone || "");
    const [address, setAddress] = useState(userData?.Address || "");
    // const [profilePicture, setProfilePicture] = useState(userData?.profilePicture || "");
    const [profilePicture, setProfilePicture] = useState(null);



    // useEffect(() => {

    //       if(location.state?.flashMessage){

    //          showFlash(
    //             location.state.flashMessage,
    //             location.state.type
    //          );

    //       }

    //    }, [location]);

    // useEffect(() => {
    //     axios.get(`${API_URL}/products/${id}`)
    //         .then((res) => {
    //             setProduct(res.data.data);
    //         })
    // }, [id]);

    // useEffect(() => {
    //     if (categories.current) {
    //         categories.current.value = product.category;
    //     }
    // }, [product]);

    // const productName = useRef();
    // const productDescription = useRef();
    // const categories = useRef();
    // const stockin = useRef();
    // const salePrice = useRef();
    // const originalPrice = useRef();
    // const productImage = useRef();
    // const availableColor = useRef();
    // const Rating = useRef();
    // const Review = useRef();

    // console.log(data);

    function back() {
        navigate("/", { replace: true });
    }

    // const formsubmit = async (e) => {
    //     e.preventDefault();

    //     const productname = productName.current?.value || "";
    //     const productdescription = productDescription.current?.value || "";
    //     const category = categories.current?.value || "";
    //     const stock = stockin.current?.value || "";
    //     const saleprice = salePrice.current?.value || "";
    //     const originalprice = originalPrice.current?.value || "";
    //     const productimage = productImage.current?.value || "";
    //     const color = availableColor.current?.value || "";
    //     const rating = Rating.current?.value || "";
    //     const review = Review.current?.value || "";

    //     const product = { productname, productdescription, category, stock, saleprice, originalprice, productimage, color, rating, review };
    //     console.log(product);
    //     try {

    //         let res = await axios.put(`${API_URL}/products/edit/${id}`, product);
    //         console.log(res.data);
    //         navigate("/admin");
    //     } catch (err) {
    //         console.log("Error Occur");
    //         if (err.response) {
    //             console.log(err.response.data); // backend error
    //         } else if (err.request) {
    //             console.log("No response from server"); // network error
    //         } else {
    //             console.log(err.message); // other error
    //         }
    //     }


    // }

   

    // async function formsumbit() {
    //     console.log("Navigating to Edit Profile");
    //     const user = {
    //         firstName, lastName, email, phone, address, profilePicture
    //     }
    //     console.log(user);
    //     // const res=await axios.post(`${API_URL}/upload`,user);
    //     // console.log(res.data);
    // }

    const formSubmit = async (e) => {
        // e.preventDefault();
        // console.log("profilePicture: ", profilePicture);
         const userInformation={
            firstName,lastName,email,phone,address
         }
        //  console.log(userInformation);

        try {
            const response = await axios.post(
                `${API_URL}/upload`,
                userInformation,
                {
                    useCredentials: true,
                }                
            
               
            );

            // console.log(response.data);
            navigate("/profile", { state: { flashMessage: response.data.flashMessage, type: "success" } });
        } catch (error) {
            // console.error(error);
        }
    };





    return (
        <div className='w-full min-h-screen text-black font-serif'>
            <header className='w-full flex flex-col gap-4 justify-start px-5 py-3 bg-green-900 text-white lg:pl-15'>

                <button onClick={() => (back())} className='hover:text-amber-400 cursor-pointer flex gap-2'>
                    <ArrowLeft className='w-4' />
                    <p>Back to Admin</p>
                </button>
                <h1 className='text-3xl' >Edit Profile</h1>
                <p>Edit your profile information</p>

            </header><hr />

            <form onSubmit={(e) => {
                e.preventDefault();
                formSubmit();
            }}
            >
                <div className='w-full lg:px-40 flex flex-col gap-10  border-zinc-400  justify-center items-center'>

                    <div className='w-[70%] flex flex-col px-10 gap-6 border-2 rounded-md py-5 mt-5 border-zinc-300'>
                        <h1 className='font-bold text-2xl'>Basic Information</h1>
                        <div className='flex flex-wrap w-full gap-10 justify-start items-center'>

                            <label className='flex flex-col' htmlFor="">Enter Your First Name *
                                <input type="text" className=' mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='Enter Your Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </label>


                            <label className='flex flex-col' htmlFor="">Enter Your Last Name *
                                <input type="text" className=' mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='Enter Your Name' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </label>
                        </div>

                        <label className='flex flex-col' htmlFor="">Enter Your Email Id *
                            <input type="text" className='resize-none mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='Enter Your Email Id' value={email} onChange={(e) => setEmail(e.target.value)} readOnly />
                        </label>
                        {/* <div className='flex flex-col'>

                            <h1 className='text-xl font-bold'>Pricing</h1>
                            <div className='flex w-full justify-start  items-center'>
                                <div className='w-1/2  mt-4 '>
                                    <p className='mb-3'>Category *</p>
                                    <select ref={categories} onChange={(e) => setProduct({ ...product, category: e.target.value })} value={product.category || ""} className="flex items-center w-full border-2 outline-none border-zinc-300 rounded-md px-3 py-2 mb-4">
                                        <option >
                                            Select a category
                                        </option>
                                        <option value="Furniture">Headphones</option>
                                        <option value="Hand Bag">Earbuds</option>
                                        <option value="Books">Speakers</option>
                                        <option value="Tech">Audio-Technica AT2020</option>
                                        <option value="Sneakers">Audio Cables</option>
                                        <option value="Travel">Microphones</option>
                                    </select>
                                </div>

                                <label className='w-1/2 flex justify-start px-3  flex-col' htmlFor="">In Stock Quantity *
                                    <input ref={stockin} defaultValue={product.stock || ""} type="number" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='0' />
                                </label>
                            </div>

                        </div> */}
                    </div>

                    <div className='w-[70%] flex flex-col px-10 gap-6 border-2 rounded-md py-5  border-zinc-300'>

                        <label className='flex flex-col' htmlFor="">Enter Your Mobile Number *
                            <input type="text" value={phone}
                                onChange={(e) => setPhone(e.target.value)} className='resize-none mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='Enter Your Mobile Number' required />
                        </label>
                        <label className='flex flex-col' htmlFor="">Enter Your Address *
                            <input type="text" value={address}
                                onChange={(e) => setAddress(e.target.value)} className='resize-none mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='Enter Your Address' required />
                        </label>

                        {/* <div className='flex flex-col'>

                            <h1 className=''>Enter Your Mobile Number</h1>
                            <div className='flex w-full justify-start  items-center py-5'>
                                <label className='w-1/2 flex justify-start px-3  flex-col' htmlFor="">Sale Price *
                                    <input ref={salePrice} step="any" defaultValue={product.price || ""} type="number" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='0.00' />
                                </label>

                                <label className='w-1/2 flex justify-start px-3  flex-col' htmlFor="">Original Price (Optional)
                                    <input ref={originalPrice} step="any" defaultValue={product.originalPrice || ""} type="number" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='0.00' />
                                </label>
                            </div>

                        </div> */}
                    </div>


                    {/* <div className='w-[70%] flex flex-col px-10 gap-6 border-2 rounded-md py-5  border-zinc-300'>

                        <div className='flex flex-col'>

                            <h1 className='text-xl font-bold'>Profile Picture</h1>
                            <div className='flex w-full justify-center align-center items-center py-5 gap-10'>
                                <div className='flex w-full'>

                                    <input
                                        className="p-2 border-zinc-300 border-2 w-1/2"
                                        type="file"
                                        name="image"
                                        onChange={(e) => setProfilePicture(e.target.files[0])}
                                        required />

                                    


                                </div>
                            </div>

                        </div>
                    </div> */}

                    {/* <div className='w-[90%] flex flex-col px-10 gap-6 border-2 rounded-md py-5  border-zinc-300'>

                        <div className='flex flex-col'>

                            <h1 className='text-xl font-bold'>Available Colors</h1>
                            <div className='flex w-full justify-center align-center items-center py-5 gap-10'>
                                <div className='flex w-full'>

                                    <label className='w-full flex justify-start px-3  flex-col' htmlFor="">
                                        <input defaultValue={product.color || ""} ref={availableColor} type="text" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder="Enter color (e.g., Black, White, #FF0000)" />

                                    </label>
                                </div>
                                <div className='flex justify-end w-[10vw] items-center text-center '>

                                    <button className=' flex justify-end items-center  text-center bg-green-900 text-white px-5 py-2 rounded-md '> Add Color</button>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='w-[90%] flex flex-col px-10  border-2 rounded-md py-5 border-zinc-300'>

                        <div className='flex flex-col'>

                            <h1 className='text-xl font-bold'>Product Rating</h1>
                            <div className='flex w-full justify-start  items-center py-5'>
                                <label className='w-1/2 flex justify-start px-3  flex-col' htmlFor="">Rating (0-5) *
                                    <input defaultValue={product.rating || ""} ref={Rating} step="any" type="number" max="5" min="0" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' />
                                </label>

                                <label className='w-1/2 flex justify-start px-3  flex-col' htmlFor="">Number of Reviews
                                    <input defaultValue={product.numReviews || ""} ref={Review} type="number" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' />
                                </label>
                            </div>

                        </div>
                    </div> */}

                    <div className='w-[70%] mb-10 flex flex-col px-10  border-2 rounded-md py-5 border-zinc-300'>

                        <div className='w-full flex '>

                            <div className='flex w-full gap-2 justify-between'>
                                <label className="w-full flex ">

                                    <input type="submit" className='border-2 w-full hover:bg-green-800 bg-green-900 text-white  px-5  flex justify-center rounded-md py-3 text-center ' />
                                </label>
                                <label className="w-full">

                                    <input className='border-2 w-full  border-zinc-300 cursor-pointer  text-black px-5 flex justify-center rounded-md py-3 text-center ' type="button"
                                        value="Cancel"
                                        onClick={() => navigate("/")} />
                                </label>
                            </div>

                        </div>
                    </div>


                </div>
            </form>
        </div>
    )
}

export default Edit
