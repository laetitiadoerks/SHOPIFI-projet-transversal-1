import React from 'react';
import './App.css';
import Login from './Login.js';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
          <header className="App-header">
              <div className="App-logo">
                  <img src={logo} alt="logo" />
              </div>
          </header>
          <body>
              <Login />
          </body>
    </div>
  );
}

export default App;
