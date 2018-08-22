/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import { clearNotice } from '../../actions/notice';
import DropdownAlert from 'react-native-dropdownalert';
import { connect } from 'react-redux';

class AlertProvider extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  static get childContextTypes() {
    return {
      alertWithType: PropTypes.func,
      alert: PropTypes.func,
    };
  }

  static get propTypes() {
    return {
      children: PropTypes.any,
    };
  }

  getChildContext() {
    return {
      alert: (...args) => this.dropdown.alert(...args),
      alertWithType: (...args) => {
        this.props.dispatch(clearNotice());
        this.dropdown.alertWithType(...args);
      },
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
        <DropdownAlert
          defaultContainer={{
            padding: 8,
            paddingTop: StatusBar.currentHeight,
            flexDirection: 'row',
          }}
          ref={(ref) => {
            this.dropdown = ref;
          }}
        />
      </View>
    );
  }
}

export default connect()(AlertProvider);
