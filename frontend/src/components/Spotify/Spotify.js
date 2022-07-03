import {React, useState, useEffect} from 'react';
import "./Spotify.css"
import { getAccessToken, Constants } from '../helpers';
import { useNavigate } from 'react-router-dom';
import { faL } from '@fortawesome/free-solid-svg-icons';

const axios = require('axios');

const Spotify = () => {
    let navigate = useNavigate()
    var access_token = getAccessToken(navigate)
    const [playData, setplayData] = useState({})
    useEffect(()=>{
        async function fetchLastPlayed(){
            const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            })
            var artists_name = ''
            response.data.items[0].track.artists.forEach((artist) => artists_name += artist.name + ' ')
            var mus = {
                name: response.data.items[0].track.name,
                artists: artists_name,
                url: response.data.items[0].track.album.images[0].url,
                prev: true
            }
            setplayData(mus)
            // console.log(mus)
        }
        async function fetchCurrent(){
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            })
            // var mus = {
            //     name: response.data.item.track.name,
            //     artists: artists_name,
            //     url: response.data.item.track.album.images[0].url,
            //     prev: false
            // }
            if(response.data == ""){
                playData.prev = true
            }
            else{
                console.log(response)
                var artists_name = ''
                response.data.item.artists.forEach((artist) => artists_name += artist.name)
                var mus = {
                    name: response.data.item.name,
                    artists: artists_name,
                    url: response.data.item.album.images[0].url,
                    prev: false
                }
                setplayData(mus)
            }
        }
        fetchLastPlayed()
        setTimeout(fetchCurrent, 500)

        const interval = setInterval(() => {
            fetchCurrent();
          }, 3000)
        return () => clearInterval(interval)
    }, [])
    // await axios.get(`${Constants.BACKEND_URL}/oauth/url`);

    return <div className='spotify-window'>
        <h2 className="sp-top">{playData.prev ? 'Recently Played' : 'Current Play'}</h2>
        <img className='spotify-play-img' src={playData.url}></img>
        <div className='spotify-song-stats'>
            <h2 className="sp-text">{playData.name}</h2>
            <p className="sp-text">{playData.artists}</p>
        </div>
    </div>
}

export default Spotify