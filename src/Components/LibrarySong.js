import React from 'react';


const LibrarySong = ({ song, setCurrentSong, songs, id, audioRef, isPlaying, setIsPlaying, setSongs }) => {
    //Handlers

    //Selecting song by id
    const songSelectHandler = async () => {
        await setCurrentSong(song)
        //Add active state
        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return {
                    ...song,
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        })
        setSongs(newSongs)
        if (isPlaying) {
            audioRef.current.play();
        } else {
            setIsPlaying(!isPlaying);
            audioRef.current.play();
        }
    }

    return (
        <div className={`library-song ${song.active ? 'selected' : ''}`} onClick={songSelectHandler}>
            <img alt={song.name} src={song.cover} />
            <div className='song-description'>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;