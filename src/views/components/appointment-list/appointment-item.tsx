import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Title, SubTitle, SmallText, Strong } from '../theme';
import Appointment from '../../../types/appointment';
import moment from 'moment-timezone';

interface Props {
  item: Appointment
}

class AppointmentItem extends React.Component<Props> {
  renderTitle = () => {
    const { item } = this.props;
    const { name, users, event_at } = item;
    const now = moment();
    if (event_at.isSameOrAfter(now)) {
      return (
        <Title>{name} at <Strong>{event_at.format('h:mma')}</Strong> with {users[0].first_name}</Title>
      )
    }
    return (
      <Title>{name} with {users[0].first_name}</Title>
    );
  }
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.imageContainer}>
          <Text>Image</Text>
        </View>
        <View style={styles.contentContainer}>
          {this.renderTitle()}
          <SubTitle>{item.event_at.format('Do, MMMM YYYY')}</SubTitle>
          <SmallText>{item.location}</SmallText>
        </View>
      </TouchableOpacity>
    )
  }
}

export default AppointmentItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center'
  }
});