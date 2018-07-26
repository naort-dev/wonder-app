import React from 'react';
import { View, StyleSheet, Alert, Geolocation } from 'react-native';
import { TextInput, Text, GenderPicker, PrimaryButton, DatePicker } from '../../components/theme';
import ShadowBox from '../../components/theme/shadow-box';
import Screen from '../../components/screen';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import Gender from '../../../types/gender';
import moment from 'moment-timezone';
import validator from 'validator';
import { connect } from 'react-redux';
import WonderAppState from '../../../types/wonder-app-state';
import { Dispatch } from 'redux';
import { persistRegistrationInfo } from '../../../store/reducers/registration';
import googleMaps, { GoogleGeoLocation } from '../../../services/google-maps';

interface Props {
  onSave: Function;
  navigation: NavigationScreenProp<any, NavigationParams>;
}

interface StateErrors {
  gender?: string;
  birthdate?: string;
  education?: string;
  occupation?: string;
  location?: string;
}

interface State {
  gender: Gender;
  birthdate: Date;
  education: string;
  occupation: string;
  location: string;
  geolocation: GoogleGeoLocation | null;
  errors: StateErrors;
}

const mapState = (state: WonderAppState) => ({});
const mapDispatch = (dispatch: Dispatch) => ({
  onSave: (data: State) => dispatch(persistRegistrationInfo(data))
});

class Register2 extends React.Component<Props, State> {

  private eighteenYearsAgoToday = moment().subtract(18, 'years').startOf('day');

  state: State = {
    gender: Gender.male,
    birthdate: this.eighteenYearsAgoToday.toDate(),
    education: '',
    occupation: '',
    location: '',
    geolocation: null,
    errors: {}
  };

  lookupLocation = async () => {
    const { location } = this.state;
    if (!validator.isEmpty(location) && validator.isPostalCode(location, 'US')) {
      const geolocation: GoogleGeoLocation = await googleMaps.geocodeByZipCode(location);
      this.setState({ geolocation });
    } else {
      this.setState({ geolocation: null });
    }
  }

  formattedGeo = () => {
    const {geolocation} = this.state;
    if (geolocation) {
      return ` (${geolocation.city}, ${geolocation.state})`;
    }
    return '';
  }

  public render() {
    const { errors, birthdate, geolocation } = this.state;

    return (
      <Screen horizontalPadding={20}>
        <Text style={styles.welcome}>Tell us a little more about yourself</Text>
        <GenderPicker onChange={(gender: Gender) => this.onChangeText('gender')(gender)} />
        <DatePicker
          errorHint={errors.birthdate}
          label="BIRTHDAY"
          placeholder="Select Date"
          onChange={this.onDateChange}
          initialDate={birthdate}
          minDate={new Date('1950-01-01')}
          maxDate={this.eighteenYearsAgoToday.toDate()}
        />
        <TextInput
          label="EDUCATION"
          errorHint={errors.education}
          autoCorrect={false}
          autoCapitalize="words"
          onChangeText={this.onChangeText('education')}
        />
        <TextInput
          label="OCCUPATION"
          errorHint={errors.occupation}
          autoCorrect={false}
          autoCapitalize="words"
          onChangeText={this.onChangeText('occupation')}
        />
        <TextInput
          keyboardType="number-pad"
          label={`ZIP CODE${this.formattedGeo()}`}
          errorHint={errors.location}
          autoCorrect={false}
          autoCapitalize="words"
          onChangeText={this.onChangeText('location')}
          onBlur={this.lookupLocation}
        />
        <View style={{ marginTop: 10 }}>
          <PrimaryButton
            title="Next"
            onPress={this.validate}
          />
        </View>
      </Screen>
    );
  }

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
    const { navigation, onSave } = this.props;
    const { gender, education, occupation, birthdate, location } = this.state;

    if (GenderPicker.Genders.indexOf(gender) < 0) {
      errors.gender = 'Please select a gender';
    }

    if (!birthdate) {
      errors.birthdate = "Please enter your birthday";
    } else if (moment(birthdate).isAfter(this.eighteenYearsAgoToday)) {
      errors.birthdate = 'You are not old enough to use this app';
    }

    if (validator.isEmpty(education)) {
      errors.education = 'Please enter where you went to school';
    }

    if (validator.isEmpty(occupation)) {
      errors.occupation = 'Please enter your occupation';
    }

    if (validator.isEmpty(location)) {
      errors.location = 'Please enter a Postal Code';
    } else if (!validator.isPostalCode(location, 'US')) {
      errors.location = 'Please enter a valid Postal Code';
    }

    if (Object.keys(errors).length) {
      this.setState({ errors });
      return;
    }

    onSave({ gender, education, occupation, birthdate: birthdate.toISOString().split('T')[0] });
    navigation.navigate('Register3');
  }
}

export default connect(mapState, mapDispatch)(Register2);

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
