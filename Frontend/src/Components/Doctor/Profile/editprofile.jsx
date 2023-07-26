import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../Navbar/navbar";

import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Select,
    Option,
} from "@material-tailwind/react";
import {
    BanknotesIcon,
    CreditCardIcon,
    LockClosedIcon,
} from "@heroicons/react/24/solid";

function formatCardNumber(value) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(" ");
    } else {
        return value;
    }
}

function formatExpires(value) {
    return value
        .replace(/[^0-9]/g, "")
        .replace(/^([2-9])$/g, "0$1")
        .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
        .replace(/^0{1,}/g, "0")
        .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).\*/g, "$1/$2");
}

export default function EditDocProfile() {
    //   const { countries } = useCountries();
    const [type, setType] = React.useState("card");
    const [cardNumber, setCardNumber] = React.useState("");
    const [cardExpires, setCardExpires] = React.useState("");
    const navigate = useNavigate();
    const [doctor, setdoctor] = useState([]);
    const [user, setuser] = useState([]);
    const [role, setRole] = useState([]);
    const [allRoles,setallRoles] = useState([]);



    const cookies = new Cookies();
    useEffect(() => {
        // id = cookies.get('id')
        const body = {
            'id': cookies.get('id')
        }
        const getuser = () => {
            axios.post("http://localhost:8000/api/doctor/doctorprofile", body)
                .then((response) => {
                    // console.log(response.data);
                    console.log(response.data.Roles);
                    setuser(response.data.user)
                    setdoctor(response.data.doctor)
                    setRole(response.data.role)
                    setallRoles(response.data.Roles)
                    
                })
        }
        getuser();
    }, [])

    const [edit, setedit] = useState(true);
    const [data, setdata] = useState({});

    const handlebutton = () => {
        setedit(!edit);
    }

    const handleUsernameInput = (e) => {
        console.log(e.target.value);
        setuser({...user,username : e.target.value})
    }
    const handleFirst_nameInput = (e) => {
        console.log(e.target.value);
        setdoctor({...doctor,first_name : e.target.value})
    }
    const handleLast_nameInput = (e) => {
        console.log(e.target.value);
        setdoctor({...doctor,last_name : e.target.value})
    }
    const handleEmailInput = (e) => {
        console.log(e.target.value);
        setuser({...user,email : e.target.value})
    }

    const handleRoleInput = (e) =>{
        setRole({...role,role : e.target.value})
    }
    // const handleRoleInput = (e) => {
    //     console.log(e.target.value);
    //     setuser({...user,role : e.target.value})
    // }

    const handleForm = (e) => {
        e.preventDefault();
        const body = {
            'id': cookies.get('id'),
            'username': e.target.username.value,
            'first_name': e.target.first_name.value,
            'last_name': e.target.last_name.value,
            'email': e.target.email.value,
            'role'  :   e.target.role.value,
        }
        console.log(body);
        axios.post("http://localhost:8000/api/doctor/editdoctor", body)
            .then((response) => {
                console.log(response.data);
            })
    }

    return (
        <>
        <Navbar></Navbar>
        <Card className="w-full max-w-[24rem] mx-auto">
        <CardHeader
                color="white"
                floated={false}
                shadow={false}
                className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
            >
                <img src={ `http://127.0.0.1:8000${doctor.profile}`} alt="" />

                {doctor.profile? (
                <button color="white">
                    Change profile picture
                </button>
                ):(
                <form >
                <input name="profile" type="file"/>
                <Button type="submit">Save</Button>
                </form>
                )}
                
            </CardHeader>
            <CardBody>
                <Tabs value={type} className="overflow-visible">
                    <TabsHeader className="relative z-0 ">
                        <Button onClick={handlebutton} className="mx-auto" disabled={!edit}>
                            Edit User
                        </Button>
                    </TabsHeader>
                    <TabsBody
                        className="!overflow-x-hidden !overflow-y-visible"
                        animate={{
                            initial: {
                                x: type === "card" ? 400 : -400,
                            },
                            mount: {
                                x: 0,
                            },
                            unmount: {
                                x: type === "card" ? 400 : -400,
                            },
                        }} >
                        <TabPanel value="card" className="p-0">
                            <form onSubmit={handleForm} className="mt-12 flex flex-col gap-4">
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-4 font-medium"
                                    >
                                        Username
                                    </Typography>
                                    <Input type="text" name="username" label="Username" value={user.username} onChange={handleUsernameInput} disabled={edit} />

                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-4 font-medium"
                                    >
                                        First Name
                                    </Typography>
                                    <Input type="text" name="first_name" label="First Name" onChange={handleFirst_nameInput} value={doctor.first_name} disabled={edit} />

                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-4 font-medium"
                                    >
                                        Last Name
                                    </Typography>
                                    <Input type="text" name="last_name" label="Last Name" onChange={handleLast_nameInput} value={doctor.last_name} disabled={edit} />
                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-4 font-medium"
                                    >
                                        Email
                                    </Typography>
                                    <Input type="email" name="email" label="Email" onChange={handleEmailInput} value={user.email} disabled={edit} />
                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="mb-4 font-medium"
                                    >
                                        Specialization
                                    </Typography>
                                    <Select name="role" value={role.role_name} disabled={edit}>
                                        {allRoles.map((item,i)=>{
                                            return(
                                            <option key={i} onClick={handleRoleInput} value={item.role_name}>{item.role_name}</option>
                                            )
                                        })}
                                    </Select>
                                    {/* <Input type="text" name="role" label="Specialization" onChange={handleRoleInput} value={role.role_name} disabled={edit} /> */}
                                </div>

                                {/* <div className="my-6">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-4 font-medium"
                  >
                    Card Details
                  </Typography>
 
                  <Input
                    label="Card Number"
                    maxLength={19}
                    value={formatCardNumber(cardNumber)}
                    onChange={(event) => setCardNumber(event.target.value)}
                    icon={
                      <CreditCardIcon className="h-5 w-5 text-blue-gray-300" />
                    }
                  />
                  <div className="my-4 flex items-center gap-4">
                    <Input
                      label="Expires"
                      maxLength={5}
                      value={formatExpires(cardExpires)}
                      onChange={(event) => setCardExpires(event.target.value)}
                      containerProps={{ className: "min-w-[72px]" }}
                    />
                    <Input
                      label="CVC"
                      maxLength={4}
                      containerProps={{ className: "min-w-[72px]" }}
                    />
                  </div>
                  <Input label="Holder Name" />
                </div> */}
                                {!edit ? (<Button type="submit" size="lg">Edit User</Button>) :
                                    (<span size="lg" disabled></span>)}
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                                >
                                </Typography>
                            </form>
                        </TabPanel>

                    </TabsBody>
                </Tabs>
            </CardBody>
        </Card>
        </>
    );
}
