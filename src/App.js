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

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player />
    </div>
  );
}

export default App;
