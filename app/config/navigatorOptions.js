import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TabIcon, MainLogo } from '../components';

const styles = EStyleSheet.create({
  '@media ios': {
    headerLogoPaddingVertical: 10,
    homeDefault: 'ios-home',
    homeFocused: 'ios-home',
    otherDefault: 'ios-person',
    otherFocused: 'ios-person',
  },
  '@media android': {
    headerLogoPaddingVertical: 15,
    homeDefault: 'md-home',
    homeFocused: 'md-home',
    otherDefault: 'md-person',
    otherFocused: 'md-person',
  },
});

function TabBarIcon({ focused, tintColor }, iconDefault, iconFocused) {
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
    tabBarIcon: TabBarIcon(styles.homeDefault, styles.homeFocused),
  },
  profile: {
    tabBarLabel: 'PROFILE',
    tabBarIcon: TabBarIcon(styles.otherDefault, styles.otherFocused),
  },
};

TabBarIcon.propTypes = {
  focused: PropTypes.bool,
  tintColor: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

TabBarIcon.defaultProps = {
  focused: false,
  tintColor: EStyleSheet.value('$primary'),
};

export { appTabNavigatorOptions, headerNavigationOptions };
