import React, { useEffect, useState } from 'react'
import Stars from "../assets/icons/stars.png";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../constant/url';
import axios from "axios";
import { ChevronUp, ChevronDown, Trash2, Truck, RotateCcw, Lock, CheckCircle } from 'lucide-react'
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

    } catch (err) {
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
    // <div className=' w-full min-h-screen mt-36 text-black lg:px-15 font-serif'>
     <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white mt-20">
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
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-slate-500 mb-3 uppercase tracking-wide">
            Shopping Cart
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
            Your Cart
          </h1>
          <p className="text-slate-600">
            {userProducts.length} {userProducts.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {/* Cart Items */}
        {userProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-6 mb-12">
            {userProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                  {/* Product Image */}
                  <div className="lg:col-span-1 flex justify-center">
                    <div className="bg-slate-100 rounded-xl p-6 w-full max-w-xs">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
                        {product.category}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900">
                        {product.name}
                      </h2>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-baseline gap-3 pt-2">
                      <span className="text-3xl font-bold text-slate-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-lg line-through text-slate-400">
                        ₹{(product.price * 1.67).toLocaleString()}
                      </span>
                      <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                        40% OFF
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-1 space-y-4">
                    {/* Quantity Selector */}
                    <div className="bg-slate-50 rounded-xl p-4 inline-block w-full lg:w-auto">
                      <label className="text-sm font-semibold text-slate-700 block mb-3">
                        Quantity
                      </label>
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white">
                        <button
                          // onClick={() => decrease(product._id)}
                          // onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                          className="p-2 hover:bg-slate-100 transition-colors text-slate-600"
                          aria-label="Decrease quantity"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </button>
                        <span className="flex-1 text-center font-semibold py-2">
                       
                        </span>
                      
                          {/* {getQuantity(product._id)} */} 
                        <button
                          // onClick={() => increase(product._id)}
                          // onClick={() => setCount((prev) => prev + 1)}
                          className="p-2 hover:bg-slate-100 transition-colors text-slate-600"
                          aria-label="Increase quantity"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeNow(product._id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-red-200 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-300"
                    >
                      <Trash2 className="w-5 h-5" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {userProducts.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Benefits */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4">
                Shipping & Returns
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Free Delivery</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Free shipping across India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 p-5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <RotateCcw className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Easy Returns</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Secure Payment</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Encrypted transactions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 p-5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Authentic Products</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        100% genuine guarantee
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 h-fit sticky top-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  {/* <span className="font-semibold">₹{calculateTotal().toLocaleString()}</span> */}
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (estimated)</span>
                  <span className="font-semibold">
                    {/* ₹{Math.round(calculateTotal() * 0.18).toLocaleString()} */}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-300 pt-6 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-slate-900">
                    {/* ₹{Math.round(calculateTotal() * 1.18).toLocaleString()} */}
                  </span>
                </div>
              </div>

              <button onClick={()=>payNow()} className="w-full bg-emerald-600 text-white font-semibold py-4 rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Proceed to Checkout
              </button>

              <button className="w-full mt-3 border-2 border-slate-300 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-100 transition-colors duration-300">
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Cart
