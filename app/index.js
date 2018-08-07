import React from 'react';
import './assets/styles/application';
import { StatusBar } from 'react-native';
import { RootStack } from './config/routes';
import { Provider } from 'react-redux';
import { AlertProvider } from './components';
import store from './config/store';

export default () => ({
  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Provider store={store}>
        <AlertProvider>
          <RootStack />
        </AlertProvider>
      </Provider>
    );
  },
});
