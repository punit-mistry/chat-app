import React from 'react'
import {HStack,Avatar,Text} from "@chakra-ui/react"
const Message = ({texts,uri,user="other"}) => {
  return (
    <HStack alignSelf={user==="me"?"flex-end":"flex-start"} borderRadius={"base"} bg={'gray.100'} paddingY={"2"} paddingX={"4"} >
      
      {
        user==="other" &&<Avatar src={uri} />
      }
      <Text>{texts}</Text>
      {
        user==="me" &&<Avatar src={uri} />
      }
        {/* <Avatar src={uri} /> */}
      </HStack>
  )
}

export default Message