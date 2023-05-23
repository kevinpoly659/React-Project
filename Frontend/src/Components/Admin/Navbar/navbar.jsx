import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


function AdminNavbar(){

  const cookies = new Cookies();
  const navigate = useNavigate();
  const logout=()=>{

    cookies.remove('Admin',{path:'/'});
    navigate('/admin')

  }
    return(
        
        <nav className="bg-white border-gray-200 dark:bg-blue-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Admin
            </span>
          </a>
          <div className="flex items-center md:order-2">
        <button onClick={logout} className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-white-100 rounded-lg bg-white-50 md:flex-row md:space-x-8 md:mt-0 md:border-0">Logout</button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-white-100 rounded-lg bg-white-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#" onClick={()=> navigate("/admindoctors")}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Doctors
                </a>
              </li>
              <li>
                <a
                  href="#" onClick={()=> navigate("/adminpatients")}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Patients
                </a>
              </li>

            </ul>
        </div>
        </div>
        </nav>

    );
}

export default AdminNavbar;