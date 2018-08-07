import React, { Component } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

class Input extends Component {
  static propTypes = {
    placeholderTextColor: PropTypes.string,
    underlineColorAndroid: PropTypes.string,
    reference: PropTypes.func,
  };

  static defaultProps = {
    placeholderTextColor: 'rgba(0,0,0,0.7)',
    underlineColorAndroid: 'rgba(0,0,0,0)',
    reference: null,
  };

  render() {
    return (
      <TextInput
        ref={this.props.reference}
        style={styles.input}
        placeholderTextColor={this.props.placeholderTextColor}
        underlineColorAndroid={this.props.underlineColorAndroid}
        {...this.props}
      />
    );
  }
}

export default Input;
