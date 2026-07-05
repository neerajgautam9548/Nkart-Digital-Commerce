import React, { useEffect, useState } from 'react'
import Stars from "../assets/icons/stars.png";
import { API_URL } from '../constant/url';
import axios from "axios";
import { Heart, Star,CheckCircle  } from "lucide-react"
import { Link, useNavigate, useSearchParams } from 'react-router-dom';


const ProductDetails = () => {

  const [products, setProducts] = new useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
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



  useEffect(() => {
    axios.get(`${API_URL}/products/all`, {
      withCredentials: true
    })
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        navigate("/login", {
          state: {
            flashMessage: "Please login to access the home page",
            type: "error",
          },
        });
      });
  }, []);
  // console.log(products);

  //   useEffect(() => {
  //     axios.get(`${API_URL}/products/all`)
  //       .then((res) => setProducts(res.data.data));
  //   }, []);

  //   const [products, setProducts] = useState([]);
  //   const [selectedCategory, setSelectedCategory] = useState("All");
  //   const categories = ["All", ...new Set(products.map((p) => p.category))];

  //   const filteredProducts = selectedCategory === "All"
  //     ? products
  //     : products.filter((p) => p.category === selectedCategory);
  async function Cart(id) {
    // console.log(id);
    try {

      await axios.post(`${API_URL}/products/addCart`, {

        productId: id,
      }, {
        withCredentials: true,
      })
        .then((res) => {
          showFlash(
            res.data.flashMessage[0],
            "success"
          )
          console.log(res.data);
        })
        .catch((err) => {
          showFlash(
            err.response.data.flashMessage[0],
            "error"
          )
          console.log("add cart show error" + err)
        })
      // navigate(`/cart/${id}`,{state:{data:id}});
    }
    catch (err) {
      console.log("add cart show error" + err);
    }
  }

  const filteredProducts = products.filter((product) =>
  product.name
    .toLowerCase()
    .startsWith(search.toLowerCase())
);


  return (

    <div className='bg-white text-zinc-900 w-full min-h-screen mt-30'>
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

      <div className='px-5 my-10'>

        {/* ✅ Categories (only once) */}
        {/* {categories.map((cat) => ( */}
        {/* <div
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`flex justify-between items-center cursor-pointer ${selectedCategory === cat ? "bg-gray-200" : ""
          }`}
      >
        <h1 className='my-4 mx-20 text-2xl font-bold py-3'>{cat}</h1>

        <p className='flex justify-end mr-10 text-zinc-500 text-xl'>
          {cat === "All"
            ? products.length
            : products.filter(p => p.category === cat).length} Products
        </p>
      </div> */}
        {/* ))} */}

        {/* ✅ Products (only once) */}
        <div className='px-5 my-10 '>
          <h1 className='my-4  text-2xl font-bold py-3'>Weekly Popular Products</h1>
          <div className='flex flex-wrap justify-center items-center gap-10'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (


                <div key={product._id}  className='flex flex-col justify-start items-center lg:w-1/5'>
                  <img
                    className='rounded-xl 
  w-full 
  lg:w-[20vw] 
  h-[250px] 
  object-cover'
                    src={product.images?.[0]}
                    alt=""
                  />



                  <p className='sm:px-5vw lg:p-5 w-full py-2 flex justify-around px-4'>
                    <span className='w-full font-semibold flex justify-start'>{product.name}</span>
                    <span className='w-full flex justify-end font-bold '>₹{product.price}</span>

                  </p>
                  <div className='space-y-2 lg:w-full lg:relative'>

                    <p className="text-sm lg:right-30 pl-4 text-muted-foreground line-clamp-1">{product.description}</p>
                  </div>
                  <p className='w-full  relative'>
                    <img width='100px' height='0px' className='absolute bottom-[-70px] ml-4 flex justify-start' src={Stars} alt="" />
                    {/* <Star className='w-4'/> */}

                  </p>
                  <p className='mt-1 pl-5'>(121)</p>
                  <div className='w-full relative'>

                    <button onClick={() => { Cart(product._id) }} className='relative bottom-4 mt-10 ml-5 hover:bg-green-900 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2  '>Add to Cart</button>

                  </div>
                </div>
              ))
            ) : (
              <p className='flex itext-center w-full'>No products found. Try adjusting your search or filter.</p>
            )}



          </div>


        </div>


        {/* <div className='px-5 my-10 '>
          <h1 className='my-4 mx-20 text-2xl font-bold py-3'>Weekly Popular Products</h1>
          <div className='flex flex-wrap justify-center items-center gap-10'>

            <div className='flex flex-col justify-start items-center'>
              <img className='rounded-xl lg:w-[17vw]' src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=350&h=350&fit=crop" alt="" />



              <p className='sm:px-5vw lg:p-5 w-full py-2 flex justify-around px-4'>
                <span className='w-full font-semibold flex justify-start'>JBL TUNE 600BTNC</span>
                <span className='w-full flex justify-end font-bold'>$59.00</span>

              </p>
              <p className='flex justify-start w-full ml-8 text-zinc-500'> Premium Bone Conduction Open Ear</p>
              <p className='w-full relative '>
                <img width='100px' height='0px' className='absolute bottom-[-70px] ml-4 flex justify-start' src={Stars} alt="" />

              </p>
              <p className='mt-1'>(121)</p>
              <div className='w-full relative'>

                <button className='relative bottom-4 mt-10 ml-5 hover:bg-green-900 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2  '>Add to Cart</button>

              </div>
            </div>
            <div className='flex flex-col justify-start items-center'>
              <img className='rounded-xl lg:w-[17vw]' src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=350&h=350&fit=crop" alt="" />



              <p className='sm:px-5vw lg:p-5 w-full py-2 flex justify-around px-4'>
                <span className='w-full font-semibold flex justify-start'>JBL TUNE 600BTNC</span>
                <span className='w-full flex justify-end font-bold'>$59.00</span>

              </p>
              <p className='flex justify-start w-full ml-8 text-zinc-500'> Premium Bone Conduction Open Ear</p>
              <p className='w-full relative '>
                <img width='100px' height='0px' className='absolute bottom-[-70px] ml-4 flex justify-start' src={Stars} alt="" />

              </p>
              <p className='mt-1'>(121)</p>
              <div className='w-full relative'>

                <button className='relative bottom-4 mt-10 ml-5 hover:bg-green-900 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2  '>Add to Cart</button>

              </div>
            </div>
            <div className='flex flex-col justify-start items-center'>
              <img className='rounded-xl lg:w-[17vw]' src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=350&h=350&fit=crop" alt="" />



              <p className='sm:px-5vw lg:p-5 w-full py-2 flex justify-around px-4'>
                <span className='w-full font-semibold flex justify-start'>JBL TUNE 600BTNC</span>
                <span className='w-full flex justify-end font-bold'>$59.00</span>

              </p>
              <p className='flex justify-start w-full ml-8 text-zinc-500'> Premium Bone Conduction Open Ear</p>
              <p className='w-full relative '>
                <img width='100px' height='0px' className='absolute bottom-[-70px] ml-4 flex justify-start' src={Stars} alt="" />

              </p>
              <p className='mt-1'>(121)</p>
              <div className='w-full relative'>

                <button className='relative bottom-4 mt-10 ml-5 hover:bg-green-900 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2  '>Add to Cart</button>

              </div>
            </div>
            <div className='flex flex-col justify-start items-center'>
              <img className='rounded-xl lg:w-[17vw]' src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=350&h=350&fit=crop" alt="" />



              <p className='sm:px-5vw lg:p-5 w-full py-2 flex justify-around px-4'>
                <span className='w-full font-semibold flex justify-start'>JBL TUNE 600BTNC</span>
                <span className='w-full flex justify-end font-bold'>$59.00</span>

              </p>
              <p className='flex justify-start w-full ml-8 text-zinc-500'> Premium Bone Conduction Open Ear</p>
              <p className='w-full relative '>
                <img width='100px' height='0px' className='absolute bottom-[-70px] ml-4 flex justify-start' src={Stars} alt="" />

              </p>
              <p className='mt-1'>(121)</p>
              <div className='w-full relative'>

                <button className='relative bottom-4 mt-10 ml-5 hover:bg-green-900 hover:text-white flex justify-center rounded-3xl border-2 px-5 py-2 w-1/2  '>Add to Cart</button>

              </div>
            </div>





          </div>
        </div> */}










      </div>
    </div>
  )
}
export default ProductDetails;

// export default ProductDetails;

//     // <div className="group relative bg-white rounded-lg p-4">
//     //   {/* Wishlist Button */}
//     //   <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
//     //     <Heart className="h-4 w-4 text-gray-400" />
//     //   </button>

//     //   {/* Product Image */}
//     //   <Link href={`/products/${product.id}`}>
//     //     <div className="aspect-square relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
//     //       <Image
//     //         src={product.image}
//     //         alt={product.name}
//     //         fill
//     //         className="object-cover group-hover:scale-105 transition-transform duration-300"
//     //       />
//     //     </div>
//     //   </Link>

//     //   {/* Product Info */}
//     //   <div className="space-y-2">
//     //     <div className="flex items-start justify-between gap-2">
//     //       <Link href={`/products/${product.id}`}>
//     //         <h3 className="font-medium text-foreground hover:text-primary line-clamp-1">
//     //           {product.name}
//     //         </h3>
//     //       </Link>
//     //       <span className="font-semibold text-foreground whitespace-nowrap">
//     //         ${product.price.toFixed(2)}
//     //       </span>
//     //     </div>

//     //     <p className="text-sm text-muted-foreground line-clamp-1">
//     //       {product.description}
//     //     </p>

//     //     {/* Rating */}
//     //     <div className="flex items-center gap-1">
//     //       <div className="flex">
//     //         {[...Array(5)].map((_, i) => (
//     //           <Star
//     //             key={i}
//     //             className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
//     //           />
//     //         ))}
//     //       </div>
//     //       <span className="text-sm text-muted-foreground">({product.reviews})</span>
//     //     </div>

//     //     {/* Add to Cart Button */}
//     //     <Button
//     //       variant="outline"
//     //       size="sm"
//     //       className="w-fit rounded-full border-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
//     //     >
//     //       Add to Cart
//     //     </Button>
//     //   </div>
//     // </div>
//     <div className="flex flex-wrap gap-6 mt-30">
//   {filteredProducts.map((product) => (
//     <div key={product._id} className="group relative bg-white rounded-lg p-4 w-60">

//       {/* Wishlist */}
//       <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100">
//         <Heart className="h-4 w-4 text-gray-400" />
//       </button>

//       {/* Image */}
//       <Link to={`/products/${product._id}`}>
//         <div className="aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
//           <img
//             src={product.images?.[0]}
//             alt={product.name}
//             className="object-cover w-full h-full group-hover:scale-105 transition"
//           />
//         </div>
//       </Link>

//       {/* Info */}
//       <div className="space-y-2">
//         <div className="flex justify-between">
//           <h3 className="font-medium">{product.name}</h3>
//           <span className="font-semibold">₹{product.price}</span>
//         </div>

//         <p className="text-sm text-gray-500">
//           {product.description}
//         </p>

//         {/* Rating */}
//         <div className="flex items-center gap-1">
//           {[...Array(5)].map((_, i) => (
//             <Star
//               key={i}
//               className={`h-3 w-3 ${
//                 i < Math.floor(product.rating)
//                   ? "text-yellow-400"
//                   : "text-gray-300"
//               }`}
//             />
//           ))}
//           <span className="text-sm text-gray-500">
//             ({product.numReviews})
//           </span>
//         </div>

//         {/* Button */}
//         <button className="border px-3 py-1 rounded-full hover:bg-black hover:text-white">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   ))}
// </div>
//   )
// }

// export default ProductDetails

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Heart, Star } from "lucide-react";
// import { Link } from "react-router-dom";
// import { API_URL } from "../constant/url";

// const ProductDetails = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const productsPerPage = 4;

//   // Fetch products
//   useEffect(() => {
//     axios.get(`${API_URL}/products/all`)
//       .then((res) => setProducts(res.data.data))
//       .catch((err) => console.log(err));
//   }, []);

//   // Pagination logic
//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;
//   const currentProducts = products.slice(indexOfFirst, indexOfLast);

//   const totalPages = Math.ceil(products.length / productsPerPage);

//   return (
//     <div className="px-10 py-10">

//       {/* 🔥 All Products */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">All Products</h1>
//         <p className="text-gray-500">{products.length} products</p>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-4 gap-8">
//         {currentProducts.map((product) => (
//           <div key={product._id} className="group relative bg-white rounded-lg p-4 shadow-sm">

//             {/* Wishlist */}
//             <button className="absolute top-4 right-4 p-2 rounded-full bg-white shadow opacity-0 group-hover:opacity-100">
//               <Heart className="h-4 w-4 text-gray-400" />
//             </button>

//             {/* Image */}
//             <Link to={`/products/${product._id}`}>
//               <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
//                 <img
//                   src={product.images?.[0]}
//                   alt={product.name}
//                   className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
//                 />
//               </div>
//             </Link>

//             {/* Info */}
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <h3 className="font-medium">{product.name}</h3>
//                 <span className="font-semibold">₹{product.price}</span>
//               </div>

//               <p className="text-sm text-gray-500 line-clamp-1">
//                 {product.description}
//               </p>

//               {/* Rating */}
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`h-3 w-3 ${
//                       i < Math.floor(product.rating || 0)
//                         ? "text-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//                 <span className="text-sm text-gray-500">
//                   ({product.numReviews || 0})
//                 </span>
//               </div>

//               {/* Button */}
//               <button className="border px-4 py-1 rounded-full hover:bg-black hover:text-white">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 🔥 Pagination */}
//       <div className="flex justify-center mt-10 gap-3">
//         <button
//           onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//           className="px-3 py-1 border rounded"
//         >
//           {"<"}
//         </button>

//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-4 py-1 rounded-full ${
//               currentPage === i + 1
//                 ? "bg-green-700 text-white"
//                 : "border"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}

//         <button
//           onClick={() =>
//             setCurrentPage((p) => Math.min(p + 1, totalPages))
//           }
//           className="px-3 py-1 border rounded"
//         >
//           {">"}
//         </button>
//       </div>

//       {/* 🔥 Weekly Popular Products */}
//       <h1 className="text-2xl font-bold mt-16 mb-6">
//         Weekly Popular Products
//       </h1>

//       <div className="grid grid-cols-4 gap-8">
//         {products.slice(0, 4).map((product) => (
//           <div key={product._id} className="bg-white p-4 rounded-lg shadow-sm">

//             <img
//               src={product.images?.[0]}
//               alt={product.name}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             />

//             <div className="flex justify-between">
//               <h3 className="font-medium">{product.name}</h3>
//               <span className="font-semibold">₹{product.price}</span>
//             </div>

//             <button className="mt-3 border px-4 py-1 rounded-full hover:bg-black hover:text-white">
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default ProductDetails;