import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';


function App() {


  return (
    <>
      <Router basename='/'>
        <AppRoutes></AppRoutes>
      </Router>
    </>
  )
}

export default App
