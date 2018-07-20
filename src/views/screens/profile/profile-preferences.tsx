import React from 'react';
import Screen from '../../components/screen';
import { SubHeader, Text, Toggle, PrimaryButton } from '../../components/theme';
import { View, StyleSheet, ScrollView, Slider } from 'react-native';
import theme from '../../../assets/styles/theme';

class ProfileNotificationsScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Screen>
        <ScrollView>
          <View style={{ paddingHorizontal: 20, flex: 1 }}>
            <View style={styles.heading}>
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

            <View style={styles.heading}>
              <SubHeader>Show Me</SubHeader>
            </View>
            <View style={styles.row}>
              <Text>My Location</Text>
              <Toggle />
            </View>

            <View style={styles.row}>
              <Text>Military Time</Text>
              <Toggle />
            </View>

            <View style={styles.heading}>
              <SubHeader>Show Me</SubHeader>
            </View>
            <View style={styles.row}>
              <Text>Women</Text>
              <Toggle />
            </View>

            <View style={styles.row}>
              <Text>Men</Text>
              <Toggle />
            </View>

            <View style={styles.row}>
              <Text>Activities</Text>
              <Toggle />
            </View>

            <View style={styles.heading}>
              <SubHeader>Age Range</SubHeader>
            </View>
            <View style={styles.row}>
              <Slider
                minimumTrackTintColor={theme.colors.primary}
                style={{ width: '100%' }}
                minimumValue={1}
                maximumValue={50}
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
              <SubHeader>Distance (mi.)</SubHeader>
            </View>
            <View style={styles.row}>
              <Slider
                minimumTrackTintColor={theme.colors.primary}
                style={{ width: '100%' }}
                minimumValue={1}
                maximumValue={50}
                step={1}
              />
            </View>

            <View style={styles.row}>
              <Text>Ghosters</Text>
              <Toggle />
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