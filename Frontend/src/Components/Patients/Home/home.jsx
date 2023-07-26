import React, { useEffect } from "react";
import Navbar from "../../Navbar/navbar";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Input, Card, CardBody, Text, Image, Stack, CardFooter, Button, Heading } from "@chakra-ui/react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home(){

 const cookies = new Cookies();
  const navigate = useNavigate();
  useEffect(()=>{
    if (!cookies.get('id')){
      navigate("/login")
    }
  },[]);


  const notify = () => {
    toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
    });
};

  return(
    <>
    <Navbar></Navbar>
    <div className="mt-5 mx-auto">

      <div className="page-hero bg-image overlay-dark" style={{backgroundImage: 'url(../assets/img/bg_image_1.jpg)'}}>
      <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
              >
          <Stack>
          <CardBody>
            <Heading size='md'>The right care, is wherever you are</Heading>

            <Text py='2'>
            Consult India’s Top Doctors Online, Safely From Home.
            </Text>
            <Button variant='solid' colorScheme='orange'>
              Consult Now
            </Button>
            <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
          </CardBody>

        </Stack>
        <CardBody align={'center'} width='container.sm'>
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '500px' }}
          src={`http://127.0.0.1:8000/Media/Images/banner-doctors.png`}
          alt='Caffe Latte'
        />
        </CardBody>
      </Card>
      </div>
      </div>
      </>
    );
}

export default Home;