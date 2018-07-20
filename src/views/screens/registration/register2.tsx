import React from 'react';
import { View, StyleSheet, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, Text, GenderPicker, PrimaryButton, DatePicker } from '../../components/theme';
import ShadowBox from '../../components/theme/shadow-box';
import Screen from '../../components/screen';
import Theme from '../../../assets/styles/theme';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import Gender from '../../../types/gender';
import moment from 'moment-timezone';
import validator from 'validator';

interface Props {
  navigation: NavigationScreenProp<any, NavigationParams>;
}

interface StateErrors {
  gender?: string;
  birthdate?: string;
  education?: string;
  occupation?: string;
}

interface State {
  gender: Gender;
  birthdate: Date;
  education: string;
  occupation: string;
  errors: StateErrors;
}

export default class Register2 extends React.Component<Props, State> {

  public state: State = {
    gender: Gender.male,
    birthdate: new Date(),
    education: '',
    occupation: '',
    errors: {}
  };

  public render() {
    const { navigation } = this.props;
    const { errors } = this.state;

    return (
      <Screen horizontalPadding={20}>
        <ShadowBox>
          <Text style={styles.welcome}>Tell us a little more about yourself</Text>
          <GenderPicker onChange={(gender: Gender) => alert(gender)} />
          <DatePicker
            errorHint={errors.birthdate}
            label="BIRTHDAY"
            placeholder="Select Date"
            onChange={this.onDateChange}
            initialDate={this.eighteenYearsAgoToday.toDate()}
            minDate={new Date('1950-01-01')}
            maxDate={this.eighteenYearsAgoToday.toDate()}
          />
          <TextInput
            label="EDUCATION"
            errorHint={errors.education}
          />
          <TextInput
            label="OCCUPATION"
            errorHint={errors.occupation}
          />
          <View style={{ marginTop: 10 }}>
            <PrimaryButton
              title="Next"
              onPress={this.validate}
            />
          </View>
        </ShadowBox>
      </Screen>
    );
  }

  private eighteenYearsAgoToday = moment().subtract(18, 'years').startOf('day');

  private onDateChange = (date: Date) => {
    this.setState({ birthdate: date });
  }

  private onChangeText = (key: string) => {
    const { errors } = this.state;
    return (text: string) => {
      this.setState({
        [key]: text,
        errors: {
          ...errors,
          [key]: undefined
        }
      });
    }
  }

  private validate = () => {
    const errors: StateErrors = {};
    const { navigation } = this.props;
    const { gender, education, occupation, birthdate } = this.state;

    if (GenderPicker.Genders.indexOf(gender) < 0) {
      errors.gender = 'Please select a gender';
    }

    if (!birthdate) {
      errors.birthdate = "Please enter your birthday"
    } else if (moment(birthdate).isAfter(this.eighteenYearsAgoToday)) {
      errors.birthdate = 'You are not old enough to use this app'
    }

    if (validator.isEmpty(education)) {
      errors.education = 'Please enter where you went to school';
    }

    if (validator.isEmpty(occupation)) {
      errors.occupation = 'Please enter your occupation';
    }

    if (Object.keys(errors).length) {
      this.setState({ errors });
      return;
    }

    navigation.navigate('Register3');
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