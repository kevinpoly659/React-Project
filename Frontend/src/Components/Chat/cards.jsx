import { 
    Box,
    Flex,
    Image,
    Text
 } from "@chakra-ui/react"


export default function Cards(props){




    const {first_name,last_name,profile} = props;


    return(
        <>
            <Box padding={'10px'} width={'100%'} height={'100%'} border={'1px'} borderColor={'gray.300'}>
                <Flex>
                <Box 
                width={'60px'}
                height={'60px'}
                borderRadius={'50%'}
                >
                <Image borderRadius={"50%"} src={ `http://127.0.0.1:8000${profile}`} alt="image" />
                </Box>
                <Flex mx={'auto'} my={'auto'}>
                <Text marginRight={'10px'}>
                    {first_name}
                </Text>
                <Text>
                    {last_name}
                </Text>
                </Flex>

                </Flex>
            </Box>
        </>
    )
}