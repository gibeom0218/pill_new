import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
//import Home from './home'
import Login from './login'
import PillSearch from './pillSearch'
import Register from './register'
import PillEnrollList from './pillEnrollList'
import PillSpec from './pillSpec'
import Main from './main'
import PillChk from './pillChk'


import PillMap from './pillMap'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Main /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/pillSearch" element={ <PillSearch /> } />
          <Route path="/pillEnrollList" element={ <PillEnrollList /> } />
          <Route path="/pillSpec/:itemSeq" element={ <PillSpec /> } />
          <Route path="/pillChk" element={ <PillChk /> } />
          <Route path="/pillMap" element={ <PillMap /> } />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;