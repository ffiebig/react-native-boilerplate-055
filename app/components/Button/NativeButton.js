import React from 'react';
import { Button } from 'react-native';
import PropTypes from 'prop-types';

const NativeButton = ({ title, color, ...props }) => (
  <Button title={title} color={color} {...props} />
);

NativeButton.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
};

NativeButton.defaultProps = {
  color: 'cornflowerblue',
  title: 'Button',
};

export default NativeButton;
