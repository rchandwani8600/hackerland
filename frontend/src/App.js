import React, {  useState, useEffect } from 'react';
import './App.css';
import './BG.css';
import Chat from './components/Chat/Chat';
// import Spotify from './components/Music/Music'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons'
// import MessageIcon from '@mui/icons-material/Message';
import Logo  from './images/logo.png'

import { BrowserRouter as Router, Routes, Route, useSearchParams, useNavigate} from "react-router-dom";
import Spotify from './components/Spotify/Spotify';
import { Constants } from './components/helpers';
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
  var last_saved = localStorage.getItem('last_saved') || 0;
  var current_time = new Date().getTime()
  let navigate = useNavigate();
  useEffect(() => {  
    if(access_token == undefined || current_time - last_saved >= 50*60*1000 ){
      localStorage.clear()
      console.log("not signed in")
      navigate("/login")
    }
  })

  async function logout(){
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="App">
          <div className="container">
            <h3 className="Title">SYNC US</h3>
          </div>
          <Spotify/>
           <Chat /> 
          {/* <button className='btn' onClick={() => setState(true)}><FontAwesomeIcon className='message'icon={faMessage} /></button> */}
          <button className='btn-logout' onClick={logout}>Logout</button>
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
  const [auth_resp, setAuth_resp] = useState({})
  useEffect(() => {
    async function loginUrl(){
        const response = await axios.get(`${Constants.BACKEND_URL}/oauth/url`).then(resp => setAuth_resp(resp.data))
    }
    loginUrl()
  }, [])
  
  if(auth_resp != ''){
    return (
      <div>
        <div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
      <div className='titlediv'><h3 className="Title">SYNC US</h3></div>
      <div className = "login">
           
        <img src={Logo} alt="Spotify Logo" id="spotifylogo" />
      </div>

      <div className="login">
        <button className="spotifybtn"> <h2><a href={auth_resp.url} className="loginurl">Login via Spotify</a></h2></button>
      </div>
    </div>
  )
    
  }
  else return <h2>Loding...</h2>
}

function Callback(){
  const [searchParams, setSearchParams] = useSearchParams();
  var spotify_code = searchParams.get('code')
  let navigate  = useNavigate ();
  getAndSetToken(spotify_code).then( (tokens) => {
    console.log(tokens)
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('last_saved', new Date().getTime());
    console.log("saved access token")
    navigate("/")
  }).catch((error) => {
    console.log("ohh nooo")
    navigate("/login")
  })
  return <h2>Callback</h2> 
}

async function getAndSetToken(code) {
  const response = await axios.get(`${Constants.BACKEND_URL}/oauth/callback?code=${code}`);
  return response.data
}

export default App;
