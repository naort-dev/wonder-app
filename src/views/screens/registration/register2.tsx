import React from 'react';
import { View, StyleSheet, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Text, GenderPicker, PrimaryButton, DatePicker } from '../../components/theme';
import ShadowBox from '../../components/theme/shadow-box';
import Screen from '../../components/screen';
import Theme from '../../../assets/styles/theme';

interface Props {
  navigation: any;
}

interface State {

}

export default class Register2 extends React.Component<Props, State> {

  onDateChange = (date: Date) => {
    alert(date)
  }

  render() {
    const { navigation } = this.props;

    return (
      <Screen horizontalPadding={20}>
        <Text color="#FBAF5D" style={{ textAlign: 'center', fontSize: 18 }}>Hello</Text>
        <ShadowBox>

          <Text style={styles.welcome}>Tell us a little more about yourself</Text>
          <GenderPicker />
          <DatePicker
            label="BIRTHDAY"
            placeholder="Select Date"
            onChange={this.onDateChange}
          />
          <TextInput label="EDUCATION" />
          <TextInput label="OCCUPATION" />
          <View style={{ marginTop: 10 }}>
            <PrimaryButton
              title="Next"
              onPress={() => navigation.navigate('Register3')}
            />
          </View>
        </ShadowBox>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});