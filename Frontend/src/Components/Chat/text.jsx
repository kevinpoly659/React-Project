
import { 
    Box,
    Input,
    Button,
    Flex,
 } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';


export default function Message(){

    const [messages,setMessages] = useState([]);
  const [chatLog,setChatLog] = useState('');
    const socket = useSelector((state) => state.socket);

    useEffect(()=>{
      const socket = new WebSocket('ws://localhost:8000/ws/chat/bennetgince/');
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
          }
        };
    },[])
    
    const sendMessage = () => {
      const messageToSend = {
        text: messages,
        sender: 'Your Name', // Replace with the sender's name
      };
      socket.send(JSON.stringify(messageToSend));
      setMessages('');
    };
      const handleMessages = (e) =>{
        // console.log(e.target.value);
        setMessages(e.target.value)
      }
    return(
        <>
        <Flex>
            <Box width={'90%'}> 
            <Input
            type="text"
            name="message"
            placeholder="Type your messages here.."
            value={messages}
            onChange={handleMessages}
            >
            </Input>
            </Box>
            <Box>
                <Button width={'150%'} onClick={sendMessage}>Send</Button>
            </Box>
        </Flex>
        </>
    )
}