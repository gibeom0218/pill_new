import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './home'
import Login from './login'
import AddDrugForm from './addDrugForm'
import Resister from './resister'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/resister" element={ <Resister /> } />
          <Route path="/addDrugForm" element={ <AddDrugForm /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
