import React, {  useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
// import Spotify from './components/Music/Music'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons'
// import MessageIcon from '@mui/icons-material/Message';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  // return <Home/>
  return (
      <Router>
        <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/oauth/callback" element={<Callback/>} />
        </Routes>
      </Router>
    );
};

function Home() {
  const [state, setState] = useState(false)
  return (
    <div className="App">
          <div className="container">
            <h3 className="Title">SYNC ON</h3>
          </div>
          {state ? <Chat /> : null}
          <button className='btn' onClick={() => setState(true)}><FontAwesomeIcon className='message'icon={faMessage} /></button>
        </div>
  );
}

function Login() {
  return <h2>Login via Spotify</h2>;
}

function Callback(){
  return <h2>Callback</h2> 
}

export default App;
