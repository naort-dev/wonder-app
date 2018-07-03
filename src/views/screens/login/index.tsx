import React from 'react';
import { View, Text, StyleSheet, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RoundedTextInput } from '../../components/theme';
import ShadowBox from '../../components/theme/shadow-box';
import theme from '../../../assets/styles/theme';

interface Props {
  navigation: any
}

interface State {

}

export default class Login extends React.Component<Props, State> {

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Onboarding 1</Text>
        <RoundedTextInput
          icon="envelope-o"
          placeholder="Email"
        />
        <RoundedTextInput
          icon="lock"
          placeholder="Password"
          type="password"
        />
        <Button
          title="Go to Onboarding"
          onPress={() => navigation.goBack()}
        />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});