import React, { Component } from 'react';
import './home.css';
import { FaCalculator } from 'react-icons/lib/fa';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <header className="Home-sidebar">
          <FaCalculator className={'Home-calculatorIcon'} />
          <h1 className="Home-title">Calculadora Financiera</h1>
        </header>
        <div className='Home-content'>
          <div className="Home-form">
          </div>
          <div className="Home-results">
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
