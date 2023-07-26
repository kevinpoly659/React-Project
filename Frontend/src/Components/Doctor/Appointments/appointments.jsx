import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tab,
  Tabs,
  Card,
  CardBody,
  useColorModeValue,
  CardHeader,
  Text,
  Button
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import Navbar from "../../Navbar/navbar";
import axios from "axios";
import Cookies from "universal-cookie";
import TablesTableRow from "../../Layouts/tables";


export default function Appointments(){
  const cookies = new Cookies();
  const [appointments, setAppointments] = useState([]);
  const [dataFetched, setDataFetched] = useState(false); // Flag to indicate if data has been fetched
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [status,changeStatus] = useState(true);

  useEffect(() => {
    const getappointments = () => {
      const doctor = {
        doctor: cookies.get('id')
      };
      axios.post('http://localhost:8000/api/doctor/appointments', doctor)
        .then((response) => {
          setAppointments(response.data);
          setDataFetched(true); // Set the flag to true after data is fetched
        })
        .catch((error) => {
          // Handle any errors here
          console.error(error);
        });
    };
    getappointments();
  }, []);

  const handleStatus=()=>{
    changeStatus(!status)
  }

  console.log(appointments);

  return (
    <>
      <Navbar />
      <Flex direction="column">
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px" mx={'auto'}>
          <Text fontSize="xl" color={textColor} fontWeight="bold" >
            Appointments
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400" >
                <Th pl="0px" borderColor={borderColor} color="gray.400" >
                  User
                </Th>
                <Th borderColor={borderColor} color="gray.400" >Patient</Th>
                <Th borderColor={borderColor} color="gray.400" >Status</Th>
                <Th borderColor={borderColor} color="gray.400">Day and Time</Th>
                <Th borderColor={borderColor} color="gray.400"></Th>
    
              </Tr>
            </Thead>
            <Tbody>
              {appointments.map((row, index, arr) => {
                return (
                  <>
                  <TablesTableRow
                    isdoc = {true}
                    id={row.id}
                    first_name={row.patient.first_name}
                    last_name = {row.patient.last_name}
                    logo={row.patient.profile}
                    email={row.email}
                    patient_last_name={row.patient_details.last_name}
                    patient_first_name={row.patient_details.first_name}
                    status={row.is_approved}
                    date={row.slot.availability_day}
                    time = {row.slot.time}
                    isLast={index === arr.length - 1 ? true : false}
                    key={index}
                    onClick={handleStatus}
                  />
                  </>
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      </Flex>
    </>
  );
}