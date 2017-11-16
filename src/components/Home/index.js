import React, { Component } from 'react';
import './home.css';
import { FaCalculator } from 'react-icons/lib/fa';
import { futureValue, presentValue, interestRate, interestPeriods } from '../../utils/formulas/simpleInterest.js';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      futureValue: null,
      presentValue: null,
    }
  }

  componentDidMount () {
    const input = {
      presentValue: 1000,
      interestPercentage: 14,
      periods: 3,
    }
    const futureVal = futureValue(input.presentValue, input.interestPercentage, input.periods)
    const presentVal = presentValue(futureVal, input.periods, input.interestPercentage)
    const rate = interestRate(futureVal, presentVal, input.periods)
    const periods = interestPeriods(futureVal, presentVal, rate)
    this.setState({
      futureValue: Math.round(futureVal ),
      presentValue: Math.round(presentVal),
      interestRate: Math.round(rate * 100),
      interestPeriods: Math.round(periods),
    })
  }

  render() {
    return (
      <div className="Home">
        <header className="Home-sidebar">
          <FaCalculator className={'Home-calculatorIcon'} />
          <h1 className="Home-title">Calculadora Financiera</h1>
        </header>
        <div className='Home-content'>
        <h1>Interés Simple</h1>
          <div className="Home-form">
            <h2>Formulario</h2>
            {'<!----TODO---->'}
          </div>
          <div className="Home-results">
          <h2>Resultados</h2>
            Valor Futuro: {this.state.futureValue}
            <br />
            Valor Presente: {this.state.presentValue}
            <br />
            Tasa de interés: {this.state.interestRate}
            <br />
            Periodos: {this.state.interestPeriods}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
