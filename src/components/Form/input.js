import React, { Component } from 'react';

export default class Input extends Component {
  render() {
    const { name, placeholder, onChange } = this.props
    const inputProps = {
      placeholder,
      name,
      onChange,
    }
    return (
      <input {...inputProps} />
    );
  }
}