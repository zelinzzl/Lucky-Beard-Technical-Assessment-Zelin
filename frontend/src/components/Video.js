import React from 'react';
import Video from '../assets/videos/video.mp4';

function VideoBlock() {
    return (
        <div className="relative w-full h-96 overflow-hidden"> 
            <video
                className="absolute w-full h-96 object-cover"
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