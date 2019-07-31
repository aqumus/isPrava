import React from 'react';
import logo from './logo-isprava.png';
import './App.css';
import { VillaReview } from './components/VillaReview/VillaReview';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <VillaReview />
    </div>
  );
}

export default App;
