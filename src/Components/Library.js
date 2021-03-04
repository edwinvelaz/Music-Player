import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({backgroundChanged, setBackgroundChange, isImgRotating, setIsImgRotating ,songs, setCurrentSong, currentSong, audioRef, isPlaying, setIsPlaying, setSongs, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className='library-songs'>
                {songs.map((song) => (
                    <LibrarySong
                        backgroundChanged={backgroundChanged}
                        setBackgroundChange={setBackgroundChange}
                        isImgRotating={isImgRotating}
                        setIsImgRotating={setIsImgRotating}
                        setSongs={setSongs}
                        setIsPlaying={setIsPlaying}
                        isPlaying={isPlaying}
                        audioRef={audioRef}
                        song={song}
                        currentSong={currentSong}
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