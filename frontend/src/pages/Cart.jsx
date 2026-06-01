import React, { useEffect, useState } from 'react'
import Stars from "../assets/icons/stars.png";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../constant/url';
import axios from "axios";
// import file from "../../public/inde"

const Cart = () => {
  let [count, setCount] = useState(1);
  let [product, setProduct] = useState(null);
  let [amount, setAmount] = useState(1);
  let [userProducts, setUserProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();


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

  // let data = useLocation();

  let { id } = useParams();

  // console.log(id);

  function decrease() {
    if (count > 1) {
      setCount(count = count - 1);
    }
  }

  function increase() {
    setCount(count + 1);
  }


  //   const removeNow = async (id) => {

  //    try {

  //       const res = await axios.delete(
  //          `${API_URL}/products/${productId}`,
  //          {
  //             withCredentials: true,
  //          }
  //       );

  //       console.log(res.data);

  //       // update UI instantly
  //       setUserProducts((prevProducts) =>
  //          prevProducts.filter((product) => product._id !== id)
  //       );

  //    } catch(err) {

  //       console.log(err);

  //    }

  // };


  //Remove from cart

  async function removeNow(productId) {
    try {
      const res = await axios.delete(`${API_URL}/products/${productId}`, {
        withCredentials: true,
      })
      // fetchProducts();
      // fetchData();
      // console.log("chal raha hai");

      setUserProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== productId
        )
      );

      showFlash(
        res.data.flashMessage[0],
        "success"
      );

    } catch(err) {
        navigate("/login", {
                state: {
                    flashMessage: "Please login to access the home page",
                    type: "error",
                },
            });
      };
  }




  //product fetch for user cart
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await axios.get(
          `${API_URL}/products/cart`,
          {
            withCredentials: true,
          }
        );

        setUserProducts(res.data.products);

      } catch (err) {

        console.log(err);

      }

    };

    fetchProducts();

  }, []);
  //     } catch(err) {

  //        console.log(err);

  //     } finally {

  //        setLoading(false);

  //     }

  //  fetchProducts();

  // }, []);



  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`${API_URL}/Cart`, {
          withCredentials: true
        });
        // console.log(response.data);
      } catch (err) {
        //console.log(err.response.data);
        navigate("/login", { state: { message: "Please login to continue" } });

      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!id) return;

    axios.get(`${API_URL}/products/${id}`, {
      withCredentials: true,
    })
      .then((res) => {
        setProduct([res.data.data]); // array
      });
  }, [id]);
  // console.log(product);

  // console.log(product);
  // console.log(location.state.data);

  useEffect(() => {
    if (product?.[0]?.price) {
      setAmount(product[0].price);
    }
  }, [product]);

  //   const payNow = async () => {
  //   console.log(amount);

  //   try {
  //     if (!amount) {
  //       alert("Enter amount first!");
  //       return;
  //     }

  //     const res = await fetch(`${API_URL}/products/create-order`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({ amount })
  //     });

  //     const data = await res.json();
  //     console.log(import.meta.env.VITE_RAZORPAY_KEY);
  //     const options = {
  //       key: import.meta.env.VITE_RAZORPAY_KEY,
  //       amount: data.order.amount,
  //       currency: "INR",
  //       order_id: data.order.id,

  //       name: "My Store",
  //       description: "Product Payment",

  //       handler: function (response) {
  //         alert("Payment Successful ✅");
  //         console.log(response);

  //         // OPTIONAL: send payment verification to backend
  //       }
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();

  //   } catch (err) {
  //     console.log("Payment Error:", err);
  //   }
  // };

  const payNow = async () => {
    try {

      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Razorpay failed to load");
        return;
      }

      const amount = 1;
      const res1 = await axios.get(`${API_URL}/products/createOrder`, {
        withCredentials: true,
      })
      console.log("chal raah hai");

      const data = res1.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.order.amount,
        currency: "INR",
        order_id: data.order.id,

        handler: function (response) {
          showFlash(
            res1.data.flashMessage[0],
            "success"
          );
          console.log(response);
          alert("Payment Successful ✅");
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.open();

    } catch (err) {
      showFlash(
        err.response.data.flashMessage[0],
        "error"
      );
      console.log("Payment Error:", err);
    }
  };
  function getAmount(e) {
    // console.log(e);
    setAmount(e);
  }
  // console.log(amount);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


  return (
    <div className=' w-full min-h-screen mt-36 text-black lg:px-15 font-serif'>
      <div className="w-full ">
        {
          flash.show && (
            <div
              className={`mt-30 
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
      <h1 className=' m-5 px-5 text-zinc-500 text-4xl font-bold'>Cart</h1>

      {/* {product ? ( */}
      {
  userProducts.length === 0 ? (
    <p>No product found</p>
  ) : (

      userProducts.map((p) => (
        <div key={p._id}>

          <div className='lg:flex font-[Poppins]'>

            <div className='flex flex-col justify-center items-center ml-5 gap-2'>
              <img
                className='rounded-md 
    w-[400px] h-[250px] 
    lg:w-[800px] lg:h-[590px] 
    object-cover'
                src={p.images[0]}
                alt={p.name}
              />
            </div>


            <div className='pl-10 pt-5  lg:px-20  flex flex-col font-serif justify-start items-center'>
              <p className='w-full py-2 flex justify-around px-4'>
                <span className='w-full flex justify-start font-bold text-3xl'>{p.name}</span>

              </p>
              <div className='flex w-full mb-2'>

                <p className='w-full flex justify-start w-full ml-4 text-zinc-500'> {p.category}</p>
                <p className='justify-end font-bold pr-10 text-2xl font-[Poppins]'>₹{p.price}</p>
              </div>
              {/* <input className='flex justify-start w-full ml-8 text-2xl font-bold font-sans py-3' readOnly /> */}


              {/* <span name="amount" className='w-full flex justify-start ml-7 text-2xl mt-4 font-bold'>{product[0].price}</span> */}
              <span className='lg:ml-4 px-5 lg:px-0  text-zinc-400'>{p.description}</span>
              <p className='w-full relative py-2 flex justify-start'>
                <img width='100px' height='1px' className='absolute bottom-[-70px] ml-4 flex justify-start' src={Stars} alt="" />
              </p>
              <p className='lg:mr-80 mr-40 mt-1 pl-20 lg:pl-30'>(121)</p>
              <div className="w-full flex justify-start items-center mt-8">

                {/* Title */}
                <h1 className="ml-4 text-xl font-bold">Count</h1>

                {/* Counter Box */}
                <div className="w-full flex justify-end items-center gap-6 px-10 text-xl font-[Poppins]">
                  <div className='lg:gap-10 flex justify-center items-center gap-5 px-15 lg:px-20 rounded-3xl hover:bg-green-800 hover:text-white text-2xl border-2 w-1/3'>

                    {/* Decrease */}
                    <button onClick={() => { decrease() }} className="cursor-pointer px-3 leading-4  ">
                      -
                    </button>

                    {/* Value */}
                    <p className='text-sm'>{count}</p>

                    {/* Increase */}
                    <button
                      onClick={() => { increase() }}
                      className="cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                </div>

              </div>
              <div className='flex w-full relative'>

                <button onClick={() => payNow()} className='relative bottom-4 mt-10 ml-5 hover:bg-green-900 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2' >Add To Cart</button>
                <button onClick={() => removeNow(p._id)} className='relative bottom-4 mt-10 ml-5 hover:bg-red-800 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2' >Remove From Cart</button>
              </div>


              <div className='lg:w-full lg:px-5 mx-5 mt-10 lg:mt-10 flex lg:flex-col gap-5'>
                <div className='flex flex-col '>
                  <p>Free Delivery</p>
                  <p className='underline'>Enter your Postal code for Delivery Availability</p>
                </div>
                <div>
                  <p>Return Delivery</p>
                  <p>Free 30days Delivery Returns.</p>
                  <span className='underline'>Details</span>
                </div>
              </div>

            </div>

          </div>
          <div className='m-6 w-full font-serif'>
            <h1 className='text-2xl font-bold'>JBL Tune 600BTNC Full Specification</h1>
            <div className='w-full flex flex-col lg:flex-row gap-3 px-3 lg:gap-10 mt-5'>
              <div className='w-full flex flex-col gap-3'>


                <p>
                  <span >Brand</span>
                  <span className='font-bold float-end'>Apple</span>
                </p>< hr />
                <p>
                  <span>Model</span>
                  <span className='font-bold float-end'>Apple</span>
                </p><hr />
                <p>
                  <span>Connectivity</span>
                  <span className='font-bold float-end'>Apple</span>
                </p><hr />
              </div>
              <div className='w-full flex flex-col gap-3'>

                <p>

                  <span>Battery Life</span>
                  <span className='font-bold float-end'>Apple</span>
                </p><hr />
                <p>
                  <span>Noise Cancelling</span>
                  <span className='font-bold float-end'>Apple</span>
                </p><hr />
                <p>
                  <span>Weight</span>
                  <span className='font-bold float-end'>Apple</span>
                </p><hr />

              </div>


            </div>

          </div>

        </div>



      ))
      
  )
}









    </div>
  )
}

export default Cart
