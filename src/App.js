import {Box,Container,VStack,Button,Input, HStack} from '@chakra-ui/react'
import Message from './Components/Message';
import {onAuthStateChanged,getAuth,GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth"
import {getFirestore,addDoc, collection, serverTimestamp,onSnapshot,query,orderBy } from "firebase/firestore"
import {app} from './firebase';
import { useState ,useEffect,useRef} from 'react';

const auth = getAuth(app)
const db =getFirestore(app)   
const loginhandler =()=>{
  const provider =new GoogleAuthProvider()
  signInWithPopup(auth,provider)
}


const logouthandler =()=>{
  signOut(auth)
}


function App() {

  
  const [user,setUser] = useState(false)
  const [message,setMessage] = useState("")
  const [messages,setMessages] = useState([])
  const divForScroll = useRef(null);
  useEffect(() => {

    const q =query(collection(db,"Message"),orderBy("createat","asc"))
  const unsubscribe=onAuthStateChanged(auth,(data)=>{
  setUser(data)
  })  
 
  const unsubscribeForMessage = onSnapshot(q ,(snap) => {
    setMessages(
      snap.docs.map((item) => {
        const id = item.id;
        return { id, ...item.data() };
      })
    );
  });


  return ()=>{
    unsubscribe();
  unsubscribeForMessage();
  }
  },[]);
  
  const submithandlers =async(e)=>{
    e.preventDefault();
    try {
      await addDoc(collection(db,"Message"),{
        Text:message,
        uuid:user.uid,
        uri:user.photoURL,
        createat:serverTimestamp()
      })
      setMessage("")
      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Box bg={'lightcyan'}>
      {
        user?(<Container h={'100vh'}bg={'lightcyan'}>
        <VStack h={'100vh'} bg={'lightgrey'} padding={"6"}>
          <Button colorScheme={"red"} w={'full'} onClick={logouthandler}>
            SignOut
          </Button>
          <VStack h={"full"} w={'full'} overflowY={"auto"}>

         
          {messages.map((item) => (
                <Message
                  key={item.id}
                  user={item.uuid === user.uid ? "me" : "other"}
                  texts={item.Text}
                  uri={item.uri}
                />
              ))}
          <div ref={divForScroll}></div>
          </VStack>

          <form onSubmit={submithandlers} style={{width:"100%",padding:"10px",backgroundColor:"lightblue"}}>
           <HStack>
           <Input value={message} onChange={(e)=>{setMessage(e.target.value)}} type={"text"} w={"full"} placeholder={"Enter Your Message Here..."}></Input>
            <Button colorScheme={"purple"} type={"submit"} >Send</Button>
           </HStack>
          </form>
        </VStack>
      </Container>):<VStack bg={'#151515'} justifyContent={"center"} h={"100vh"}>
        <Button onClick={loginhandler} colorScheme={"red"} >Sign In With Google</Button>
      </VStack>
      }
    </Box>
  );
}

export default App;
