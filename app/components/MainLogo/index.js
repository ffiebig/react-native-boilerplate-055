import React from 'react';
import { Image } from 'react-native';
import styles from './styles';

const MainLogo = ({ extraStyle }) => (
  <Image
    resizeMode="contain"
    style={[styles.logo, extraStyle]}
    source={require('./logo.png')}
  />
);

MainLogo.defaultProps = {
  extraStyle: {},
};

export default MainLogo;
