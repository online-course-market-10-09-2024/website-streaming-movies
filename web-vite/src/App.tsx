import './App.css'
import React from 'react'
import {FloatingNavView} from "@/components/ui/nav/FloatingNavView";
import {Dashboard} from "@/components/dashBoard/dashboard";

function App() {

  return (
      <>
          <FloatingNavView />
          <Dashboard />
      </>
  )
}

export default App
