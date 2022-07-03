import React from 'react';
import './Message.css'
const Message = ({ user, message, classs }) => {
   
    if (user!='System') {
        return (
            <div className='coverMsg'>
                <div className={`messageBox ${classs}`} >
                    {`${user}:${message}`}
                </div>
            </div>
        )
        
    }
    else if (user = 'System') {
        return (
            <div className='coverMsg'>
                <div className={`messageBox ${classs}`}>
                    {`System:${message}`}
                </div>
            </div>
        )
    }

    else {
        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message