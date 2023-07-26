import React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  VisuallyHidden,
  chakra,
  Divider,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import Cookies from "universal-cookie";
import { useDispatch } from 'react-redux';
import { setPatientDetails } from "../../../../features/patientReducer";
import { useNavigate } from "react-router-dom";




export default function ApplyForm({doctor,slot,role_name}){

    const cookies = new Cookies()
    console.log(slot);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(e.target.first_name.value);
        const body = {
            'Doctor'    :   doctor,
            'Role_name' :   role_name,
            'Patient'   :   cookies.get('id'),
            'Slot'      :   slot,
            'First_name':   e.target.first_name.value,
            'Last_name' :   e.target.last_name.value,
            'Age'       :   e.target.age.value,
            'Gender'    :   e.target.gender.value,
            'Condition' :   e.target.condition.value,

        }
        console.log(body);
        
        dispatch(setPatientDetails(body))
        navigate('/confirm');
    }
    

    return(
    <>
    <Box bg="#edf3f8" _dark={{ bg: "#111" }} p={10}>
                 
      <Divider
        my="5"
        borderColor="gray.300"
        _dark={{ borderColor: "whiteAlpha.300" }}
        visibility={{ base: "hidden", sm: "visible" }}
      />

      <Box mt={[10, 0]}> 
            <chakra.form
              method="POST"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
              onSubmit={handleSubmit}
            >
                
              <Stack
                px={4}
                py={5}
                p={[null, 6]}
                bg="white"
                _dark={{ bg: "#141517" }}
                spacing={6}
              >
                <Heading>Enter Patient Details</Heading>    
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="first_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      First name
                    </FormLabel>
                    <Input
                      type="text"
                      name="first_name"
                      id="first_name"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="96"
                      rounded="md"
                      required
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="last_name"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Last name
                    </FormLabel>
                    <Input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autoComplete="family-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="96"
                      rounded="md"
                      required
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 4]}>
                    <FormLabel
                      htmlFor="age"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Age
                    </FormLabel>
                    <Input
                      type="text"
                      name="age"
                      id="age"
                      autoComplete="age"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="20"
                      rounded="md"
                      required
                    />
                  </FormControl>

                  <FormControl as={GridItem} colSpan={[6, 3]}>
                    <FormLabel
                      htmlFor="gender"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Sex
                    </FormLabel>
                    <Select
                      id="gender"
                      name="gender"
                      autoComplete="gender"
                      placeholder="Select option"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      required
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Select>
                  </FormControl>

                  <FormControl as={GridItem} colSpan={6}>
                    <FormLabel
                      htmlFor="condition"
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                      _dark={{ color: "gray.50" }}
                    >
                      Medical Conditions
                    </FormLabel>
                    <Textarea
                      type="text"
                      name="condition"
                      id="condition"
                      autoComplete="condition"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size={'lg'}
                      w="container.sm"
                      rounded="md"
                      required
                    />
                  </FormControl>


                </SimpleGrid>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg="gray.50"
                _dark={{ bg: "#121212" }}
                textAlign="right"
              >
                <Button
                  type="submit"
                  colorScheme="red"
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                >
                  Book Appointment
                </Button>
              </Box>
            </chakra.form>
      </Box>

      <Divider
        my="5"
        borderColor="gray.300"
        _dark={{ borderColor: "whiteAlpha.300" }}
        visibility={{ base: "hidden", sm: "visible" }}
      />

    </Box>
  </>

    )
}