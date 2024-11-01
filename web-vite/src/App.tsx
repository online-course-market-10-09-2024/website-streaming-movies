import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FloatingNavView } from "@/components/ui/nav/FloatingNavView";
import { Dashboard } from "@/components/dashBoard/dashboard";
import AdminPage from './pages/AdminPage';

// Home page component that includes the original App content
const HomePage = () => {
  return (
    <>
      <FloatingNavView />
      <Dashboard />
    </>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;