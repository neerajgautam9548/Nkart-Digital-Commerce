import React from 'react'

const Footer = () => {
    return (
        <div className='bg-[#1a472a] w-full'>
            <div className='lg:flex-row flex flex-col justify-center items-center px-15 py-5'>


                <div className='p-10 flex flex-col gap-5 w-full mb-4'>
                    <div className='flex text-2xl'>

                        <p className='text-2xl'>🛒</p>
                        <h1 className='text-2xl ml-2'>Shopcart</h1>
                    </div>

                    <p>Your one-stop shop for all your shopping needs.</p>
                </div>
                <div className='p-10 flex flex-col gap-5 w-full'>
                    <h1 className='text-2xl'>Quick Links</h1>
                    <div className='flex flex-col'>
                        <span>Products</span>
                        <span>Categories</span>
                        <span>Deals</span>
                    </div>
                </div>
                <div className='p-10 flex flex-col gap-5 w-full'>
                    <h1 className='text-2xl'>Customer Service</h1>
                    <div className='flex flex-col'>
                        <span>Contact Us</span>
                        <span>FAQs</span>
                        <span>Returns</span>
                    </div>
                </div>
                <div className='p-10 flex flex-col gap-5 w-full'>
                    <h1 className='text-2xl'>Connect</h1>
                    <div className='flex flex-col'>
                        <span>Facebook</span>
                        <span>Twitter</span>
                        <span>Instagram</span>
                    </div>

                </div>
            </div>
            <div className='flex justify-center items-center w-full '>
                <p className='flex justify-center pb-5 items-center'>© 2026 Shopcart. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
