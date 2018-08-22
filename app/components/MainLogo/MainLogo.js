import React from 'react';
import { Image, ViewPropTypes } from 'react-native';
import styles from './styles';

const MainLogo = ({ extraStyle }) => (
  <Image resizeMode="contain" style={[styles.logo, extraStyle]} source={require('./logo.png')} />
);

MainLogo.propTypes = {
  extraStyle: ViewPropTypes.style,
};

MainLogo.defaultProps = {
  extraStyle: {},
};

export default MainLogo;
