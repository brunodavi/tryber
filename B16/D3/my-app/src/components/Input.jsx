import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/Input.css';

class Input extends Component {
  constructor() {
    super();

    this.state = {
      wrong: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { regex, message } = this.props;
    const { value } = target;

    if (!regex.test(value)) {
      this.setState({ wrong: message });
      target.classList.remove('b-green');
      target.classList.add('b-red');
    } else {
      this.setState({ wrong: '' });
      target.classList.remove('b-red');
      target.classList.add('b-green');
    }

    const g = document.querySelectorAll('.b-green').length
    const i = document.querySelectorAll('.Input').length
    const b = document.querySelector('#disabled');
    
    if (g === i) {
      b.disabled = false
    } else {
      b.disabled = true
    }
  }

  genId() {
    return "ID" + Math.random().toString(16).slice(2)
  }

  render() {
    const { label, type } = this.props;
    const { wrong } = this.state;
    const ID = this.genId();
    return (
      <div>
        <label htmlFor={ ID } className="Label">
          {label}
          <input
            onBlur={this.handleChange}
            className="Input"
            type={type}
            id={ ID }
          />
          <div className="wrong">{wrong}</div>
        </label>
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  regex: PropTypes.shape({
    test: PropTypes.func,
  }).isRequired,
};

export default Input;