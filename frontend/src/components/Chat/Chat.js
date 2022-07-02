import React, { useState, useEffect } from 'react'
import socketIO from 'socket.io-client';
import "./Chat.css"

import closeIcon from "../../images/closeIcon.png";
import sendLogo from "../../images/send.png"
import Message from "../Message/Message"
let socket;
const ENDPOINT = "http://localhost:8000"

const Chat = () => {
   
    const [id, setid] = useState("")
    const [messages, setMessages] = useState([]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
         socket.emit('message', { message,id });
         document.getElementById('chatInput').value = "";
     }
 

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        // const id = socket.id;
       
        socket.emit('joined', { id , messages })
    })
    
    return (
      
        <div className="chatPage">
          <div className="chatContainer">
              <div className="header">
                  <h2>Messages</h2>
                  <a href="/"><img src={closeIcon} alt="Close"/></a>
              </div>
              <div className="chatBox">

                    {/* {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)} */}
                    </div>
              <div className="inputBox">
                  <input type="text" id="chatInput" />
                  <button  className="sendBtn"><img src={sendLogo} alt="Send"/></button>
            </div>
               
             
            </div>
            </div>
            
          
      
  )
}

export default  Chat 