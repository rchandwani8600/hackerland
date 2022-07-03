import React, { useState, useEffect } from 'react'
import socketIO from 'socket.io-client';
import "./Chat.css"

import closeIcon from "../../images/closeIcon.png";
import sendLogo from "../../images/send.png"
import Message from "../Message/Message"
import { Constants, getAccessToken } from '../helpers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
let socket;
const ENDPOINT = Constants.BACKEND_URL

const Chat = () => {
    let navigate = useNavigate()
    
    const [id, setid] = useState("")
    const [messages, setMessages] = useState([]);


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

        socket.emit('joined', getAccessToken(navigate))

        socket.on('disconnect', (data) => {
            //  setMessages([...messages,data]);
            console.log("disconnectedddddd");
        })

        socket.on("play", (data) => {
            console.log(data)
            playSong(getAccessToken(navigate), data)
        } )
            
      return () => {
          socket.emit('disconnected');
          socket.off();
          console.log("closedd")
      }
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            data = JSON.parse(data)
            setMessages([...messages, [data.sent_from.display_name,data.msg, data.sent_id == socket.id ? "right":"left"]])
            // console.log(messages,'---');
        })

        socket.on('system', (data) => {
            console.log("system", data)
            data = JSON.parse(data)
            setMessages([...messages, ["System",data.msg, "center"]])
            // setSystemNotification([...systemNotification,data.msg])
            // console.log(messages,'++++');
        })
    },[messages])

    return (
      
        <div className="chatPage">
          <div className="chatContainer">
              <div className="header">
                  <h2>Messages</h2>
                  <a href="/"><img src={closeIcon} alt="Close"/></a>
              </div>
              <div className="chatBox">
                {messages.map((item, i) => <Message user={item[0]} message={item[1]} classs={item[2]} />)}
                </div>
              <div className="inputBox">
                  <input type="text" id="chatInput" />
                  <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send"/></button>
            </div>
            </div>
            </div>
  )
}

async function playSong(token, uri){
    const response = await axios.put(
        'https://api.spotify.com/v1/me/player/play',
        {
            uris: [uri]
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
    )
}

export default  Chat 