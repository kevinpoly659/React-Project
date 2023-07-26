import { Box,
         Flex,
        //  React,
         chakra,
        //  Logo,
         HStack,
         Button,
         IconButton,
        //  AiOutlineMenu,
         CloseButton,
         VStack,
         Input,
         Text,
         Stack,
         Textarea,
         




} from "@chakra-ui/react"
// import Messages from "./message"
import { useSelector } from 'react-redux';
import { useColorModeValue } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useState ,useEffect, useRef} from "react";



export default function Conversations({id}){


  const messagesEndRef = useRef(null);

    const navigate = useNavigate();
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    const cookies = new Cookies();
    const [roomId,setRoomId] = useState('');
    const [prevChatLog,setChatLog] = useState([]);
    const [socket,setSocket] = useState();
    const [message,SetMessage] = useState('');

    const handleVideocall =()=>{
      if(cookies.get('Doctor')){
        console.log('Doctor');
        const data = {
          'doctor':cookies.get('id'),
          'patient':id
        }
      axios.post('http://localhost:8000/api/booking/room',data).then((response)=>{
        console.log(response.data);
        setRoomId(response.data)
        navigate(`/video/${response.data}`);
      })
      }else{
        console.log('Patient');

        const data = {
          'patient':cookies.get('id'),
          'doctor':id
        }
      axios.post('http://localhost:8000/api/booking/room',data).then((response)=>{
        console.log(response.data);
        setRoomId(response.data)
        navigate(`/video/${response.data}`);
      })
      }
    }

    
    useEffect(()=>{
      connect();
      scrollToBottom();
    },[])


    const connect = ()=>{
      if(cookies.get('Doctor')){
        console.log('Doctor');
        const data = {
          'doctor':cookies.get('id'),
          'patient':id
        }
      axios.post('http://localhost:8000/api/booking/room',data).then((response)=>{
        console.log(response.data);
        setRoomId(response.data)
      })
      }else{
        console.log('Patient');

        const data = {
          'patient':cookies.get('id'),
          'doctor':id
        }
      axios.post('http://localhost:8000/api/booking/room',data).then((response)=>{
        console.log(response.data);
        setRoomId(response.data)
        console.log(roomId);
      })
      }

      const socket = new WebSocket(`ws://localhost:8000/ws/chat/GinceBennet/`);
      setSocket(socket)
      socket.onopen = () => {
          console.log('WebSocket Client Connected');
        };
        socket.onmessage = (message) => {
          const dataFromServer = JSON.parse(message.data);
          if (dataFromServer) {
            setChatLog((prevChatLog) => [
              ...prevChatLog,
              {
                message: dataFromServer.message,
                name: dataFromServer.name,
              },
            ]);
        console.log(...prevChatLog);

          }
        };
    }

    const sendMessage = () => {
      const messageToSend = {
        message: message,
        name: 'Bennet', // Replace with the sender's name
      };
      socket.send(JSON.stringify(messageToSend));
    };

    const HandleMessage = (e) => {
      SetMessage(e.target.value)
    }


    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return(
        <Flex direction={'column'}>
            <Box
                marginBottom={"51.5%"}
                // mx={'auto'}
            >
    <Box>
      <chakra.header
        bg={bg}
        w="100%"
        // px={{
        //   base: 2,
        //   sm: 4,
        // }}
        // py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              Name
            </chakra.a>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              {/* <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">Blog</Button>
              <Button variant="ghost">Company</Button> */}
              <Button leftIcon={<BsFillCameraVideoFill/>} variant="ghost" onClick={handleVideocall}>Video Call</Button>
            </HStack>

            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </Box>
            </Box>
              <div style={{ height: '50%', overflowY: 'scroll' }}>
              <Stack>
              {prevChatLog.map((messages, index) => (
                <>
                <div key={index}>
            <Text >
              {messages.message}
              </Text>
              </div>
            </>
                ))}

             <Text>
              Reciever Message
            </Text> 

              </Stack>
              </div>



            <Box 
            >
                <Flex position={"fixed"}>
                <Input name="message" onChange={HandleMessage} width={'60em'}></Input>
                <Button onClick={sendMessage}>Send</Button>
                </Flex>
            </Box>
        </Flex>
    )
}