import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
    //Refs
    const audioRef = useRef(null);

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

    //Time updater
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration
        setSongInfo({ ...songInfo, currentTime: current, duration })
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
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })

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
                <p>{getTime(songInfo.duration)}</p>
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
            <audio
                //Time to be loaded without clicking
                onLoadedMetadata={timeUpdateHandler}
                //Time update
                onTimeUpdate={timeUpdateHandler}
                //In order to access html tag outside use ref
                ref={audioRef}
                //State's audio
                src={currentSong.audio}>    
            </audio>
        </div>
    )
}

export default Player;