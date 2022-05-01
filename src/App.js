import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import BoardGame from './Components/BoardGame';
import GuessInput from './Components/GuessInput'; 
import Header from './Components/Header';
import Results from './Components/Results';
import { useState, useEffect } from 'react';
import axios from 'axios';
import loadingSpin from './Images/loadingSpin.gif';



const App = () => {

const [secretCode, setSecretCode] = useState("")
const [isLoading, setIsLoading] = useState(true)
const [error, setError ] = useState('');
const [secretDifficultCode, setSecretDifficultCode] = useState("")


const getBasicCode = () => {
   let url = `https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`
    axios.get(url)
    .then((response) => {

      return setSecretCode((response.data.split('\n').slice(0, 4).map(Number)))

    })
    .then((response) => {
      return setIsLoading(false)

    }

    )
    .catch(error => setError(error.message))
}

const getDifficultCode = () => {
  let url = `https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new`
   axios.get(url)
   .then((response) => {

     return setSecretDifficultCode((response.data.split('\n').slice(0, 6).map(Number)))

   })
   .then((response) => {
     return setIsLoading(false)

   }

   )
   .catch(error => setError(error.message))
}
 
      useEffect(() => {
       getBasicCode()
       getDifficultCode()
  }, [])

if(secretCode) {
  return (
    
    <main>
    <div className="App">
       <Header />
    <p>{secretCode}</p>
   <p>{secretDifficultCode}</p>
    <GuessInput secretCode={secretCode}/>
       <BoardGame secretCode={secretCode}/>
    </div>
    </main>
  );
};

if(isLoading) {
  return (
    
    <main>
    <div className="App">
    <section className='loading-container flex flex-col justify-center '>
        <p className="loading-message title">Loading MasterMind Game </p>
        <img className='loading' src={loadingSpin} />
      </section>
    </div>
    </main>
  );
};

}

export default App;
 