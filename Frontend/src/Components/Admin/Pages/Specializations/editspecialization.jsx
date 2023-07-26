import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Button,
    Input,
  } from "@material-tailwind/react";
  import AdminNavbar from "../../Navbar/navbar";
  import axios from "axios";
  import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

  export default function EditSpecialization() {
    const navigate = useNavigate();
    const addrole = (e) =>{
        e.preventDefault();
        const data ={'role_name':e.target.role.value} 
        axios.post("http://localhost:8000/api/admin/addroles",data)
        .then((response)=>{
            console.log(response.status);
            navigate("/specialization")
        })
    }
    return (
        <>
        <AdminNavbar></AdminNavbar>
      <Card className="mx-auto mt-10 w-96">
        <CardBody className="text-center">
        <form onSubmit={addrole}>
          <Typography variant="h4" color="blue-gray" className="mb-3">
            Specialization
          </Typography>
          <div className="mb-3">
            <Input type="text" name="role"></Input>
            </div>
        <Button type="submit">Add Specialization</Button>
        </form>
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