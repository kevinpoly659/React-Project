import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import AdminNavbar from "../../Navbar/navbar";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", ""];
 
const TABLE_ROWS = [
  {
    img: "/img/logos/logo-spotify.svg",
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-amazon.svg",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-pinterest.svg",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-google.svg",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "/img/logos/logo-netflix.svg",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];



 
export default function Specialization() {
const [specialization,setspecialization] = useState([]);
const navigate = useNavigate();

    useEffect(()=>{
        const getSpecialization = () => {
            axios.get("http://localhost:8000/api/admin/roles")
            .then((response)=>{
                console.log(response.data);
                setspecialization(response.data);
            })
        }
        getSpecialization();
    },[]);

    // const addspecialization = () => {
    //     axios.post("http://localhost:8000/api/admin/addrole")
    //     .then((response)=>{
    //         console.log(response.status);
    //     })
    // }

  return (
    <>
    <AdminNavbar></AdminNavbar>
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
    <div className="py-8">
    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
        <h2 className="text-2xl leading-tight">
        Specialization
        </h2>
        <div className="text-end">
            <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                <div className=" relative ">
                    </div>
                    <button onClick={()=>navigate("/editspecialization")} className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                        Add Specialization
                    </button>
                </form>
            </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white">
                                Specialization
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {specialization.map((item,i)=>{
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

                                            {item.role_name}
                                            </p>
                                        </div>
                                        {/* <div className="ml-1">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                            {item.last_name}
                                            </p>
                                        </div> */}
                                    </div>
                                </td>
                                {/* <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {item.role}
                                    </p>
                                </td> */}
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {item.user}
                                    </p>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">

                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                <button value={item.user} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 ">
                                    Edit
                                </button>
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
  );
}