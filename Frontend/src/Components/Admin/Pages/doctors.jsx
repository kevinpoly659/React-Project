import React, { useEffect, useState } from "react";
import AdminNavbar from "../Navbar/navbar";
import axios from "axios";





function Doctors(){
    const [doctorsdata,setdocdata]=useState([]);


    useEffect(()=>{
        doctorsset();
    },[])
    console.log(doctorsdata[0]);

    const doctorsset= () => {
        axios.get("http://localhost:8000/api/admin/doctors")
        .then((response)=>{
            setdocdata(response.data)
            console.log(doctorsdata)
        })
    }
    const activeHandler=(e)=>{
        // console.log('dddddd');
        console.log(e.target.value)
        axios.post("http://localhost:8000/api/admin/block_user", {'id':e.target.value})
        .then((response)=>{
            console.log(response.data)
            doctorsset();
        })
        
    } 


    return(
        <>
        <AdminNavbar></AdminNavbar>
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
    <div className="py-8">
    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
        <h2 className="text-2xl leading-tight">
            Users
        </h2>
        <div className="text-end">
            <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                <div className=" relative ">
                    <input type="text" id="&quot;form-subscribe-Filter" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="name"/>
                    </div>
                    <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                        Filter
                    </button>
                </form>
            </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                User
                            </th>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                Role
                            </th>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                Email
                            </th>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                status
                            </th>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctorsdata.map((item,i)=>{
                            console.log(item.user);
                            return(
                                <tr key={i}>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <div className="flex items-center">
                                        {/* <div className="flex-shrink-0">
                                            <a href="#" className="relative block">
                                                <img alt="profil" src="/images/person/8.jpg" className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                            </a>
                                        </div> */}
                                        <div className="ml-1">
                                            <p className="text-gray-900 whitespace-no-wrap">

                                            {item.first_name}
                                            </p>
                                        </div>
                                        <div className="ml-1">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            {item.last_name}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {item.role}
                                    </p>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {/* {item.user} */}
                                    </p>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                        <span aria-hidden="true" className="absolute inset-0 bg-green-200 rounded-full opacity-50">
                                        </span>
                                        {item.is_active ? (<span className="relative">
                                            active
                                        </span>):(   <span className="relative">
                                            Inactive
                                        </span>)}
                                     
                                    </span>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                {item.is_active ? (
                                    <button onClick={activeHandler} value={item.user} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 ">
                                    Block User
                                    </button>               
                                ):(
                                    <button onClick={activeHandler} value={item.user} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 ">
                                    Unblock User
                                    </button>
                                )}
                   
                                </td>
                                
                            </tr>
                            )
                            })}


                    </tbody>
                </table>
                <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                    <div className="flex items-center">
                        <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100">
                            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                </path>
                            </svg>
                        </button>
                        <button type="button" className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 ">
                            1
                        </button>
                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                            2
                        </button>
                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100">
                            3
                        </button>
                        <button type="button" className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100">
                            4
                        </button>
                        <button type="button" className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100">
                            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</>
    )
}

export default Doctors;