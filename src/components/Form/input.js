import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const { name, placeholder, onChange, type, value} = this.props
    const inputProps = {
      placeholder,
      name,
      onChange,
      type,
      value,
    }
    return (
      <input {...inputProps} />
    );
  }
}