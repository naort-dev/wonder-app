import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../theme';
import Activity from '../../../types/activity';
import PricingIndicator from '../pricing-indicator';
import ActivityDetails from '../../../types/activity-details';

interface Props {
  activity: ActivityDetails;
  onPress: Function;
}

class ActivityCallout extends React.Component<Props> {
  render() {
    const { activity, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View flex={2} />
        <View flex={3}>
          <Text style={styles.title}>{activity.name}</Text>
          <Text style={styles.address}>{activity.location.join('\n')}</Text>
          <Text style={styles.address}>{activity.price_level}</Text>
          <Text style={styles.address}>{activity.distance.toFixed(2)}</Text>
          <PricingIndicator rating={activity.price_level} />
        </View>
      </TouchableOpacity>
    );
  }
}

export default ActivityCallout;

const styles = StyleSheet.create({
  container: {
    width: 250,
    flexDirection: 'row'
  },
  title: {
    fontSize: 12
  },
  address: {
    fontSize: 11
  }
});