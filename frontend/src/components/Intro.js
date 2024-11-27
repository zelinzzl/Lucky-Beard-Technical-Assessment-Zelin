import React from 'react';

function Intro() {
    return (
        <div className="flex-wrap p-4 space-y-4">
            {/* Title: The Bearded Blogger */}
            <div className="text-7xl font-bold tracking-tight mb-10">
                The Bearded Blogger
            </div>

            {/* Subtitle: Creativity | Culture | Collaboration */}
            <div className="text-2xl text-gray-600 font-light uppercase tracking-wider">
                Creativity | Culture | Collaboration
            </div>

            {/* Description */}
            <div className="text-lg font-light text-gray-600 leading-relaxed">
                Get a behind-the-scenes look at the day-to-day life of our creative team! From inspiring projects and team-building moments to the latest company news, our blog shares the stories, insights, and fun that fuel our creative agency.
            </div>
        </div>
    );
}

export default Intro;