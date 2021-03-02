import React from 'react';

const LibrarySong = ({ song, setCurrentSong, songs, id, audioRef, isPlaying, setIsPlaying}) => {
    //Handlers

    //Selecting song by id
    const songSelectHandler = () => {
        setCurrentSong(song)
        //check if song is playing
        const playPromise = audioRef.current.play();
        if (isPlaying) {
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                })
            }
        } else {
            setIsPlaying(!isPlaying)
            playPromise.then((audio) => {
                audioRef.current.play();
            })
        }
    }

    return (
        <div className='library-song' onClick={songSelectHandler}>
            <img alt={song.name} src={song.cover} />
            <div className='song-description'>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;