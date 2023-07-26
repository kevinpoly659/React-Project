import { useEffect, useState } from "react";
import Navbar from "../../Navbar/navbar";
import { useLocation } from "react-router-dom";
import { Card, Image, CardBody, CardFooter, Stack, Heading, Text, Button,Tabs,TabList,Tab } from '@chakra-ui/react'
import axios from "axios";
import ApplyForm from "./Forms/applyform";

export default function Apply(){

    const location = useLocation();
    const [doctor,setdoctor] = useState([]);
    const [slots,setslots] = useState([]);
    const [role_name,setrole_name] = useState('');
    const [selectedslot,setselectedslot] = useState();
    const [isselected,setisselected] = useState(false);
    const [showPopup, setShowPopup] = useState(false)

    console.log(location);

    useEffect(()=>{
        getdocdetails();
    },[]);

    const getdocdetails=()=>{
        console.log(location.state);
        axios.post('http://localhost:8000/api/patient/details',{'id':location.state})
        .then((response)=>{
            console.log(response.data);
            setdoctor(response.data.doctor)
            setrole_name(response.data.role_name)
        })
    }

    const handleDayChange = (day) =>{
        axios.post('http://localhost:8000/api/doctor/slots',{'id':location.state,'day':day})
        .then((response)=>{
            console.log(response.data.Slots);
            setslots(response.data.Slots)
        })
    }

    // const cookies = new Cookies();
    // const handleApply = () => {
    //   const body = {
    //     'Doctor':doctor.id,
    //     'Patient':parseInt(cookies.get('id')),
    //     'Slot': selectedslot.id
    //   }

    //   axios.post('http://localhost:8000/api/booking/apply',body)
    //   .then((response)=>{
    //     console.log(response.data);
    //   })
    // }


    const handleSlotselect = (slot) =>{

      setselectedslot(slot)
      setisselected(true)
    }

    return(
    <>
    <Navbar></Navbar>
<Card
    justify={'center'}
    padding={'2em'}
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    boxSize={'200px'}
    objectFit='fill'
    maxW={{ base: '100%', sm: '200px' }}
    src={`http://127.0.0.1:8000${doctor.profile}`}
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading paddingBottom={'10px'} size={"sm"}>{doctor.first_name} {doctor.last_name}</Heading>
      <Heading paddingBottom={'10px'} size={'sm'}>Specialization: {role_name.role_name}</Heading>

      <Text  size={'md'}>Choose Slot:</Text>
      <Tabs size={'sm'} variant='soft-rounded' colorScheme='green' paddingBottom={'7'}>
              <TabList>
              <Tab onClick={()=> handleDayChange(0)} isDisabled={showPopup}>Monday</Tab>
              <Tab onClick={()=> handleDayChange(1)} isDisabled={showPopup}>Tuesday</Tab>
              <Tab onClick={()=> handleDayChange(2)} isDisabled={showPopup}>Wednesday</Tab>
              <Tab onClick={()=> handleDayChange(3)} isDisabled={showPopup}>Thursday</Tab>
              <Tab onClick={()=> handleDayChange(4)} isDisabled={showPopup}>Friday</Tab>
              <Tab onClick={()=> handleDayChange(5)} isDisabled={showPopup}>Saturday</Tab>
              </TabList>

      </Tabs>
      
      <Tabs size={'sm'} variant='soft-rounded' colorScheme='blue'>
        <TabList>
        {slots.map((slot,i)=>{
          if(slot.availability && !slot.is_booked){
            return(
              <Tab onClick={()=>handleSlotselect(slot)} key={i} isDisabled={showPopup}>
                  {slot.time}
              </Tab>
          );
          }else{
            return null
          }
          } )}
        </TabList>
      </Tabs> 
      

    </CardBody>

    <CardFooter justifyContent={"end"}>
      {isselected && !showPopup?(
      <Button variant='solid' colorScheme='blue' onClick={()=> setShowPopup(true)}>
      Select Slot
    </Button>

      ):
      (
      <></>
      )}

    </CardFooter>
  </Stack>
</Card>
{showPopup && <ApplyForm doctor = {doctor} role_name={role_name} slot = {selectedslot} onClose={() => setShowPopup(false)} />}
    </>
    )
}