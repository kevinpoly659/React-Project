import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, Image, chakra } from "@chakra-ui/react";

import { MdEmail, MdHeadset, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { data } from "autoprefixer";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

export default function Confirm(){
  const data = useSelector(state => state.patient.patientDetails);
    

  console.log(data);

  const doctor = data.Doctor
  const role_name = data.Role_name
  const navigate = useNavigate();

  const Razorpay = useRazorpay();
  const [paymentstatus,setPaymentStatus] = useState(false);
    const handlePayment = async () =>{
      console.log('sadas');
      const response = await fetch('http://localhost:8000/api/booking/confirm')
      const {order_id} = await response.json();

      const options = {
        key: "rzp_test_GvgWclBbIZzq5L", // Enter the Key ID generated from the Dashboard
        amount: "250000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Dochere",
        description: "Test Transaction",
        image: "",
        order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
          setPaymentStatus(true)
          axios.post('http://localhost:8000/api/booking/apply',data).then((response)=>{
            console.log(response.data);
          })
        },
        prefill: {
          name: "Piyush Garg",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
    
      const rzp1 = new Razorpay(options);
    
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
    
      rzp1.open();
    };



    




  return (
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="max-content"
        mx="auto"
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >


        <Flex alignItems="center" px={6} py={3} bg="gray.900">

          <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg" margin={"auto"}>
            Confirm Booking
          </chakra.h1>
        </Flex>
        <Box boxSize={'50em'} py={4} px={6}>
          <Box marginTop={'20px'}>
          <chakra.h1
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "white" }}>
            Doctor Details
          </chakra.h1>
          <Flex columnGap={'10px'}> 
          <chakra.h1
            fontSize="sm"
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "white" }}
            marginTop={'10px'}
          >
            Name:
          </chakra.h1>
          <chakra.h1
            fontSize="sm"
            color="gray.800"
            _dark={{ color: "white" }}
            marginTop={'10px'}
          >
            {doctor.first_name}
          </chakra.h1>
          <chakra.h1
            fontSize="sm"
            color="gray.800"
            _dark={{ color: "white" }}
            marginTop={'10px'}
          >
            {doctor.last_name}
          </chakra.h1>
          </Flex>
          <Flex>
          <chakra.h1
            fontSize="sm"
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "white" }}
            marginTop={'10px'}
          >
            Specialization:
          </chakra.h1>
          <chakra.p px={2} py={2} color="gray.700" _dark={{ color: "gray.400" }}>
          {role_name.role_name}
          </chakra.p>
          </Flex>
          <Box boxSize={'200px'}>
          <Image
          src={`http://127.0.0.1:8000${doctor.profile}`}
          borderRadius="lg"
            />
          </Box>

          </Box>

    <Box py={'5em'}>
      <chakra.h1
      marginTop={'10px'}
      fontSize={'xl'}>
        Patient Details
      </chakra.h1>

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <chakra.h1 px={1} fontSize="sm" fontWeight={'bold'}>
              Name:
            </chakra.h1>


            <chakra.h1 px={1} fontSize="sm">
              {data.First_name}
            </chakra.h1>
            <chakra.h1 px={1} fontSize="sm">
              {data.Last_name}
            </chakra.h1>
          </Flex>

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <chakra.h1 px={1} fontSize="sm" fontWeight={'bold'}>
              Age:
            </chakra.h1>

            <chakra.h1 px={2} fontSize="sm">
              {data.Age}
            </chakra.h1>
          </Flex>
          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <chakra.h1 px={1} fontSize="sm" fontWeight={'bold'}>
              Gender:
            </chakra.h1>

            <chakra.h1 px={2} fontSize="sm">
              {data.Gender}
            </chakra.h1>
            </Flex>
            <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <chakra.h1 px={1} fontSize="sm" fontWeight={'bold'}>
            Medical Reason
            </chakra.h1>

            <chakra.h1 px={2} fontSize="sm">
              {data.Condition}
            </chakra.h1>
            </Flex>
            </Box>
      <Flex justifyContent={'center'}>
        {!paymentstatus?(
      <Button colorScheme="blue" onClick={handlePayment}>
      Proceed to Payment
    </Button>
        ):(
      <chakra.p>
        <Button onClick={()=>{navigate('/')}}>Return To Home</Button>
      </chakra.p>
        )}

      </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

