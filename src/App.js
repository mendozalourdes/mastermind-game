import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import BoardGame from './Components/BoardGame';
import GuessInput from './Components/GuessInput'; 
import Header from './Components/Header';
import Results from './Components/Results';
import SingleBoardPiece from './Components/SingleBoardPiece';



const App = () => {
  return (
    <div className="App">
       <Header />
    </div>
  );
};

export default App;
 