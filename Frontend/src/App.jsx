import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'
import Login from './Components/Login/login'
import Signup from './Components/Signup/signup'
import Navbar from './Components/Navbar/navbar'
import Home from './Components/Patients/Home/home'
import AdminHome from './Components/Admin/Pages/home'
import Adminlogin from './Components/Admin/Login/login'
import Doctors from './Components/Admin/Pages/doctors'
import Patients from './Components/Admin/Pages/patients'
function App() {

  return (
    <BrowserRouter>
    <Routes>
    
    <Route path='/' element={<Home/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/admin' element={<Adminlogin/>}></Route>
    <Route path='/adminhome' element={<AdminHome/>}></Route>
    <Route path='/admindoctors' element={<Doctors/>}></Route>
    <Route path='/adminpatients' element={<Patients/>}></Route>


    </Routes>
    
    </BrowserRouter>
    
  ) 
}

export default App
