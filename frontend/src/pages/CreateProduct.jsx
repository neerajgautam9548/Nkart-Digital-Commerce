import { React, useEffect, useRef, useState } from 'react'
import { Upload, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import ProductDetails from './ProductDetails';
import axios from "axios";
import { API_URL } from "../constant/url"


export const CreateProduct = () => {

  const navigate = useNavigate();




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


  useEffect(() => {

    // first show component
    setShow(true);

    // then animate inside
    setTimeout(() => {
      setAnimate(true);
    }, 100);

    // after 2 sec move out
    setTimeout(() => {
      setAnimate(false);
    }, 2000);

    // remove completely
    setTimeout(() => {
      setShow(false);
    }, 2600);

  }, []);


  const productName = useRef();
  const productDescription = useRef();
  const categories = useRef();
  const stockin = useRef();
  const salePrice = useRef();
  const originalPrice = useRef();
  const productImage = useRef();
  const availableColor = useRef();
  const Rating = useRef();
  const Review = useRef();

  function back() {
    navigate(-1);
  }
  const formSubmit = async (e) => {
    e.preventDefault();
    const productname = productName.current.value;
    const productdescription = productDescription.current.value;
    const category = categories.current.value;
    const stock = stockin.current.value;
    const saleprice = salePrice.current.value;
    const originalprice = originalPrice.current.value;
    const productimage = productImage.current.value;
    const color = availableColor.current.value;
    const rating = Rating.current.value;;
    const review = Review.current.value;

    const product = { productname, productdescription, category, stock, saleprice, originalprice, productimage, color, rating, review };
    try {

      let response = await axios.post(`${API_URL}/products/create`,product,{
        withCredentials:true,
      });
      // console.log(response.data.flashMessage);

      navigate("/admin", {
        state: {
          flashMessage: response.data.flashMessage[0],
          type: "success",
        },
      });
    } catch (err) {
      setFlash(err.response.data.flashMessage[0], "error");
      console.log("Error Occur");
      if (err.response) {
        console.log(err.response.data); // backend error
      } else if (err.request) {
        console.log("No response from server"); // network error
      } else {
        console.log(err.message); // other error
      }
    }
    


    // console.log(product);
  }

  return (


    <div className='w-full min-h-screen text-black font-serif'>
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
      <header className='w-full flex flex-col gap-4 justify-start px-5 py-3 bg-green-900 text-white lg:pl-15'>

        <button onClick={() => (back())} className='hover:text-amber-400 cursor-pointer flex gap-2'>
          <ArrowLeft className='w-4' />
          <p>Back to Admin</p>
        </button>
        <h1 className='text-3xl'>Create New Product</h1>
        <p>Add a new product to your store inventory</p>

      </header><hr />

      <form onSubmit={(e) => formSubmit(e)} className='w-full flex flex-col justify-center' action="">
        <div className='w-full lg:px-40 flex flex-col gap-10  border-zinc-400  justify-center items-center'>

          <div className='w-[90%] flex flex-col px-10 gap-6 border-2 rounded-md py-5 mt-5 border-zinc-300'>
            <h1 className='font-bold text-2xl'>Basic Information</h1>

            <label className='flex flex-col' htmlFor="">Product Name *
              <input type="text" ref={productName} className=' mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='Enter product name' />
            </label>

            <label className='flex flex-col' htmlFor="">Description *
              <textarea type="text" ref={productDescription} className='resize-none mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='Enter product Description' />
            </label>
            <div className='flex flex-col'>

              <h1 className='text-xl font-bold'>Pricing</h1>
              <div className='flex w-full justify-start  items-center'>
                <div className='w-1/2  mt-4 '>
                  <p className='mb-3'>Category *</p>
                  <select ref={categories} className="flex items-center w-full border-2 outline-none border-zinc-300 rounded-md px-3 py-2 mb-4">
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
                  <input ref={stockin} type="number" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='0' />
                </label>
              </div>

            </div>
          </div>

          <div className='w-[90%] flex flex-col px-10 gap-6 border-2 rounded-md py-5  border-zinc-300'>

            <div className='flex flex-col'>

              <h1 className='text-xl font-bold'>Pricing</h1>
              <div className='flex w-full justify-start  items-center py-5'>
                <label className='w-1/2 flex justify-start px-3  flex-col' htmlFor="">Sale Price *
                  <input ref={salePrice} step="any" type="number" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='0.00' />
                </label>

                <label className='w-1/2 flex justify-start px-3  flex-col' htmlFor="">Original Price (Optional)
                  <input ref={originalPrice} step="any" type="number" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder='0.00' />
                </label>
              </div>

            </div>
          </div>


          <div className='w-[90%] flex flex-col px-10 gap-6 border-2 rounded-md py-5  border-zinc-300'>

            <div className='flex flex-col'>

              <h1 className='text-xl font-bold'>Product Images</h1>
              <div className='flex w-full justify-center align-center items-center py-5 gap-10'>
                <div className='flex w-full'>

                  <label className='w-full flex justify-start px-3  flex-col' htmlFor="">
                    <input ref={productImage} type="text" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder="Enter image URL (e.g., https://example.com/image.jpg)" />

                  </label>
                </div>
                <div className='flex justify-end w-[10vw] items-center text-center '>

                  <button className=' flex justify-end items-center  text-center bg-green-900 text-white px-5 py-2 rounded-md '> Add Image</button>

                </div>
              </div>

            </div>
          </div>

          <div className='w-[90%] flex flex-col px-10 gap-6 border-2 rounded-md py-5  border-zinc-300'>

            <div className='flex flex-col'>

              <h1 className='text-xl font-bold'>Available Colors</h1>
              <div className='flex w-full justify-center align-center items-center py-5 gap-10'>
                <div className='flex w-full'>

                  <label className='w-full flex justify-start px-3  flex-col' htmlFor="">
                    <input ref={availableColor} type="text" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' placeholder="Enter color (e.g., Black, White, #FF0000)" />

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
                  <input ref={Rating} step="any" type="number" defaultValue={5} max="5" min="0" className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' />
                </label>

                <label className='w-1/2 flex justify-start px-3  flex-col' htmlFor="">Number of Reviews
                  <input ref={Review} type="number" defaultValue={0} className='w-full mt-2 px-4 py-2 rounded-md border-2 border-zinc-300 outline-none' />
                </label>
              </div>

            </div>
          </div>

          <div className='w-[90%] mb-10 flex flex-col px-10  border-2 rounded-md py-5 border-zinc-300'>

            <div className='w-full flex '>

              <div className='flex w-full gap-2'>
                <button className='border-2 w-1/2 hover:bg-green-800 bg-green-900 text-white  px-5  flex justify-center rounded-md py-3 text-center '>Create Product</button>
                <button className='border-2 w-1/2  border-zinc-300 cursor-pointer  text-black font-bold  px-5 flex justify-center rounded-md py-3 text-center '>Cancel</button>
              </div>

            </div>
          </div>


        </div>
      </form>
    </div>
  )
}
export default CreateProduct;