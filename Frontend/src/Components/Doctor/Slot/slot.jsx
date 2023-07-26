import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Container,
  Badge,
  Flex,
} from '@chakra-ui/react'
import { Tabs, TabList, Tab, } from '@chakra-ui/react'
import Navbar from '../../Navbar/navbar';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default function Slot(){


  // const [days,setdays] = useState([]);
  const [availableslots,setavailableslots] = useState([]);
  const cookies = new Cookies();

  useEffect(()=>{
    getdays();
  },[]);
  const getdays = ()=>{
    axios.get('http://localhost:8000/api/doctor/available')
    .then((response)=>{
      // console.log(response.data);
      const data = response.data
      console.log(data);
      // setdays(response.data)
    })

  }
// console.log(days,'---------------');


const handleDayChange=(day)=>{

  axios.post('http://localhost:8000/api/doctor/slots',{'id':cookies.get('id'),'day':day})
  .then((response)=>{
    // console.log(response.data);
    setavailableslots(response.data.Slots)
    console.log({...availableslots});
  })
}

const handleStatus = (slot) =>{
console.log(slot);
  axios.post('http://localhost:8000/api/doctor/changestatus',slot)
  .then(()=>{
    // handleDayChange(slot.availability_day)
  })
}
    return(    
      <>
      <Navbar></Navbar>
      <Container aria-live>
      <Flex justifyContent={'center'} paddingTop={'30px'}>
      <Tabs variant='soft-rounded' colorScheme='green'>
              <TabList>
              <Tab onClick={()=> handleDayChange(0)}>Monday</Tab>
              <Tab onClick={()=> handleDayChange(1)}>Tuesday</Tab>
              <Tab onClick={()=> handleDayChange(2)}>Wednesday</Tab>
              <Tab onClick={()=> handleDayChange(3)}>Thursday</Tab>
              <Tab onClick={()=> handleDayChange(4)}>Friday</Tab>
              <Tab onClick={()=> handleDayChange(5)}>Saturday</Tab>
              </TabList>
      </Tabs>
      </Flex>
      <Flex justifyContent={'center'}>
<TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th>Slots</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
    <Tbody>

        {availableslots.map((slot) => (
          <Tr key={slot}>
            <Td>{slot.time}</Td>
            <Td>
              {slot.availability? (
                <Badge colorScheme='green'>Available</Badge>
              ):(
                <Badge colorScheme='red'>Not Available</Badge>
              )}
            </Td>
            <Td>
                <Button onClick={()=>{handleStatus(slot)}}>
                  Change Status
                </Button>
            </Td>
          </Tr>
        ))}
        </Tbody>

        </Table>
      </TableContainer>     
      </Flex>
      </Container>
      </>
 )
}


