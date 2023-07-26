import React, { useState } from "react";
import { register } from "../../utils/constants"
import axios from "../../utils/axios"
import {useNavigate} from 'react-router-dom'
import { Button } from "@material-tailwind/react";

function Signup(){

    const navigate = useNavigate();
    const[isChecked,setisChecked] = useState(false);
    const setdoc=() =>{
      setisChecked(!isChecked)
    }

    const handleLogin= (e) =>{
      e.preventDefault();
      const body = JSON.stringify({
        'first_name':e.target.first_name.value,
        'last_name': e.target.last_name.value,
        'username' : e.target.username.value,
        'email'    : e.target.email.value,
        'password' : e.target.password.value,
        'password2' : e.target.password2.value,
      });
      console.log(body)
      if(isChecked && e.target.password.value == e.target.password2.value){
        axios.post("http://localhost:8000/api/users/register_doc", body, {
        headers: {"Content-Type":"application/json"}
      })
      .then((response)=>{
        console.log(response.status)
        if (response.status == 201){
          navigate("/login");
        }
        else{
          console.log("You fucked up!!")
        }
      })
      }else if(!isChecked && e.target.password.value == e.target.password2.value){
        axios.post("http://localhost:8000/api/users/register", body, {
          headers: {"Content-Type":"application/json"}
        })
        .then((response)=>{
          console.log(response.status)
          if (response.status == 201){
            navigate("/login");
          }
          else{
            console.log("You fucked up!!")
          }
        })
      }

    }

    return (
      <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
              Flowbite    
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Register An account
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                      <div>
                          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                          <input type="text" name="first_name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" required="" />
                      </div>
                      <div>
                          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                          <input type="text" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="" />
                      </div>
                      <div>
                          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                          <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" />
                      </div>
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                          <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required="" />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                      </div>
                      <div>
                          <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-type Password</label>
                          <input type="password" name="password2" id="password2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                      </div>
                      <div className="flex items-center justify-between">
                          <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input onChange={setdoc} id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                              </div>
                              <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Sign Up as Doctor</label>
                              </div>
                          </div>
                          <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                      </div>
                      <div className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                      <Button type="submit">Sign Up</Button>
                      </div>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account yet? <a onClick={()=> navigate("/login")} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
      );
}

export default Signup;