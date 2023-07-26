import {
    Avatar,
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue
  } from "@chakra-ui/react";
import axios from "axios";
  import React, { useState } from "react";
  
  function TablesTableRow(props) {
    const {id, isdoc, logo, first_name,last_name, email, patient_last_name, patient_first_name, status, date, time , isLast } = props;
    const textColor = useColorModeValue("gray.500", "white");
    const titleColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "navy.900");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const getDayName = () => {
      switch (date) {
        case 0:
          return 'Monday';
        case 1:
          return 'Tuesday';
        case 2:
          return 'Wednesday';
        case 3:
          return 'Thursday';
        case 4:
          return 'Friday';
        case 5:
          return 'Saturday';
        default:
          return '';
      }
    };

   const statusHandler = () =>{
    console.log('asd');
      axios.post('http://localhost:8000/api/doctor/approve',{'booking_id': id}).then((response)=>{
        console.log(response.data);
      })
    }
  
    const viewHandler=()=>{
      axios.post('http://localhost:8000/api/doctor/getappointmentdetails',{'id':id})
    }

    return (
      <Tr>
        <Td
          minWidth={{ sm: "250px" }}
          pl="0px"
          borderColor={borderColor}
          borderBottom={isLast ? "none" : null}
        >
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Avatar src={logo} w="50px" borderRadius="12px" me="18px" />
            <Flex direction="column">
                <Flex>
              <Text
                fontSize="md"
                color={titleColor}
                fontWeight="bold"
                mx={'5px'}
              >
                {first_name}

              </Text>
              <Text
                fontSize="md"
                color={titleColor}
                fontWeight="bold"
              >
                {last_name}

              </Text>
              </Flex>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                {email}
              </Text>
            </Flex>
          </Flex>
        </Td>
  
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              {patient_first_name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {patient_last_name}
            </Text>
          </Flex>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
          <Badge
            bg={status === true ? "green.400" : bgStatus}
            color={status === true ? "white" : "white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            {status ?(<div>approved</div>)
            :
            (<div>Not approved</div>)}
          </Badge>
        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        
        
              <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              {getDayName()}
            </Text>
            <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
              {time}
            </Text>
            

        </Td>
        <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
                  <Button
                    fontSize="md"
                    color="blue.400"
                    fontWeight="bold"
                    cursor="pointer"
                    onClick={viewHandler}
                  >
                   View 
                  </Button>

              </Td>
        {isdoc?(
                <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
                  <Button
                    fontSize="md"
                    color="blue.400"
                    fontWeight="bold"
                    cursor="pointer"
                    onClick={statusHandler}
                  >
                    Change Status
                  </Button>

              </Td>
              
        ):(
        <div></div>
        )}

      </Tr>
    );
  }
  
  export default TablesTableRow;
  