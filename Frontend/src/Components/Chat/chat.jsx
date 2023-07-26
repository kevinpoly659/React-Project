import { 
    Box,
    Flex
} from "@chakra-ui/react";
import Contacts from "./contacts";
import Conversations from "./conversations";
import Navbar from "../Navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";



export default function Chat(){

    const cookies = new Cookies();
    const [contacts,setContacts] = useState([]);

    useEffect(()=>{
        const getContacts=()=>{
            axios.post('http://localhost:8000/api/chat/contacts',{'id':cookies.get('id')}).then((response)=>{
                // console.log(response.data);
                setContacts(response.data);
                
            })
        }
        getContacts();
    },[])
    console.log(contacts);


   





    return(
        <>
        <Navbar></Navbar>
        <Box>
            <Flex>
                <Box>
                <Contacts
                contacts ={contacts}
                />
                </Box>
                {/* <Box
                      as="nav"
                      pos="fixed"
                      right="0"
                      h="full"
                      pb="10"
                      overflowX="auto"
                      overflowY="auto"
                      bg="white"
                      _dark={{
                        bg: "gray.800",
                      }}
                      border
                      color="inherit"
                      w="70%"
                >
                <Conversations/>
                </Box> */}
            </Flex>
        </Box>
        </>
    )
}