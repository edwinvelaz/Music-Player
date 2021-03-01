import React, { useState } from 'react'
//Adding components
import Player from './Components/Player';
import Song from './Components/Song'
//Styles
import './styles/app.scss';
//Import Data
import data from './util';


function App() {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
    </div>
  );
}

export default App;
