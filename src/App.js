import React, { Component } from 'react';
import './App.css';
import { SimpleImage } from './SimpleImage.js'
import { ScrollableImage } from './ScrollableImage.js'


class App extends Component {

  render() {
    return (
      <div className="App">
        <ScrollableImage name="Google" />
      </div>
    );
  }
}

export default App;
