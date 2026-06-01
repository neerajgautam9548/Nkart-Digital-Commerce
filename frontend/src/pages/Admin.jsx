import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Plus, Edit2, Trash2, Search, Filter, ArrowLeft } from 'lucide-react'
import { API_URL } from "../constant/url";
import axios from "axios";


const Admin = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    // const [userProducts, setUserProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    useEffect(() => {
        const getAccess = async () => {
            const res = await axios.get(`${API_URL}/AdminPanel`, {
                withCredentials: true,
            })
                .then((res) => {
                    // console.log(res.data);
                    setFlash(res.data.flashMessage);
                })
                .catch((err) => {
                    // console.log("admin panel not access", err);
                    navigate(-1);
                })
        }
        getAccess();
    })

    useEffect(() => {
        axios.get(`${API_URL}/products/all`, {
            withCredentials: true,
        })
            .then((res) => {
                setProducts(res.data.data);

                // setUserProducts(res.data.data);
            })

            .catch((err) => {

                // console.log(err);
                navigate(-1);
            })
    }, []);

    const createProduct = () => {
        // console.log("chal raha hai");
        navigate("/createProduct")
    }

    // const navigate = useNavigate();
    function back() {
        navigate("/");
    }


    const Edit = (id) => {
        const res=axios.get(`${API_URL}/products/${id}`, { withCredentials: true })
           
            .then((res) => {        
                // console.log(res.data.data);
                navigate(`/Edit/${id}`, {
                    state: {
                        product: res.data.data,
                    }
                });
            })
            .catch((err) => {
                console.log("Error fetching product details", err);
            });
    }

    //     try {

    //         const res = await axios.put(
    //             `${API_URL}/products/edit/${id}`,

    //             {
    //                 withCredentials: true,
    //             }
    //         );// console.log(res.data);
    //         // console.log("cha raha hai");

    //         // navigate("admin");
    //     } catch (err) {
    //         // console.log("cha raha hai yes");

    //         console.log(err);

    //     }


    // }

    const Delete = async (id) => {
        try {

            const res = await axios.post(
                `${API_URL}/products/delete/${id}`,
                {},
                {
                    withCredentials: true,
                }
            );// console.log(res.data);
            // console.log("cha raha hai");
            setProducts((prev) =>
                prev.filter((item) => item._id !== id)
            );
            // navigate("admin");
        } catch (err) {
            // console.log("cha raha hai yes");

            console.log(err);

        }

    }
    const filteredProducts = products.filter(
        (product) =>
            product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //edit
    // function Edit(){
    //     navigate(`/Edit/${products._id}`);
    // }

    return (
        <div className='min-h-screen w-full text-black font-serif'>
            {
                flash.show && (
                    <div
                        className={`
            mt-50 fixed top-5 right-5 z-50
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
            <div className='w-full bg-green-900 text-white fixed top-0 py-5 px-5 z-10 border-b overflow- border-zinc-300'>
                <button onClick={() => (back())} className='hover:text-amber-400  cursor-pointer flex gap-2'>
                    <ArrowLeft className='w-4' />
                    <p>Back to Admin</p>
                </button>
                <h1 className='text-2xl mt-3 font-bold'>Admin Dashboard</h1>
                <p className=''>Manage your store inventory and products</p>
            </div><hr />
            <div className='w-full  pt-40 flex lg:flex-row flex-col  justify-center items-center gap-5 lg:px-20 px-5'>
                <div className='w-full  border-2 border-zinc-300 px-5 py-5 rounded-md'>
                    <h1 className='text-sm'>Total Products</h1>
                    <p className='text-4xl  font-["Batang"] '>9</p>
                    <p className='text-red-500 text-4xl '>.</p>
                </div>
                <div className='w-full border-2 border-zinc-300 px-5 py-5 rounded-md'>
                    <h1 className='text-sm'>Total Revenue.</h1>
                    <p className='text-4xl font-["Batang"] '>$2302.70</p>
                    <p className='text-green-900 text-4xl '>.</p>
                </div>
                <div className='w-full border-2 border-zinc-300 px-5 py-5 rounded-md'>
                    <h1 className='text-sm'>Total Orders</h1>
                    <p className='text-4xl  font-["Batang"] '>1,240</p>
                    <p className='text-yellow-600 text-4xl '>.</p>
                </div>
                <div className='w-full border-2 border-zinc-300 px-5 py-5 rounded-md'>
                    <h1 className='text-sm'>Total Customers</h1>
                    <p className='text-4xl  font-["Batang"] '>356</p>
                    <p className='text-blue-500 text-4xl  '>.</p>
                </div>

            </div>
            <div className=" px-5 lg:px-20 mt-10 ">
                <div className='w-full bg-background border border-border border-zinc-300'>
                    <span className='w-full flex px-3 py-4'>
                        <h1 className='w-full flex  font-bold text-2xl '>Products</h1>
                        <button onClick={() => { createProduct() }} className='flex justify-end gap-4 bg-green-900 text-white px-3 py-2 rounded-md'><Plus className="w-4 " />CreateProduct</button>
                    </span>
                    <span className='flex items-center px-3 py-4'>
                        <input value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} className='w-[80%] flex mx-5 my-4 px-3 py-2 rounded-md border-2 border-zinc-300 outline-zinc-200' placeholder='Search Product name or description' type="text" />
                        <button className='border-2 h-10 w-40 flex justify-center items-center rounded-md p-0'>

                            <Filter className='w-14 h-5' />
                            <select className='flex justify-end rounded-md outline-none' name="" id="" defaultValue={"All Categories"}>

                                <option value="">All Categories</option>
                                <option value="">Headphones</option>
                                <option value="">Earbuds</option>
                            </select>
                        </button>
                    </span>
                </div>
                <div className='w-full overflow-x-auto'>

                    <table className="w-full overflow-x-auto">
                        <thead className="bg-background border border-border border-zinc-300">
                            <tr className=''>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Product</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rating</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Reviews</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (


                                filteredProducts.map((product) => (




                                    <tr key={product._id} className="border border-border hover:bg-background/50 transition-colors border-zinc-300">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">

                                                {product.images?.[0] ? (
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.productname}
                                                        className="w-10 h-10 rounded object-cover"
                                                    />
                                                ) : (
                                                    <span>No Image</span>
                                                )}
                                                <div>

                                                    <p className="text-sm text-muted-foreground">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-foreground">₹{product.price} </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-500">★</span>
                                                <span className="font-medium text-foreground">{product.rating}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground"> {product.numReviews}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => Edit(product._id)} className="p-2 hover:bg-background rounded-lg transition-colors text-primary hover:text-primary/80">
                                                    <Edit2 className='cursor-pointer' size={18} />
                                                </button>
                                                <button onClick={() => Delete(product._id)} className="p-2 hover:bg-background rounded-lg transition-colors text-destructive hover:text-destructive/80">
                                                    <Trash2 className='cursor-pointer' size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (



                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                        No products found. Try adjusting your search or filter.
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>

            </div>

            {/* Pagination */}

            <div className="border-t border-border p-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                    {/* Showing {filteredProducts.length} of {products.length} products */}
                </p>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors text-foreground font-medium">
                        Previous
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                        1
                    </button>
                    <button className="px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors text-foreground font-medium">
                        Next
                    </button>
                </div>
            </div>
            {/* )} */}
        </div>
    )
}

export default Admin
