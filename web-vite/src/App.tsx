import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FloatingNavView } from "@/components/ui/nav/FloatingNavView";
import { Dashboard } from "@/components/dashBoard/dashboard";
import { SidebarAdmin } from '@/components/SidebarAdmin';

// Home page component that includes the original App content
const HomePage = () => {
  return (
    <>
      <FloatingNavView />
      <Dashboard />
    </>
  );
};

// Empty Admin page component
const AdminPage = () => {
  return (
    <SidebarAdmin />
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