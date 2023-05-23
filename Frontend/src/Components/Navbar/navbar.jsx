import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Navbar(){

    const cookies =  new Cookies();
    const navigate = useNavigate();
    // if(cookies.get('Patient')){
    //     const logoutbutton = document.createElement('button');
    //     logoutbutton.textContent = 'Logout';
    //     logoutbutton.addEventListener('click',function() {
    //         cookies.remove('Patient',{path:'/'});
    //         location.reload    
    //     });
    //     document.getElementById('Auth').appendChild(logoutButton);
    // }else{
    //     const loginbutton = document.createElement('button');
    //     loginbutton.textContent = 'Login';
    //     loginbutton.addEventListener('click',function(){
    //         navigate('/login')
    //     })
    // }

   
        const[hasCookies,setHasCookies] = useState(false);
        useEffect(()=>{
            const checkCookies = () =>{
                if(cookies.get('Patient')){
                    setHasCookies(true)
                }
                else if(cookies.get('Doctor')){
                    setHasCookies(true)
                }
                else{
                    setHasCookies(false)
                }
            };
            checkCookies();
        },[]);
    const logout = () =>{
        cookies.remove('Patient',{path:'/'})
        cookies.remove('Doctor',{path:'/'})
        setHasCookies(false)
    }

    console.log(cookies.get('Patient'))
      return(
        <div>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <a href="https://flowbite.com" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                <div className="flex items-center">
                    <a href="tel:5541251234" className="mr-6 text-sm text-gray-500 dark:text-white hover:underline">(555) 412-1234</a>


                {hasCookies ?(<button id="loginButton" onClick={logout} className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Logout</button>)
                :(<button id="logoutButton" onClick={()=> navigate("/login")} className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Login</button>)
                }

                </div>
            </div>
        </nav>
        <nav className="bg-gray-50 dark:bg-gray-700">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                        <li>
                            <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 dark:text-white hover:underline">Company</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 dark:text-white hover:underline">Team</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    )
}

export default Navbar;