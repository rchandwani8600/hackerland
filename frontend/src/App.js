import React, {  useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import message from './images/message.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons'
// import MessageIcon from '@mui/icons-material/Message';

function App() {
  const [state, setState] = useState(false)

return (

  <div className="App">
    <div class="container">
  
      <h3 class="Title">SYNC ON</h3>
</div>

{state ? <Chat /> : null}

    <button className='btn' onClick={() => setState(true)}><FontAwesomeIcon className='message'icon={faMessage} /></button>

</div>

);

};


export default App;
