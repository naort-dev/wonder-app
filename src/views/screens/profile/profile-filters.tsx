import React from 'react';
import Screen from '../../components/screen';
import { SubHeader, Text, Toggle, PrimaryButton } from '../../components/theme';
import { View, StyleSheet, ScrollView, Slider } from 'react-native';
import theme from '../../../assets/styles/theme';
import RangeSlider from 'react-native-range-slider';

interface Props {
  navigation: object
}

class ProfileFiltersScreen extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <Screen>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <View>
            <SubHeader>Device Settings</SubHeader>
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
            <RangeSlider
              minValue={0}
              maxValue={100}
              handleColor={theme.colors.primary}
              tintColor={theme.colors.textColor}
              tintColorBetweenHandles={theme.colors.primaryLight}
              selectedMinimum={18}
              selectedMaximum={24}
              style={{ flex: 1, height: 70 }}
              onChange={(data) => { console.log(data); }}
            />
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
        </ScrollView>
        <View>
          <PrimaryButton
            rounded={false}
            title="Save"
            onPress={() => navigation.goBack()}
          />
        </View>
      </Screen >
    )
  }
}

export default ProfileFiltersScreen;

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