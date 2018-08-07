import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from '../theme';
import Activity from '../../../types/activity';
import PricingIndicator from '../pricing-indicator';
import ActivityDetails from '../../../types/activity-details';

interface Props {
  activity: Activity;
  onPress: Function;
}

class ActivityCallout extends React.Component<Props> {
  renderImage = () => {
    const { activity } = this.props;
    if (activity.image_url && activity.image_url.length) {
      return (
        <View flex={2}>
          {<Image source={{ uri: activity.image_url }} style={{ flex: 1 }} />}
        </View>
      );
    }
  }
  render() {
    const { activity, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {this.renderImage()}
        <View flex={3} style={styles.body}>
          <Text style={styles.title}>{activity.name}</Text>
          <Text style={styles.address}>{activity.location.join('\n')}</Text>
          <Text style={styles.address}>{activity.price_level}</Text>
          {/* <Text style={styles.address}>{activity.distance.toFixed(2)}</Text> */}
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
    maxHeight: 100,
    flexDirection: 'row'
  },
  body: {
    paddingHorizontal: 10
  },
  title: {
    fontSize: 12
  },
  address: {
    fontSize: 11
  }
});