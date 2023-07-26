import { useEffect, useState } from "react";
import Navbar from "../../Navbar/navbar";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Button,
  } from "@material-tailwind/react";
import axios from "axios";
import Cookies from "universal-cookie";
   
  export default function DocProfile() {

    const navigate = useNavigate();
    const [user,setuser] = useState([]);
    const cookies = new Cookies();

    useEffect(()=>{
        const body = {
            'id' : cookies.get('id')
        }

        axios.post("http://localhost:8000/api/doctor/doctorprofile",body)
        .then((response)=>{
            console.log(response.data.user);
            setuser(response.data.doctor)
        })
    },[]);

    return (
        <>
        <Navbar></Navbar>

      <Card className="mx-auto mt-10 w-96">
        <CardHeader floated={false} className="h-80">
          <img src={ `http://127.0.0.1:8000${user.profile}`} alt="profile-picture" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="">
            {user.first_name}
          </Typography>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            {user.last_name}
          </Typography>
        <Button onClick={()=> navigate("/editdoctorprofile")}>Edit User</Button>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2">
          <Tooltip content="Like">
            <Typography
              as="a"
              href="#facebook"
              variant="lead"
              color="blue"
              textGradient
            >
              <i className="fab fa-facebook" />
            </Typography>
          </Tooltip>
          <Tooltip content="Follow">
            <Typography
              as="a"
              href="#twitter"
              variant="lead"
              color="light-blue"
              textGradient
            >
              <i className="fab fa-twitter" />
            </Typography>
          </Tooltip>
          <Tooltip content="Follow">
            <Typography
              as="a"
              href="#instagram"
              variant="lead"
              color="purple"
              textGradient
            >
              <i className="fab fa-instagram" />
            </Typography>
          </Tooltip>
        </CardFooter>
      </Card>
      </>
    );
  }