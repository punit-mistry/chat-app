import {Box,Container,VStack,Button,Input, HStack} from '@chakra-ui/react'
import Message from './Components/Message';

function App() {
  return (
    <Box bg={'lightcyan'}>
      <Container h={'100vh'}bg={'lightcyan'}>
        <VStack h={'100vh'} bg={'lightgrey'} padding={"6"}>
          <Button colorScheme={"red"} w={'full'}>
            SignOut
          </Button>
          <VStack h={"full"} w={'full'}>

          <Message text={"this is the Sample Message For testing purpose"} />

          </VStack>

          <form style={{width:"100%",padding:"10px",backgroundColor:"lightblue"}}>
           <HStack>
           <Input type={"text"} w={"full"} placeholder={"Enter Your Message Here..."}></Input>
            <Button colorScheme={"purple"} type={"submit"} >Send</Button>
           </HStack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
