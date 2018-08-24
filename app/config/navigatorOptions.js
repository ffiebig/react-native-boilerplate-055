import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';
import { TabIcon, MainLogo } from '../components';

function TabBarIconWrapper({ focused, tintColor }, iconDefault, iconFocused) {
  return (
    <TabIcon
      iconDefault={iconDefault}
      iconFocused={iconFocused}
      focused={focused}
      tintColor={tintColor}
    />
  );
}

const headerNavigationOptions = {
  headerTitle: (
    <MainLogo
      extraStyle={{
        width: 55,
        marginTop: 0,
        height: 30,
        alignSelf: 'center',
        flex: 1,
      }}
    />
  ),
  headerStyle: {
    backgroundColor: EStyleSheet.value('$backgroundColor'),
  },
};

const appTabNavigatorOptions = {
  general: {
    tabBarOptions: {
      inactiveTintColor: EStyleSheet.value('$dark'),
      activeTintColor: EStyleSheet.value('$primary'),
      showLabel: true,
      style: {
        backgroundColor: EStyleSheet.value('$backgroundColor'),
      },
    },
  },
  home: {
    tabBarLabel: 'HOME',
    tabBarIcon: ({ focused, tintColor }) =>
      TabBarIconWrapper({ focused, tintColor }, styles.homeDefault, styles.homeFocused),
  },
  profile: {
    tabBarLabel: 'PROFILE',
    tabBarIcon: ({ focused, tintColor }) =>
      TabBarIconWrapper({ focused, tintColor }, styles.otherDefault, styles.otherFocused),
  },
};

TabBarIconWrapper.propTypes = {
  focused: PropTypes.bool.isRequired,
  tintColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export { appTabNavigatorOptions, headerNavigationOptions };
