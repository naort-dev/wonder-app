import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import { Text, RoundedButton, RoundedTextInput, PrimaryButton } from '../../components/theme';
import theme from '../../../assets/styles/theme';
import Screen from '../../components/screen';
import Images, { Logo } from '../../../assets/images';
import TextButton from '../../components/theme/text-button';

interface Props {
  navigation: any;
}

export default class Login extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <Screen style={{ backgroundColor: '#FFF' }}>
        <View flex={1} style={styles.header}>
          <Image style={{ width: '80%' }} source={Logo.DARK} resizeMode="contain" />
        </View>
        <View flex={1} style={styles.body}>
          <View style={{ width: '100%' }}>
            <RoundedTextInput
              icon="envelope-o"
              placeholder="Email"
              onPress={() => { }}
              fullWidth
            />
          </View>
          <View style={{ marginTop: 10, width: '100%' }}>
            <RoundedTextInput
              icon="lock"
              placeholder="Password"
              onPress={() => { }}
              fullWidth
            />
          </View>
          <View style={{ marginTop: 10, width: '50%' }}>
            <PrimaryButton
              title="Login"
              onPress={() => navigation.navigate('Main')}
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Text>Need an account?</Text>
            <TextButton
              style={{ textAlign: 'center', color: theme.colors.primaryLight }}
              text="Register"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  }
});