import React, { Component } from 'react';

import simpleinterest from '../../utils/formulas/simpleInterest.js';
import compoundinterest from '../../utils/formulas/compoundInterest.js';

import Input from '../Form/input.js';

import { FaCalculator } from 'react-icons/lib/fa';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      option: 'futureValue',
      formValues: {
        presentValue: 0,
        interestPercentage: 0,
        periods: 0,
      },
    }
  }

  handleOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      formValues: {
        ...this.state.formValues,
        [name]: value,
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const presentValue = this.state.formValues.presentValue
    const interestPercentage = this.state.formValues.interestPercentage
    const periods = this.state.formValues.periods

    const simpleFutureVal = simpleinterest().futureValue(presentValue, interestPercentage, periods)
    const simplePresentVal = simpleinterest().presentValue(simpleFutureVal, periods, interestPercentage)
    const simpleRate = simpleinterest().interestRate(simpleFutureVal, simplePresentVal, periods)
    const simplePeriods = simpleinterest().interestPeriods(simpleFutureVal, simplePresentVal, simpleRate)

    const compoundFutureVal = compoundinterest().futureValue(presentValue, interestPercentage, periods)
    const compoundPresentVal = compoundinterest().presentValue(compoundFutureVal, periods, interestPercentage)
    const compoundRate = compoundinterest().interestRate(compoundFutureVal, compoundPresentVal, periods)
    const compoundPeriods = compoundinterest().interestPeriods(compoundFutureVal, compoundPresentVal, compoundRate)

    this.setState({
      simpleInterest: {
        futureValue: Math.round(simpleFutureVal),
        presentValue: Math.round(simplePresentVal),
        interestRate: Math.round(simpleRate * 100),
        interestPeriods: Math.round(simplePeriods),
      },
      compoundInterest: {
        futureValue: Math.round(compoundFutureVal),
        presentValue: Math.round(compoundPresentVal),
        interestRate: Math.round(compoundRate * 100),
        interestPeriods: Math.round(compoundPeriods),
      }
    })
  }

  handleSelect = (e) => {
    this.setState({ option: e.target.value })
  }

  render() {
    return (
      <div className="Home">
        <header className="Home-sidebar">
          <FaCalculator className={'Home-calculatorIcon'} />
          <h1 className="Home-title">Calculadora Financiera</h1>
        </header>
        <div className='Home-content'>
        <div className='Home-select'>
          <h3>¿Que valor desea conocer?</h3>
          <select value={this.state.option} onChange={this.handleSelect}>
            <option value="futureValue">Valor Futuro</option>
            <option value="presentValue">Valor Presente</option>
              <option value="interestPercentage">Tasa de interés</option>
            <option value="periods">Periodos</option>
          </select>
        </div>
        <div className='Home-container'>
          <div className='Home-form'>
            <form onSubmit={this.handleSubmit}>
              {(this.state.option !== 'presentValue')
                && <Input label='Valor Presente' name='presentValue' onChange={this.handleOnChange} />}
              {(this.state.option !== 'futureValue')
                && <Input label='Valor Futuro' name='futureValue' onChange={this.handleOnChange} />}
              {(this.state.option !== 'interestPercentage')
                &&<Input label='Tasa de Interés' name='interestPercentage' onChange={this.handleOnChange} />}
              {(this.state.option !== 'periods')
                && <Input label='Periodos' name='periods' onChange={this.handleOnChange} />}
              <Input type="submit" className={'Home-button'} value="Calcular" />
            </form>
          </div>
          <div className='Home-results-container'>
              <div className={'Home-results'}>
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
        </div>
      </div>
    );
  }
}

export default Home;
