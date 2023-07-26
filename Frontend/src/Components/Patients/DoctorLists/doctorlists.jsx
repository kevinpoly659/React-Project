import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Navbar from "../../Navbar/navbar";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Tabs,
  TabList,
  Tab,
  Stack,
  Button,
  Input,
  Heading,
  Divider,
  ButtonGroup,
  Text,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function DoctorLists() {
  const [docdata, setdocdata] = useState([]);
  const [roles, setroles] = useState([]);
  // const cookies = new Cookies();
  const [tab, setTab] = useState("All");

  useEffect(() => {
    setdoc();
    setrole();
  }, []);

  const navigate = useNavigate();

  const setrole = () => {
    axios.get("http://localhost:8000/api/admin/roles").then((response) => {
      console.log(response.data);
      setroles(response.data);
    });
  };
  const setdoc = () => {
    axios.get("http://localhost:8000/api/admin/doctors").then((response) => {
      console.log(response.data);
      setdocdata(response.data);
    });
  };

  // const apply = (id) => {
  //   const body = {
  //     patient: cookies.get("id"),
  //     doctor: id,
  //   };
  

  //   console.log(body);
  //   axios.post("http://localhost:8000/api/users/apply", body)
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // };

  const handleTab = (tab) => {
    console.log(tab);
    setTab(tab);
    if(tab!="All"){
      axios.post('http://localhost:8000/api/patient/filterdoctor',{'role':tab}).then((response)=>{
        console.log(response.data.doctors);
        setdocdata(response.data.doctors)
        })
    }
    else{
      setdoc();
    }
  };

  const handleApply = (id) => {
    navigate("/apply", { state : id});
  };

  const handleDetails = (id) =>{
    navigate('/details',{state : id});
  }

  return (
    <>
      <Navbar></Navbar>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Doctors
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs>
              <TabList>
                <Tab onClick={() => handleTab("All")}>All</Tab>
                {roles.map((item) => {
                  return (
                    <Tab
                      key={item.id}
                      onClick={() => handleTab(item.role_name)}
                    >
                      {item.role_name}
                    </Tab>
                  );
                })}
              </TabList>
            </Tabs>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>

        <CardBody className="flex" padding={"3"}>
          {docdata.map((item) => {
            return tab == "All" ? (
              <Card key={item.id} maxW="sm">
                <CardBody>
                  <Image
                    src={`http://127.0.0.1:8000${item.profile}`}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{item.first_name}</Heading>

                    <Text>{item.role}</Text>
                    <Text color="blue.600" fontSize="2xl">
                      $450
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      onClick={() => {
                        handleApply(item.id);
                      }}
                      variant="solid"
                    >
                      Apply
                    </Button>
                    <Button variant="ghost"
                    onClick={()=>{handleDetails(item.id)}}
                    >
                      View Details
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ) : item.role == tab ? (
              <Card maxW="sm">
                <CardBody>
                  <Image
                    src={`http://127.0.0.1:8000${item.profile}`}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{item.first_name}</Heading>

                    <Text>{item.role}</Text>
                    <Text color="blue.600" fontSize="2xl">
                      $450
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid">
                      Apply
                    </Button>
                    <Button variant="ghost">
                      View Details
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ) : (
              <></>
            );
          })}
        </CardBody>

        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" color="blue-gray" size="sm">
              Previous
            </Button>
            <Button variant="outlined" color="blue-gray" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
