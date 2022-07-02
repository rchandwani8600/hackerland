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
    // const [systemNotification, setSystemNotification] = useState([]);

    var systemNotification = []
    // var messages = [['abh','asd',true]]


    const send = () => {
        const message = document.getElementById('chatInput').value;
         socket.emit('message', message);
         document.getElementById('chatInput').value = "";
     }
 

    useEffect(() => {
        var socket_id
        socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        socket.on('connect', () => {
            console.log("Connected", socket.id)
            socket_id = socket.id
        })

        var access_token = localStorage.getItem("access_token")
        socket.emit('joined', access_token)

        socket.on('system', (data) => {
            data = JSON.parse(data)
            systemNotification.push(data.msg)
            // setSystemNotification([...systemNotification,data.msg])
            console.log(systemNotification)
        })

        socket.on('disconnect', (data) => {
            //  setMessages([...messages,data]);
            console.log("disconnectedddddd");
        })
        
            
      return () => {
          socket.emit('disconnected');
          socket.off();
          console.log("closedd")
      }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            data = JSON.parse(data)
            setMessages([...messages, [data.sent_from.display_name,data.msg, data.sent_id == socket.id]])
            console.log(messages,'---');
        })
    },[messages])


    var item = messages[0]
    return (
      
        <div className="chatPage">
          <div className="chatContainer">
              <div className="header">
                  <h2>Messages</h2>
                  <a href="/"><img src={closeIcon} alt="Close"/></a>
              </div>
              <div className="chatBox">
                {messages.map((item, i) => <Message user={item[2] ? '' : item[0]} message={item[1]} classs={item[2] ? 'right' : 'left'} />)}
                </div>
              <div className="inputBox">
                  <input type="text" id="chatInput" />
                  <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send"/></button>
            </div>
               
             
            </div>
            </div>
            
          
      
  )
}

export default  Chat 