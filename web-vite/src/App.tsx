import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminPage from '@/pages/AdminPage';
import HomePage from '@/pages/HomePage';
import {VideoGallery} from "./components/ui/Video/VideoGallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/movie" element={<VideoGallery />} />
    </Routes>
  );
}

export default App;