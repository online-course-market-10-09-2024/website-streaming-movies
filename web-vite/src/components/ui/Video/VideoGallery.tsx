import React, { useState, useEffect } from 'react';
import { VideoView } from './VideoView';
import { motion } from 'framer-motion';
import { IconPlayerPlay, IconX } from '@tabler/icons-react';
import { useSearchParams } from "react-router-dom";
import { SparklesSearchBarView } from "../sparkle/sparklesSearchBarView";

interface Video {
  id: string;
  name: string;
  description: string;
  thumbnailImage: string;
  trailerVideoUrl: string;
  initialDate: string;
}

export const VideoGallery: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const searchQuery = searchParams.get('search') || '';
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/movies?search=${searchQuery}&limit=100&page=1`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setVideos(data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
      });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Add search bar at the top */}
      <div className="mb-12">
        <SparklesSearchBarView />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Videos'}
        </h1>
      </motion.div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-1">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={video.thumbnailImage}
                  alt={video.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{video.name}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">
                        {new Date(video.initialDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVideo(video.id)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <IconPlayerPlay className="w-8 h-8 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show "No results found" message if needed */}
      {videos.length === 0 && (
        <div className="text-center text-gray-400 mt-12">
          <h2 className="text-2xl">No videos found matching "{searchQuery}"</h2>
        </div>
      )}

      {/* Modal for Video Player */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          <div className="relative w-full max-w-6xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-pink-500 transition-colors"
            >
              <IconX className="w-8 h-8" />
            </button>
            <VideoView />
          </div>
        </motion.div>
      )}

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-purple-900/10 to-pink-900/20"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
      </div>
    </div>
  );
}; 