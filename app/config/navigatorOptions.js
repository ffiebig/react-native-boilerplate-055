import React from 'react';
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
    tabBarIcon: ({ focused, tintColor }) => (
      <TabIcon
        iconDefault={styles.homeDefault}
        iconFocused={styles.homeFocused}
        focused={focused}
        tintColor={tintColor}
      />
    ),
  },
  profile: {
    tabBarLabel: 'PROFILE',
    tabBarIcon: ({ focused, tintColor }) => (
      <TabIcon
        iconDefault={styles.otherDefault}
        iconFocused={styles.otherFocused}
        focused={focused}
        tintColor={tintColor}
      />
    ),
  },
};

export { appTabNavigatorOptions, headerNavigationOptions };
