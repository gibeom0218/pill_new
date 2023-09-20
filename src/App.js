import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './home'
import Login from './login'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
