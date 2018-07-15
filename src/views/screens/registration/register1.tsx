import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import { Text, RoundedButton, RoundedTextInput, PrimaryButton } from '../../components/theme';
import theme from '../../../assets/styles/theme';
import Screen from '../../components/screen';
import Images, { Logo } from '../../../assets/images';
import TextButton from '../../components/theme/text-button';
import Theme from '../../../assets/styles/theme';

interface Props {
  navigation: any;
}

export default class Register1 extends React.Component<Props> {

  static navigationOptions = {
    title: 'CREATE ACCOUNT',
    ...Theme.NavBar.transparent
  }

  render() {
    const { navigation } = this.props;
    return (
      <Screen style={{ backgroundColor: '#FFF' }}>
        <View style={styles.header}>
          <Image style={{ width: '80%' }} source={Logo.DARK} resizeMode="contain" />
        </View>
        <View style={styles.body}>
          <View style={{ width: '100%' }}>
            <RoundedTextInput
              icon="user"
              placeholder="First Name"
              onPress={() => { }}
              fullWidth
            />
          </View>
          <View style={{ marginTop: 10, width: '100%' }}>
            <RoundedTextInput
              icon="user"
              placeholder="Last Name"
              onPress={() => { }}
              fullWidth
            />
          </View>
          <View style={{ marginTop: 10, width: '100%' }}>
            <RoundedTextInput
              icon="envelope-o"
              placeholder="Email"
              onPress={() => { }}
              fullWidth
            />
          </View>
          <View style={{ marginTop: 10, width: '100%' }}>
            <RoundedTextInput
              icon="phone"
              placeholder="Mobile Number"
              onPress={() => { }}
              fullWidth
            />
          </View>
          <View style={{ marginTop: 10, width: '50%' }}>
            <PrimaryButton
              title="Next"
              onPress={() => navigation.navigate('Register2')}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  body: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  }
});