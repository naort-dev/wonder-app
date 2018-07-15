import React from 'react';
import Screen from '../../components/screen';
import { SubHeader, Text, Toggle, PrimaryButton } from '../../components/theme';
import { View, StyleSheet, ScrollView, Slider } from 'react-native';
import theme from '../../../assets/styles/theme';
import RangeSlider from 'react-native-range-slider';

class ProfileNotificationsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Screen>
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <View>
            <SubHeader>Notifications</SubHeader>
          </View>
          <View style={styles.row}>
            <Text>New Matches</Text>
            <Toggle />
          </View>

          <View style={styles.row}>
            <Text>Messages</Text>
            <Toggle />
          </View>

          <View style={styles.row}>
            <Text>Activities</Text>
            <Toggle />
          </View>

          <View style={styles.row}>
            <Text>Products &amp; Services</Text>
            <Toggle />
          </View>
        </View>
        <View>
            <PrimaryButton
              rounded={false}
              title="Save"
              onPress={() => navigation.goBack()}
            />
          </View>
      </Screen>
    )
  }
}

export default ProfileNotificationsScreen;

const styles = StyleSheet.create({
  row: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
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