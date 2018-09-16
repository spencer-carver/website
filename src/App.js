import React, { Component } from 'react';
import InstagramEmbed from "./InstagramEmbed.js";
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Currently Under Construction
          </h1>
        </header>
        <p className="App-intro">
          Something will be here soon! In the meantime, here's an instagram post.
        </p>
        <InstagramEmbed postId="BlGuqGZlFvr" />
      </div>
    );
  }
}

export default App;
