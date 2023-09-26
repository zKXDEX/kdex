import React, { useState, useEffect, createRef } from 'react'
import Pages from './Pages/Pages';
import '../assets/styles/App.css';
import '../assets/styles/hero.css'

function App() {
  
  return (
    <div className="App">
      <Pages />
      
      <div className="mobile_nav_bg"></div>
    </div>
  );
}

export default App;
