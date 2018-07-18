import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, PrimaryButton } from '../../components/theme';
import theme from '../../../assets/styles/theme';
import Screen from '../../components/screen';
import Images, { Logo } from '../../../assets/images';
import TextButton from '../../components/theme/text-button';

interface Props {
  navigation: any;
}

export default class Welcome extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  render() {
    const { navigation } = this.props;
    return (
      <Screen
        backgroundImage={Images.WELCOME}
      >
        <View flex={1} style={styles.header}>
          <Image style={{ width: '80%' }} source={Logo.DARK} resizeMode="contain" />
        </View>
        <View flex={1} style={styles.body}>
          <View style={{ width: '100%' }}>
            <PrimaryButton
              icon="envelope-o"
              title="CREATE ACCOUNT"
              onPress={() => navigation.navigate('Register1')}
              fullWidth
            />
          </View>
          <View style={{ marginTop: 10, width: '100%' }}>
            <Button
              rounded
              color="#3D90F0"
              icon="facebook"
              title="LOGIN WITH FACEBOOK"
              onPress={() => navigation.navigate('Login')}
              fullWidth
            />
          </View>
          <View style={{ marginTop: 10, width: '100%' }}>
            <Button
              rounded
              iconColor={theme.colors.primaryLight}
              icon="google"
              title="LOGIN WITH GOOGLE"
              onPress={() => navigation.navigate('Login')}
              fullWidth
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Text>Already have an account?</Text>
            <TextButton
              style={{ textAlign: 'center', color: theme.colors.primaryLight }}
              text="Sign In"
              onPress={() => navigation.navigate('Login')}
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