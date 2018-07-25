/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import './ReactotronConfig';
import NavigatorService from './src/services/navigation';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import AppRouter from './src/views/router';

interface Props { }
interface State { }

// Allow access to navigation in sagas
export let navigatorRef: any;

const { store, persistor } = configureStore();
export default class App extends Component<Props, State> {
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

