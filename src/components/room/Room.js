import React from 'react'
import Chat from './Chat';
import { Box } from '@mui/material'
import { useLocation } from "react-router-dom"
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")  // connect to the backend server

export default function Room() {
  // Using this method though, we must ensure user only gains access to Room through the join button and not through the url
  // Implement the on enter method within app for this route
  const {state} = useLocation();
  const { room, username } = state

  React.useEffect(() => {
    if (room !== ""){
      socket.emit("join_room", room) // tell the socket that we want to join a room
    }
    return () => {socket.emit("leave_room", room)}
  }, [room])
  
  //console.log("Parameters Passed: " + room, username)
  return (
    <Box
      sx={{
        width: '30vw', 
        height: 'auto', 
        margin: '10vh auto', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Chat username={username} room={room} socket={socket}/>
    </Box>
          
  )
}
