import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


import React from 'react';
import {
  chakra,
  Flex,
  HStack,

  Button,
  InputGroup,
  InputLeftElement,
  Input,
  VisuallyHidden,
  MenuButton,
} from '@chakra-ui/react';
import { AiOutlineMenu, AiFillHome, AiOutlineInbox, AiFillBell,AiOutlineSearch  } from 'react-icons/ai';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { Menu, MenuList, MenuItem, MenuDivider,MenuGroup } from '@chakra-ui/react';


function Navbar(){
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    const cookies =  new Cookies();
    const navigate = useNavigate();
    // if(cookies.get('Patient')){
    //     const logoutbutton = document.createElement('button');
    //     logoutbutton.textContent = 'Logout';
    //     logoutbutton.addEventListener('click',function() {
    //         cookies.remove('Patient',{path:'/'});
    //         location.reload    
    //     });
    //     document.getElementById('Auth').appendChild(logoutButton);
    // }else{
    //     const loginbutton = document.createElement('button');
    //     loginbutton.textContent = 'Login';
    //     loginbutton.addEventListener('click',function(){
    //         navigate('/login')
    //     })
    // }

   
        const[hasCookies,setHasCookies] = useState(false);
        const[usertype,setusertype]= useState(true);
        useEffect(()=>{
            const checkCookies = () =>{
                if(cookies.get('Patient')){
                    setHasCookies(true)
                    setusertype(false)
                }
                else if(cookies.get('Doctor')){
                    setHasCookies(true)
                    setusertype(true)
                }
                else{
                    setHasCookies(false)
                }
            };
            checkCookies();
        },[]);
    const logout = () =>{
        cookies.remove('Patient',{path:'/'})
        cookies.remove('Doctor',{path:'/'})
        setHasCookies(false)
        navigate("/login")
    }

    console.log(cookies.get('Patient'))
      return(
        <React.Fragment>
        <chakra.header
          bg={"blackAlpha.700"}
          w="full"
          px={{
            base: 2,
            sm: 4,
          }}
          py={4}
          shadow="md"
        >
          <Flex alignItems="center" justifyContent="space-between" mx="auto">
            <HStack display="flex" spacing={3} alignItems="center">

              <chakra.a
                href="/"
                title="Choc Home Page"
                display="flex"
                alignItems="center"
              >
                {/* <Logo/> */}
                <VisuallyHidden>Choc</VisuallyHidden>
              </chakra.a>
  
              <HStack
                spacing={3}
                display={{
                  base: "none",
                  md: "inline-flex",
                }}
              >
                {usertype?  (
                  <>
                <Button  variant="solid" leftIcon={<AiFillHome />} size="sm" colorScheme="brand" onClick={()=>navigate("/")}>
                Dashboard
              </Button>
              <Button
                variant="solid"
                colorScheme="brand"
                leftIcon={<AiOutlineInbox />}
                size="sm"
                onClick={()=> navigate("/doctorappointments")}
              >
                Appointments
              </Button>
              <Button
                variant="solid"
                leftIcon={<BsFillCameraVideoFill />}
                size="sm"
                colorScheme="brand"
                onClick={()=> navigate("/chat")}

              >
                Chat
              </Button>
              </>
                ):
                (
                  <>
                <Button  variant="solid" leftIcon={<AiFillHome />} size="sm" colorScheme="brand" onClick={()=>navigate("/")}>
                Home
              </Button>
              <Button
                variant="solid"
                colorScheme="brand"
                leftIcon={<AiOutlineInbox />}
                size="sm"
                onClick={()=>navigate("/doctorlists")}
              >
                Doctors
              </Button>
              <Button
                variant="solid"
                leftIcon={<BsFillCameraVideoFill />}
                size="sm"
                colorScheme="brand"
                onClick={()=>{navigate("/booking")}}
              >
                Bookings
              </Button>
              <Button
                variant="solid"
                leftIcon={<BsFillCameraVideoFill />}
                size="sm"
                colorScheme="brand"
                onClick={()=> navigate("/chat")}
              >
                Chat
              </Button>
              </>
                )}

              </HStack>

            </HStack>

            <HStack
              spacing={3}
              display={mobileNav.isOpen ? "none" : "flex"}
              alignItems="center"
            >
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineSearch />
                </InputLeftElement>
                <Input type="tel" placeholder="Search..." />
              </InputGroup>
  
              <chakra.a
                p={3}
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                rounded="sm"
                _hover={{
                  color: "gray.800",
                  _dark: {
                    color: "gray.600",
                  },
                }}
              >
                <AiFillBell />
                <VisuallyHidden>Notifications</VisuallyHidden>
              </chakra.a>
                <Menu>
                  <MenuButton color={"Window"}>
                      Profile
                    </MenuButton>
                    <MenuList>
                      <MenuGroup title='Profile'>
                        {usertype? 
                        (<>
                          <MenuItem onClick={()=> navigate("/doctorprofile")}>My Account</MenuItem>
                          <MenuItem>Payments </MenuItem>
                          <MenuItem onClick={()=>{navigate('/slot')}}>Slots</MenuItem>

                          </>
                        ):
                        (
                          <>
                          <MenuItem onClick={()=> navigate("/patientprofile")}>My Account</MenuItem>
                          <MenuItem>Payments</MenuItem>
                          </>
                        )
                        }


                      </MenuGroup>
                      <MenuDivider />

                      <MenuGroup title="Logout" id="loginButton" onClick={logout} >
                        </MenuGroup> 
                    </MenuList>
                    </Menu>
            </HStack>
          </Flex>
        </chakra.header>
      </React.Fragment>
    )
}

export default Navbar;