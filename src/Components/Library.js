import { library } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setIsPlaying, setSongs, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className='library-songs'>
                {songs.map((song) => (
                    <LibrarySong
                        setSongs={setSongs}
                        setIsPlaying={setIsPlaying}
                        isPlaying={isPlaying}
                        audioRef={audioRef}
                        song={song}
                        setCurrentSong={setCurrentSong}
                        songs={songs}
                        id={song.id}
                        key={song.id}
                    />
                ))};
            </div>
        </div>
    )
}

export default Library;