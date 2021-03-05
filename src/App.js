import React, { useState, useRef } from 'react'
//Adding components
import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library';
import Nav from './Components/Nav';
//Styles
import './styles/app.scss';
//Import Data
import data from './data';


function App() {
  const audioRef = useRef(null);
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [isImgRotating, setIsImgRotating] = useState(false);
  const [backgroundChange, setBackgroundChange] = useState({
    color: '',
    active: false
  })

  //Handlers
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  }

  //Time updater
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)
    setSongInfo({ ...songInfo, currentTime: current, duration, animationPercentage: animation })
  }
  
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""} ${backgroundChange.active ? 'background-changed' : 'background-paused'}`}>
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
        />
        <Song
          isImgRotating={isImgRotating}
          setIsImgRotating={setIsImgRotating}
          currentSong={currentSong}
        />
        <Player
          backgroundChange={backgroundChange}
          setBackgroundChange={setBackgroundChange}
          setIsImgRotating={setIsImgRotating}
          isImgRotating={isImgRotating}
          setSongs={setSongs}
          songs={songs}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentSong={setCurrentSong}
          currentSong={currentSong}
        />
      <Library
          backgroundChange={backgroundChange}
          setBackgroundChange={setBackgroundChange}
          isImgRotating={isImgRotating}
          setIsImgRotating={setIsImgRotating}
          libraryStatus={libraryStatus}
          songs={songs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setSongs={setSongs}
        />
        <audio
          //Time to be loaded without clicking
          onLoadedMetadata={timeUpdateHandler}
          //Time update
          onTimeUpdate={timeUpdateHandler}
          //In order to access html tag outside use ref
          ref={audioRef}
          //State's audio
          src={currentSong.audio}
          //Skip song
          onEnded={songEndHandler}
        />
    </div>
  );
}

export default App;
