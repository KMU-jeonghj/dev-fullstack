import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let name : string = "React";

  const style = {
    backgroundColor : 'black',
    color : 'white',
    fontSize : '50px',
    fontWeight : 'bold',
    padding : '20px'
  }

  return (
    <div className="container">
      <h1 className='test'>Hello {name}</h1>
      <br />
      <p>hi</p>
      <input type="text" />
      {/*comment */}
      
    </div>
  );
}

export default App;
