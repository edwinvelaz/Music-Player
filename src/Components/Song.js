import React from 'react';

const Song = ({ currentSong, isImgRotating }) => {

    return (
        <div className='song-container'>
            <img className={`${isImgRotating ? 'img-rotating' : ''}`}alt={currentSong.name} src={currentSong.cover}/>
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    )
}

export default Song;