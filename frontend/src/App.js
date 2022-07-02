import React, {  useState, useEffect } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
// import Spotify from './components/Music/Music'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons'
// import MessageIcon from '@mui/icons-material/Message';

import { BrowserRouter as Router, Routes, Route, useSearchParams, useNavigate} from "react-router-dom";
var AUTH_URL = "https://accounts.spotify.com/en/authorize?client_id=c080f2ccbe4e4076acec716794d739c1&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth%2Fcallback&scope=user-read-currently-playing+user-read-email&show_dialog=True"
var BACKEND_URL = "http://localhost:8000"

const axios = require('axios');

function App() {
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
  var access_token = localStorage.getItem('access_token');
  let navigate = useNavigate();
  useEffect(() => {  
    if(access_token == undefined){
      console.log("not signed in")
      navigate("/login")
    }
  })
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
  let navigate = useNavigate();
  var access_token = localStorage.getItem('access_token');
  useEffect(() => {  
    if(access_token != undefined){
      console.log("signed in")
      navigate("/")
    }
  })
  return <h2><a href={AUTH_URL}>Login via Spotify</a></h2>;
}

function Callback(){
  const [searchParams, setSearchParams] = useSearchParams();
  var spotify_code = searchParams.get('code')
  let navigate  = useNavigate ();
  getAndSetToken(spotify_code).then( (tokens) => {
    console.log(tokens)
    localStorage.setItem('access_token', tokens.access_token);
    console.log("saved access token")
    navigate("/")
  }).catch((error) => {
    console.log("ohh nooo")
    navigate("/login")
  })
  return <h2>Callback</h2> 
}

async function getAndSetToken(code) {
  const response = await axios.get(`${BACKEND_URL}/oauth/callback?code=${code}`);
  return response.data
}

export default App;
