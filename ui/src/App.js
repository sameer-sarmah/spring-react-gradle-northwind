import React, { Component } from 'react';
import './App.css';
import ProductList from './components/product.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProductList/>
      </div>
    );
  }
}

export default App;
