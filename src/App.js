import React, { useEffect, useState } from 'react';
import "./App.css";
import Homepage from "./components/Home/Homepage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { auth } from './firebaseConfig';
export default function App() {
 
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/Homepage" element={<Homepage/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/" element={<Login />}/>

        </Routes>
      </Router>
    </div>
  )
}
