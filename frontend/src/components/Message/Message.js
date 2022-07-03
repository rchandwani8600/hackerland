import React from 'react';
import './Message.css'
const Message = ({ user, message, classs }) => {
   
    if (user!='System') {
        return (
            <div className={`messageBox ${classs}`} >
                {`${user}:${message}`}
            </div>
        )
        
    }
    else if (user = 'System') {
        return (
            <div className={`messageBox ${classs}`}>
                {`System:${message}`}
            </div>
        )
    }

    else {
        return (
            <div className={`messageBox ${classs}`}>
                {`You:${message}`}
            </div>
        )
    }
}

export default Message