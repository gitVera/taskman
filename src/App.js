import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Todolist from './Todolist';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">TaskMan</h1>
          </header>
          <Todolist/>
        </div>
      </Provider>
    );
  }
}

export default App;
