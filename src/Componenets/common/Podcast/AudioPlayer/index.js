import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import './style.css';

function AudioPlayer({ audioSrc, image }) {
    const [isPlaying, setIsPlaying] = useState(false); // Start with audio paused
    const [isMute, setIsMute] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef();
    console.log("Audio src",audioSrc);
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    const toggleVolume = () => {
        setIsMute(!isMute);
    }

    const handleDurationChange = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    }

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        setIsMute(newVolume === 0);
    }

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        const audioElement = audioRef.current;
        const handleLoadedMetadata = () => {
            setDuration(audioElement.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audioElement.currentTime);
        };

        audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
        audioElement.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audioElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    return (
        <div className='custom-player'>
            <img src={image} className='image-player' alt="Audio cover" />
            <audio ref={audioRef} src={audioSrc} />
            <p className="audio-btn" onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</p>
            <div className='duration-flex'>
                <p>{formatTime(currentTime)}</p>
                <input 
                    type='range' 
                    min="0" 
                    max={duration} 
                    value={currentTime} 
                    onChange={handleDurationChange} 
                    className='duration-range' 
                />
                <p>{formatTime(duration - currentTime)}</p>
                <p className="audio-btn" onClick={toggleVolume}>{!isMute ? <FaVolumeUp /> : <FaVolumeMute />}</p>
                <input 
                    type='range' 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={handleVolumeChange} 
                    className='volume-range' 
                />
            </div>
             

        </div>
    );
}

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default AudioPlayer;
