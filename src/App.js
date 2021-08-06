import React, { Component } from 'react';
import './App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
        Hello, React!!!
        <Subject title="WEB" sub="World Wide Web!!!"></Subject>
        <TOC></TOC>
        <Content title='HTML1' desc='HTML is HyperText Markup Language.1'></Content>
        
      </div>

    );
  }
}


export default App;
