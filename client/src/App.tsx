import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { JwtProvider } from './TokenContex';  // Import JwtProvider
import AppRoutes from './Routes';


function App() {


  return (
    <>
    <JwtProvider>
      <Router basename='/'>
        <AppRoutes></AppRoutes>
      </Router>
      </JwtProvider>
    </>
  )
}

export default App
