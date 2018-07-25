import React from 'react';
import Screen from '../../components/screen';
import { SubHeader, Text, Toggle, PrimaryButton } from '../../components/theme';
import { View, StyleSheet, ScrollView, Slider } from 'react-native';
import theme from '../../../assets/styles/theme';
import DistanceUnit from '../../../types/distance-unit';
import User from '../../../types/user';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { connect } from 'react-redux';
import WonderAppState from '../../../types/wonder-app-state';
import { Dispatch } from 'redux';
import { updateUser } from '../../../store/sagas/user';

const mapState = (state: WonderAppState) => ({
  profile: state.user.profile
});

const mapDispatch = (dispatch: Dispatch) => ({
  onSave: (profile: Partial<User>) => dispatch(updateUser(profile))
});

interface Props {
  navigation: NavigationScreenProp<any, NavigationParams>;
  profile: User;
}

interface State {
  distance_of_interest_min?: number;
  distance_of_interest_max?: number;
  age_of_interest_min?: number;
  age_of_interest_max?: number;
  male_interest?: boolean;
  female_interest?: boolean;
  available?: boolean;
  show_flakers?: boolean;
  show_ghosters?: boolean;
  show_fibbers?: boolean;
  show_location?: boolean;
  military_time?: boolean;
  distance_unit?: DistanceUnit;
  apn_new_matches?: boolean;
  apn_new_messages?: boolean;
  apn_message_likes?: boolean;
  apn_message_super_likes?: boolean;
  geocoding_requested?: boolean;
}

class ProfileNotificationsScreen extends React.Component<Props, State> {
  static defaultProps = {
    profile: {}
  };

  constructor(props: Props) {
    super(props);
    this.state = this.loadProfile(props.profile);
  }

  loadProfile = (profile: User): State => ({
    distance_of_interest_min: 0,
    distance_of_interest_max: profile.distance_of_interest_max || 0,
    age_of_interest_min: profile.age_of_interest_min || 18,
    age_of_interest_max: profile.age_of_interest_max || 24,
    male_interest: profile.male_interest,
    female_interest: profile.female_interest,
    available: profile.available,
    show_flakers: profile.show_flakers,
    show_ghosters: profile.show_ghosters,
    show_fibbers: profile.show_fibbers,
    show_location: profile.show_location,
    military_time: profile.military_time,
    distance_unit: profile.distance_unit || DistanceUnit.miles,
    apn_new_matches: profile.apn_new_matches,
    apn_new_messages: profile.apn_new_messages,
    apn_message_likes: profile.apn_message_likes,
    apn_message_super_likes: profile.apn_message_super_likes,
    geocoding_requested: profile.geocoding_requested
  })

  onNumberChange = (key: string) => {
    return (value: number) => {
      this.setState({
        [key]: value
      });
    };
  }

  onBooleanChange = (key: string) => {
    return (value: boolean) => {
      this.setState({
        [key]: value
      });
    };
  }

  onChangeUnit = (key: string) => {
    return (value: boolean) => {
      this.setState({
        [key]: value ? DistanceUnit.miles : DistanceUnit.kilometers
      });
    };
  }

  render() {
    const { navigation } = this.props;
    const {
      distance_of_interest_min,
      distance_of_interest_max,
      age_of_interest_min,
      age_of_interest_max,
      male_interest,
      female_interest,
      available,
      show_flakers,
      show_ghosters,
      show_fibbers,
      show_location,
      military_time,
      distance_unit,
      apn_new_matches,
      apn_new_messages,
      apn_message_likes,
      apn_message_super_likes,
      geocoding_requested
    } = this.state;

    return (
      <Screen>
        <ScrollView>
          <View style={{ paddingHorizontal: 20, flex: 1 }}>
            <View style={styles.heading}>
              <SubHeader>Notifications</SubHeader>
            </View>
            <View style={styles.row}>
              <Text>New Matches</Text>
              <Toggle
                value={apn_new_matches}
                onValueChange={this.onBooleanChange('apn_new_matches')}
              />
            </View>

            <View style={styles.row}>
              <Text>Messages</Text>
              <Toggle
                value={apn_new_messages}
                onValueChange={this.onBooleanChange('apn_new_messages')}
              />
            </View>

            <View style={styles.row}>
              <Text>Activities</Text>
              <Toggle
              // value={true}
              // onValueChange={this.onBooleanChange('apn_activities')}
              />
            </View>

            <View style={styles.row}>
              <Text>Products &amp; Services</Text>
              <Toggle
              // value={true}
              // onValueChange={this.onBooleanChange('apn_activities')}
              />
            </View>

            <View style={styles.heading}>
              <SubHeader>Settings</SubHeader>
            </View>
            <View style={styles.row}>
              <Text>My Location</Text>
              <Toggle
                value={show_location}
                onValueChange={this.onBooleanChange('show_location')}
              />
            </View>

            <View style={styles.row}>
              <Text>Military Time</Text>
              <Toggle
                value={military_time}
                onValueChange={this.onBooleanChange('military_time')}
              />
            </View>

            <View style={styles.row}>
              <Text>Units ({distance_unit})</Text>
              <Toggle
                value={distance_unit === DistanceUnit.miles}
                onValueChange={this.onChangeUnit('distance_unit')}
              />
            </View>

            <View style={styles.heading}>
              <SubHeader>Interests</SubHeader>
            </View>
            <View style={styles.row}>
              <Text>Women</Text>
              <Toggle
                value={female_interest}
                onValueChange={this.onBooleanChange('female_interest')}
              />
            </View>

            <View style={styles.row}>
              <Text>Men</Text>
              <Toggle
                value={male_interest}
                onValueChange={this.onBooleanChange('male_interest')}
              />
            </View>

            <View style={styles.row}>
              <Text>Activity Partner</Text>
              <Toggle />
            </View>

            <View style={styles.heading}>
              <SubHeader>Age Range ({age_of_interest_max})</SubHeader>
            </View>
            <View style={styles.row}>
              <Slider
                onValueChange={this.onNumberChange('age_of_interest_max')}
                minimumTrackTintColor={theme.colors.primary}
                style={{ width: '100%' }}
                minimumValue={18}
                maximumValue={80}
                value={age_of_interest_max}
                step={1}
              />
              {/* <RangeSlider
              minValue={0}
              maxValue={100}
              handleColor={theme.colors.primary}
              tintColor={theme.colors.textColor}
              tintColorBetweenHandles={theme.colors.primaryLight}
              selectedMinimum={18}
              selectedMaximum={24}
              style={{ flex: 1, height: 70 }}
              onChange={(data) => { console.log(data); }}
            /> */}
            </View>


            <View style={styles.heading}>
              <SubHeader>Distance (mi.) - {distance_of_interest_max}</SubHeader>
            </View>
            <View style={styles.row}>
              <Slider
                onValueChange={this.onNumberChange('distance_of_interest_max')}
                minimumTrackTintColor={theme.colors.primary}
                style={{ width: '100%' }}
                value={distance_of_interest_max}
                minimumValue={1}
                maximumValue={50}
                step={1}
              />
            </View>

            <View style={styles.row}>
              <Text>Ghosters</Text>
              <Toggle
                value={show_ghosters}
                onValueChange={this.onBooleanChange('show_ghosters')}
              />
            </View>
          </View>
        </ScrollView>
        <View>
          <PrimaryButton
            rounded={false}
            title="Save"
            onPress={() => navigation.goBack()}
          />
        </View>
      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(ProfileNotificationsScreen);

const styles = StyleSheet.create({
  row: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 5
    },
    marginVertical: 5
  },
  heading: {
    marginTop: 15
  }
});