import React from 'react';
import { VideoPlayer } from './VideoPlayer';
import { motion } from "framer-motion";
import 'videojs-youtube';

interface VideoViewProps {
  movieTitle: string;
}

export const VideoView: React.FC<VideoViewProps> = (props) => {
  const videoJsOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    techOrder: ['youtube'],
    sources: [
      {
        src: "https://www.youtube.com/watch?v=voFRslp8d60",
        type: "video/youtube"
      }
    ],
    youtube: {
      ytControls: 0,
      enablePrivacyEnhancedMode: true,
      origin: window.location.origin
    }
  };

  const handlePlayerReady = (player: any) => {
    console.log('Player is ready');
    player.on('waiting', () => {
      console.log('player is waiting');
    });
    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-5xl mx-auto px-4 py-12"
    >
      <div className="relative">
        {/* Gradient Border Container */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        
        {/* Main Content Container */}
        <div className="relative bg-black rounded-xl p-1">
          {/* Video Title */}
          <div className="mb-4 p-4 bg-gradient-to-r from-black to-gray-900 rounded-t-xl">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              {props.movieTitle || "Movie Title"}
            </h2>
          </div>

          {/* Video Player Wrapper */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
            
            {/* Overlay Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>

          {/* Video Controls & Info */}
          <div className="mt-4 p-4 bg-gradient-to-r from-gray-900 to-black rounded-b-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Add to Playlist
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Share
                </motion.button>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-400">
                <span className="text-sm">Quality:</span>
                <select className="bg-transparent border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-purple-500">
                  <option value="1080p">1080p</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 