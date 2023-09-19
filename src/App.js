import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './home'

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
        </Routes>
      </Router>
=======
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
>>>>>>> 370476791e23092a6da35727a480288f9153eb8f
    </div>
  );
}

export default App;
