
import {BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'
import Login from './Components/Login/login'
import Signup from './Components/Signup/signup'
import Home from './Components/Patients/Home/home'
import AdminHome from './Components/Admin/Pages/home'
import Adminlogin from './Components/Admin/Login/login'
import Doctors from './Components/Admin/Pages/doctors'
import Patients from './Components/Admin/Pages/patients'
import Appointments from './Components/Doctor/Appointments/appointments'
import DoctorLists from './Components/Patients/DoctorLists/doctorlists'
import PatientProfile from './Components/Patients/Profile/profile'
import DocProfile from './Components/Doctor/Profile/profile'
import EditProfile from './Components/Patients/Profile/editprofile'
import EditDocProfile from './Components/Doctor/Profile/editprofile'
import Specialization from './Components/Admin/Pages/Specializations/specializations'
import EditSpecialization from './Components/Admin/Pages/Specializations/editspecialization'
import Slot from './Components/Doctor/Slot/slot'
import Apply from './Components/Patients/DoctorLists/apply'
import Confirm from './Components/Patients/DoctorLists/confirm'
import Booking from './Components/Patients/Bookings/booking'
import Chat from './Components/Chat/chat'
import VideoCall from './Components/Chat/videocall'
import Landing from './Components/Landing/landing'
import Details from './Components/Patients/DoctorLists/details'


function App() {

  return (
    <BrowserRouter>
    <Routes>
    

    <Route path='/landing' element={<Landing/>}></Route>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>


    <Route path='/patientprofile' element={<PatientProfile/>}></Route>
    <Route path='/editprofile' element={<EditProfile/>}></Route>
    <Route path='/doctorlists' element={<DoctorLists/>}></Route>
    <Route path='/Details' element={<Details/>}></Route>
    <Route path='/booking' element={<Booking/>}></Route>
    <Route path='/apply' element={<Apply/>}></Route>
    <Route path='/confirm' element={<Confirm/>}></Route>




    <Route path='/doctorprofile' element={<DocProfile/>}></Route>
    <Route path='/editdoctorprofile' element={<EditDocProfile/>}></Route>
    <Route path='/doctorappointments' element={<Appointments/>}></Route>
    <Route path='/slot' element={<Slot/>}></Route>


    <Route path='/chat' element={<Chat/>}></Route>
    <Route path='/video/:roomId' element={<VideoCall/>}></Route>



    <Route path='/admin' element={<Adminlogin/>}></Route>
    <Route path='/adminhome' element={<AdminHome/>}></Route>
    <Route path='/admindoctors' element={<Doctors/>}></Route>
    <Route path='/adminpatients' element={<Patients/>}></Route>
    <Route path='/specialization' element={<Specialization/>}></Route>
    <Route path='/editspecialization' element={<EditSpecialization/>}></Route>




    </Routes>
    </BrowserRouter>
    
  ) 
}

export default App
