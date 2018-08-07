import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import * as screens from '../screens';
import { appTabNavigatorOptions, headerNavigationOptions } from './navigatorOptions';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: screens.HomeScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: headerNavigationOptions,
  },
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: screens.ProfileScreen,
    },
  },
  {
    initialRouteName: 'Profile',
    navigationOptions: headerNavigationOptions,
  },
);

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: appTabNavigatorOptions.home,
    },
    Perfil: {
      screen: ProfileStack,
      navigationOptions: appTabNavigatorOptions.profile,
    },
  },
  appTabNavigatorOptions.general,
);

const AuthStack = createStackNavigator(
  {
    Login: screens.LoginScreen,
  },
  { initialRouteName: 'Login' },
);

const RootStack = createSwitchNavigator(
  {
    Splash: screens.SplashScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  { initialRouteName: 'Splash' },
);

export { RootStack };
