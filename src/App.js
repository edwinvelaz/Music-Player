import React, { useState, useRef } from 'react'
//Adding components
import Player from './Components/Player';
import Song from './Components/Song'
import Library from './Components/Library'
//Styles
import './styles/app.scss';
//Import Data
import data from './util';


function App() {
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0
})

  //Handlers

  //Time updater
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration
    setSongInfo({ ...songInfo, currentTime: current, duration })
}
  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <audio
          //Time to be loaded without clicking
          onLoadedMetadata={timeUpdateHandler}
          //Time update
          onTimeUpdate={timeUpdateHandler}
          //In order to access html tag outside use ref
          ref={audioRef}
          //State's audio
          src={currentSong.audio}>    
      </audio>
    </div>
  );
}

export default App;
