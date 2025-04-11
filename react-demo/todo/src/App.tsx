import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClassCom from './classCom';
import FunctionCom from './FunctionCom';
import TodoList from './Todolist';
import MapTest from './MapTest';
import Clock from './timer';
import MyWeather from './MyWeather';



function App() {

  let name : string = "React";



  return (
    <div className="container">
      <TodoList></TodoList>
      <Clock></Clock>
      <MyWeather weather='sunny'>forecast</MyWeather>
    </div>
  );
}

export default App;
