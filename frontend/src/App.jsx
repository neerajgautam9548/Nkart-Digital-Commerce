import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home  from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetails";
// import Navbar from './components/layout/Navbar';
import Mainlayout from "./components/layout/MainLayout";
import Profile1 from "./pages/profile1"
import ForgotPassword from './pages/ForgotPassword';
import Admin from "./pages/Admin";
import CreateProduct from "./pages/CreateProduct";
import Edit from "./pages/Edit";
import EditProfile from "./pages/EditProfile";

const App = () => {
  return (
    <div className='bg-white-700 w-full min-h-screen text-white font-sans'>
  
      <Routes>
        <Route path='/' element={<Mainlayout>{<Home/>}</Mainlayout>} ></Route>
        <Route path='/cart' element={<Mainlayout>{<Cart/>}</Mainlayout>}></Route>
        <Route path='/cart/:id' element={<Mainlayout>{<Cart/>}</Mainlayout>}></Route>
        
        <Route path='/productDetails' element={<Mainlayout>{<ProductDetails/>}</Mainlayout>}></Route>
        <Route path='/admin' element={<Admin/>}></Route>
        
        <Route path='/createProduct' element={<CreateProduct/>}></Route>
        <Route path='/edit/:id' element={<Edit/>}></Route>
        
        
        

        
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/forgotpassword/:email' element={<ForgotPassword/>}></Route>
        
        
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/profile/EditProfile' element={<EditProfile/>}></Route>

      </Routes> 

     
    </div>
  )
}

export default App
