import React, { Component } from 'react';
import './home.css';
import { FaCalculator } from 'react-icons/lib/fa';
import simpleinterest from '../../utils/formulas/simpleInterest.js';
import compoundinterest from '../../utils/formulas/compoundInterest.js';

class Home extends Component {

  componentWillMount () {
    const input = {
      presentValue: 1000,
      interestPercentage: 14,
      periods: 3,
    }
    const futureVal = {
      simple: simpleinterest().futureValue(input.presentValue, input.interestPercentage, input.periods),
      compound: compoundinterest().futureValue(input.presentValue, input.interestPercentage, input.periods),
    }
    const presentVal = {
      simple: simpleinterest().presentValue(futureVal.simple, input.periods, input.interestPercentage),
      compound: compoundinterest().presentValue(futureVal.compound, input.periods, input.interestPercentage),
    }
    const rate = {
      simple: simpleinterest().interestRate(futureVal.simple, presentVal.simple, input.periods),
      compound: compoundinterest().interestRate(futureVal.compound, presentVal.compound, input.periods),
    }
    const periods = {
      simple: simpleinterest().interestPeriods(futureVal.simple, presentVal.simple, rate.simple),
      compound: compoundinterest().interestPeriods(futureVal.compound, presentVal.compound, rate.compound),
    }
    this.setState({
      simpleInterest: {
        futureValue: Math.round(futureVal.simple),
        presentValue: Math.round(presentVal.simple),
        interestRate: Math.round(rate.simple * 100),
        interestPeriods: Math.round(periods.simple),
      },
      compoundInterest: {
        futureValue: Math.round(futureVal.compound),
        presentValue: Math.round(presentVal.compound),
        interestRate: Math.round(rate.compound * 100),
        interestPeriods: Math.round(periods.compound),
      }
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
          <div className="Home-form">
            <h2>Formulario</h2>
            {'<!----TODO---->'}
          </div>
          <div className="Home-results">
            <h2>Resultados</h2>
            {!!this.state.simpleInterest && <div>
              <h3>Interés Simple</h3>
              Valor Futuro: {this.state.simpleInterest.futureValue}
              <br />
              Valor Presente: {this.state.simpleInterest.presentValue}
              <br />
              Tasa de interés: {this.state.simpleInterest.interestRate}
              <br />
              Periodos: {this.state.simpleInterest.interestPeriods}
            </div>}
            {!!this.state.compoundInterest && <div>
              <h3>Interés Compuesto</h3>
              Valor Futuro: {this.state.compoundInterest.futureValue}
              <br />
              Valor Presente: {this.state.compoundInterest.presentValue}
              <br />
              Tasa de interés: {this.state.compoundInterest.interestRate}
              <br />
              Periodos: {this.state.compoundInterest.interestPeriods}
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
