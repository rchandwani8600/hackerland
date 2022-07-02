
import "./Chat.css"
// import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import sendLogo from "../../images/send.png"


const Chat = () => {
    
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