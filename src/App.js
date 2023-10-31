import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './home'
import Login from './login'
import PillSearch from './pillSearch'
import Register from './register'
import PillEnrollList from './pillEnrollList'
import PillSpec from './pillSpec'
import Main from './main'


import PillMap from './pillMap'

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
          <Route path="/pillSpec/:itemSeq" element={ <PillSpec /> } />
        
          
          <Route path="/pillMap" element={ <PillMap /> } />
          <Route path="/main" element={ <Main /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;