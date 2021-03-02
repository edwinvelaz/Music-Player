import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo }) => {
    //Refs
    
    //Handlers

    //Pause and Play
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    //Format time
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
        )
    }

    //Change input slider
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    //State
    

    return (
        <div className='player'>
            <div className='time-control'>
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    //Slider to be changed
                    onChange={dragHandler}
                    //Starts at 0
                    min={0}
                    //Ends on song duration
                    max={songInfo.duration}
                    //Wherever the slide should be
                    value={songInfo.currentTime}
                    type='range'
                />
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>
            <div className='play-control'>
                <FontAwesomeIcon className='skip-back'
                    size='2x'
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className='play'
                    size='2x'
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    className='skip-forward'
                    size='2x'
                    icon={faAngleRight}
                />
            </div>
        </div>
    )
}

export default Player;