import React from 'react'
//Adding components
import Player from './Components/Player';
import Song from './Components/Song'
//Styles
import './styles/app.scss';
//Import Data
import data from './util';


function App() {
  return (
    <div className="App">
      <Song />
      <Player />
    </div>
  );
}

export default App;
