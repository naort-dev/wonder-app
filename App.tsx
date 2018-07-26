/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import './ReactotronConfig';
import NavigatorService from './src/services/navigation';
import React, { Component } from 'react';
import {
  Alert
} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import AppRouter from './src/views/router';

// Allow access to navigation in sagas
export let navigatorRef: any;

const { store, persistor } = configureStore();
export default class App extends Component {
  navigatorRef: any;

  componentDidMount() {
    navigatorRef = this.navigatorRef;
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter ref={(nav: any) => { NavigatorService.setContainer(nav); }} />
        </PersistGate>
      </Provider>

    );
  }
}
