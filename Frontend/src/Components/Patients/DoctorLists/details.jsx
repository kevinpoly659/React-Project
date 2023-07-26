import React, { useEffect, useState } from "react";
import { Box, Flex, Icon, Image, chakra } from "@chakra-ui/react";

import { MdEmail, MdHeadset, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import Navbar from "../../Navbar/navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";


export default function Details(){

    const location = useLocation();

    const [doctor,setDoctor] = useState([]);
    const [role_name,setRole_name] = useState([]);

    useEffect(()=>{
        getdocdetails();
    },[]);
    
    const getdocdetails=()=>{
        console.log(location.state);
        axios.post('http://localhost:8000/api/patient/details',{'id':location.state})
        .then((response)=>{
            console.log(response.data);
            setDoctor(response.data.doctor)
            setRole_name(response.data.role_name)
        })
    }





  return (
    <>
    <Navbar></Navbar>
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
    


      <Box
        w="sm"
        mx="auto"
        bg="white"
        _dark={{ bg: "gray.800" }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <Image
          w="full"
          h={56}
          fit="cover"
          objectPosition="center"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
          alt="avatar"
        />

        <Flex alignItems="center" px={6} py={3} bg="gray.900">

          <chakra.h1 mx={1} color="white" fontWeight="bold" fontSize="lg">
            {doctor.first_name}
          </chakra.h1>
          <chakra.h1 mx={1} color="white" fontWeight="bold" fontSize="lg">
            {doctor.last_name}
          </chakra.h1>
          
        </Flex>

        <Box py={4} px={6}>


          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <Icon as={BsFillBriefcaseFill} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
            {role_name.role_name}
            </chakra.h1>
          </Flex>

          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <Icon as={MdLocationOn} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              California
            </chakra.h1>
          </Flex>
          <Flex
            alignItems="center"
            mt={4}
            color="gray.700"
            _dark={{ color: "gray.200" }}
          >
            <Icon as={MdEmail} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              patterson@example.com
            </chakra.h1>
          </Flex>
        </Box>
      </Box>




    </Flex>
    </>
  );
};

