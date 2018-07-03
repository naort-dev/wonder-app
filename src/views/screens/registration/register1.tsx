import React from 'react';
import { View, Text, StyleSheet, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from '../../components/theme';
import ShadowBox from '../../components/theme/shadow-box';

interface Props {
  navigation: any
}

interface State {

}

export default class Register1 extends React.Component<Props, State> {

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ShadowBox>
          <Text style={styles.welcome}>Onboarding 1</Text>
          <TextInput label="Education" />
          <Button
            title="Go to Onboarding"
            onPress={() => navigation.goBack()}
          />
        </ShadowBox>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
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