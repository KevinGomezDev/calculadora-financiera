import React, { Component } from 'react';

import './input.css';

export default class Input extends Component {
  render() {
    const { name, label, className, placeholder, onChange, type, value } = this.props
    const inputProps = {
      className: `${className} input`,
      placeholder: label,
      id: name,
      name,
      onChange,
      type,
      value,
    }
    return (
      <div className={'Input-container'}>
        <label className={'label'} htmlFor={name}>{label}</label>
        <input {...inputProps} />
      </div>
    );
  }
}