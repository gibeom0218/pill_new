import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './home'
import Login from './login'
import PillSearch from './pillSearch'
import Register from './register'
import PillEnrollList from './pillEnrollList'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/pillSearch" element={ <PillSearch /> } />
          <Route path="/pillEnrollList" element={ <PillEnrollList /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
