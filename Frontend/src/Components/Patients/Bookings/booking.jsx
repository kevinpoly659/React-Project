import Navbar from "../../Navbar/navbar";
import { 
    Flex,
    Card,
    CardHeader,
    CardBody,
    Text,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import TablesTableRow from "../../Layouts/tables";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";


export default function Booking(){
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const [appointments,setAppointments] = useState([]);
    const cookies = new Cookies();

    useEffect(()=>{
        const getappointments=()=>{
            axios.post('http://localhost:8000/api/patient/appointment',{'id':cookies.get('id')}).then((response)=>{
                console.log(response.data);
                setAppointments(response.data)
            })  
        }
        getappointments();
    },[])


    return(
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
                    Doctor
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
                      id={row.id}
                      first_name={row.doctor.first_name}
                      last_name = {row.doctor.last_name}
                      logo={row.doctor.profile}
                      email={row.email}
                      patient_last_name={row.patient_details.last_name}
                      patient_first_name={row.patient_details.first_name}
                      status={row.is_approved}
                      date={row.slot.availability_day}
                      time = {row.slot.time}
                      isLast={index === arr.length - 1 ? true : false}
                      key={index}
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
    )

}