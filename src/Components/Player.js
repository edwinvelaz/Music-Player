import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';


const Player = ({ setCurrentSong, currentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo, songs, setSongs}) => {
    //Refs
    
    //UseEffect
    useEffect (() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
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
    }, [currentSong])
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

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length])
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1])
                if (isPlaying) {
                    audioRef.current.play();
                } else {
                    setIsPlaying(!isPlaying);
                    audioRef.current.play();
                }
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length])
        }
        if (isPlaying) {
            audioRef.current.play();
        } else {
            setIsPlaying(!isPlaying);
            audioRef.current.play();
        }
    }

    //State
    

    //Styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className='player'>
            <div className='time-control'>
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`}} className='track'>
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
                    <div style={trackAnim} className='animate-track'></div>
                </div>
                <p>{getTime(songInfo.duration || 0)}</p>
            </div>
            <div className='play-control'>
                <FontAwesomeIcon
                    className='skip-back'
                    onClick={() => skipTrackHandler('skip-back')}
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
                    onClick={() => skipTrackHandler('skip-forward')}
                    size='2x'
                    icon={faAngleRight}
                />
            </div>
        </div>
    )
}

export default Player;