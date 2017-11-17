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
        futureValue: 0,
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
    const futureValue = this.state.formValues.futureValue
    const interestPercentage = this.state.formValues.interestPercentage
    const periods = this.state.formValues.periods

    const simpleFutureVal = simpleinterest().futureValue(presentValue, interestPercentage, periods)
    const simplePresentVal = simpleinterest().presentValue(futureValue, periods, interestPercentage)
    const simpleRate = simpleinterest().interestRate(futureValue, presentValue, periods)
    const simplePeriods = simpleinterest().interestPeriods(1420, 1000, (interestPercentage / 100))

    const compoundFutureVal = compoundinterest().futureValue(presentValue, interestPercentage, periods)
    const compoundPresentVal = compoundinterest().presentValue(futureValue, periods, interestPercentage)
    const compoundRate = compoundinterest().interestRate(futureValue, presentValue, periods)
    const compoundPeriods = compoundinterest().interestPeriods(futureValue, presentValue, (interestPercentage / 100))

    this.setState({
      simpleInterest: {
        futureValue: Math.round(simpleFutureVal),
        presentValue: Math.round(simplePresentVal),
        interestPercentage: Math.round(simpleRate * 100),
        periods: Math.round(simplePeriods),
      },
      compoundInterest: {
        futureValue: Math.round(compoundFutureVal),
        presentValue: Math.round(compoundPresentVal),
        interestPercentage: Math.round(compoundRate * 100),
        periods: Math.round(compoundPeriods),
      }
    })
  }

  handleSelect = (e) => {
    this.setState({
      option: e.target.value,
      formValues: {
        presentValue: 0,
        futureValue: 0,
        interestPercentage: 0,
        periods: 0,
      },
      simpleInterest: null,
      compoundInterest: null,
     })
  }

  render() {
    return (
      <div className="Home">
        <header className="Home-sidebar">
        <FaCalculator className={'Home-calculatorIcon'} />
        <img src={require('../../assets/logo.png')} className='Home-logo' />
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
                && <Input label='Valor Presente' name='presentValue' onChange={this.handleOnChange} value={this.state.formValues.presentValue} />}
              {(this.state.option !== 'futureValue')
                && <Input label='Valor Futuro' name='futureValue' onChange={this.handleOnChange} value={this.state.formValues.futureValue} />}
              {(this.state.option !== 'interestPercentage')
                &&<Input label='Tasa de Interés' name='interestPercentage' onChange={this.handleOnChange} value={this.state.formValues.interestPercentage} />}
              {(this.state.option !== 'periods')
                && <Input label='Periodos' name='periods' onChange={this.handleOnChange} value={this.state.formValues.periods} />}
              <Input type="submit" className={'Home-button'} value="Calcular" />
            </form>
          </div>
          <div className='Home-results-container'>
              <div className={'Home-results'}>
              {!!this.state.simpleInterest && <div>
                <h3>Interés Simple</h3>
                {(this.state.option === 'futureValue')
                  && <div><span>Valor Futuro: {this.state.simpleInterest.futureValue}</span><br /></div>}
                {(this.state.option === 'presentValue')
                  && <div><span>Valor Presente: {this.state.simpleInterest.presentValue}</span><br /></div>}
                {(this.state.option === 'interestPercentage')
                    && <div><span>Tasa de interés: {this.state.simpleInterest.interestPercentage}</span> <br /></div>}
                {(this.state.option === 'periods')
                    && <div><span>Periodos: {this.state.simpleInterest.periods}</span> <br /></div>}
              </div>}
              {!!this.state.compoundInterest && <div>
                <h3>Interés Compuesto</h3>
                  {(this.state.option === 'futureValue')
                    && <div><span>Valor Futuro: {this.state.compoundInterest.futureValue}</span><br /></div>}
                  {(this.state.option === 'presentValue')
                    && <div><span>Valor Presente: {this.state.compoundInterest.presentValue}</span><br /></div>}
                  {(this.state.option === 'interestPercentage')
                    && <div><span>Tasa de interés: {this.state.compoundInterest.interestPercentage}</span> <br /></div>}
                  {(this.state.option === 'periods')
                    && <div><span>Periodos: {this.state.compoundInterest.periods}</span> <br /></div>}
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
