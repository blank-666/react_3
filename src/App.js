import React from 'react';
import Timer from './components/Timer.js';
import './App.css';

function App() { 
  return (
    <div>
      <Timer 
        time = {4000} 
        step = {1000}/>

      <Timer 
        time = {5000} 
        step = {1000} 
        autostart
        infinite/>

      <Timer 
        time = {12000} 
        step = {2000} 
        onTick={(time) => console.log(`Залишилось ${time} секунд`)}
        onTimeStart = {() => console.log('Таймер запущено!')}
        onTimePause = {() => console.log('Таймер на паузі!')}
        onTimeEnd = {() => console.log('Час вийшов!')}/>
    </div>
  );
}

export default App;
