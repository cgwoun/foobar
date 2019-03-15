import React, { Component } from 'react';
import './App.css';
import { SimpleImage } from './SimpleImage.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SimpleImage name="foobar"/>
      </div>
    );
  }
}

export default App;
