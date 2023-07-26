import { 
    Box,
    Flex,
    Stack,
    Text
} from "@chakra-ui/react";
import Cards from "./cards";
import { useState } from "react";
import { storeWebSocket } from "../../features/actions/websocketactions";
import { storeSocket } from "../../features/reducers/websocketReducers";
import { useDispatch } from 'react-redux';
import Conversations from "./conversations";
// import Messages from "./messages";
export default function Contacts({contacts}){

    // const {contacts} = props;
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [socket, setSocket] = useState(null);
    const [isselected,setIsSelected] = useState(false);
    const [selctedcontact,setSelectedContact] = useState('');
    const dispatch = useDispatch();

    const getMessages = (id) =>{

      setIsSelected(false)
      setTimeout(100)
      setIsSelected(true)
      setSelectedContact(id)
        // const socket = new WebSocket('ws://localhost:8000/ws/chat/bennetgince/');
        // socket.onopen = () => {
        //     console.log('WebSocket Client Connected');
        //   };


        //   socket.onmessage = (message) => {
        //     const dataFromServer = JSON.parse(message.data);
        //     if (dataFromServer) {
        //       setChatLog((prevChatLog) => [
        //         ...prevChatLog,
        //         {
        //           message: dataFromServer.message,
        //           name: dataFromServer.name,
        //         },
        //       ]);
        //     }
        //   };
      
          dispatch(storeSocket(socket));      
          // Clean up the WebSocket connection on component unmount
          return () => {
            socket.close();
          };


    }

    const sendMessage = () => {
        const messageToSend = {
          text: message,
          sender: 'Your Name', // Replace with the sender's name
        };
        socket.send(JSON.stringify(messageToSend));
        setMessage('');
      };

    console.log(contacts);
    return(
      <Flex>
        <Box
          as="nav"
          pos="fixed"
          left="0"
          zIndex="sticky"
          h="full"
          pb="10"
          overflowX="hidden"
          overflowY="auto"
          bg="white"
          _dark={{
            bg: "gray.800",
          }}
          border
          color="inherit"
          borderRightWidth="5px"
          w="30%"
        >
            <Flex>
            <Text mx={'auto'}>
                Contacts
            </Text>
            </Flex>

            <Stack>
                {contacts.map((contact)=>{
                    console.log(contact);
                    return(
                        <Box 
                        key={contact.id}
                        onClick={()=>{getMessages(contact.id)}}
                        >
                        <Cards
                        socket = {socket}
                        first_name = {contact.first_name}
                        last_name = {contact.last_name}
                        profile = {contact.profile}
                        />
                        </Box>
                    )
                })}
                <Stack>
                  {chatLog.map((message,index)=>{
                    <li key={index}>{message}</li>
                  })}
                </Stack>
            </Stack>
        </Box>
        <Box
        as="nav"
        pos="fixed"
        right="0"
        // zIndex="sticky"
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
        borderRightWidth="5px"
        w="70%">
          {isselected &&           <Conversations
          id={selctedcontact}
          />}

        </Box>
        </Flex>
    );
}