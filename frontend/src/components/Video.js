import React from 'react';
import Video from '../assets/videos/video.mp4';

function VideoBlock() {
    return (
        <div className="relative w-64 h-36 overflow-hidden"> 
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
            >
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoBlock;