import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../utils/constants";
import Cookies from 'universal-cookie';



function Login(){
    const cookies = new Cookies();
    const navigate = useNavigate();
    const[isChecked,setisChecked]=useState(false);
    const isdoc=()=>{
      setisChecked(!isChecked)
    }

    const handleLogin= (e) =>{
      e.preventDefault();
      const body = JSON.stringify({
        'username' : e.target.username.value,
        'password' : e.target.password.value
      })
      console.log(body)
      try{
        if(isChecked){
          axios.post("http://localhost:8000/api/users/login_doc", body, {
            headers: {"Content-Type":"application/json"}
          })
          .then((response)=>{
            console.log(response.status)
            if(response.status == 200){
              const token = response.data.token;
              cookies.set('Doctor',token,{path:'/'});
              console.log(cookies.get('Doctor'))
              navigate("/")
            }else{
              console.log("You fucked up!!")
            }
          })
        }else{
          axios.post("http://localhost:8000/api/users/login", body, {
            headers: {"Content-Type":"application/json"}
          })
          .then((response)=>{
            console.log(response.status)
            if(response.status == 200){
              const token = response.data.token;
              cookies.set('Patient',token,{path:'/'});
              console.log(cookies.get('Patient'))
              navigate("/")
            }else{
              console.log("You fucked up!!")
            }
          })
        }

      } catch (error) {
        // console.log(error)
      }

    }

    return (
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    DoC    
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                      <input onChange={isdoc} id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Sign in as Doctor</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a onClick={()=> navigate("/signup")} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
          </section>
      );
}

export default Login;