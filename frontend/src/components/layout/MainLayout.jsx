import React from 'react'
import Navbar from "./Navbar";
import Footer from "./Footer";

const mainLayout = ({children}) => {
  return (
    <div>
        <Navbar/>
            {children}
        <Footer/>

    </div>
  )
}

export default mainLayout
