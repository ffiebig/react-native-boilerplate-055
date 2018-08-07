import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const DefaultButton = ({
  title, containerStyles, textStyles, disabled, ...props
}) => (
  <TouchableOpacity
    style={[disabled ? styles.buttonContainerDisabled : styles.buttonContainer, containerStyles]}
    activeOpacity={disabled ? 1 : 0.7}
    disabled={disabled}
    {...props}
  >
    <Text style={[styles.buttonText, textStyles]}>{title}</Text>
  </TouchableOpacity>
);

DefaultButton.defaultProps = {
  title: 'Button',
  containerStyles: {},
  textStyles: {},
  disabled: false,
};

export default DefaultButton;
