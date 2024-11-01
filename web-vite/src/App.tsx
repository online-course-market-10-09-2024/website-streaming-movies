import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminPage from '@/pages/AdminPage';
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;