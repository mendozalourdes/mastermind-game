import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      </header>
    </div>
  );
}

export default App;
