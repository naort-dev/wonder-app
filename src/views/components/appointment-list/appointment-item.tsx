import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Title, SubTitle, SmallText, Strong, IconButton } from '../theme';
import { DecoratedAppointment } from '../../../types/appointment';
import moment from 'moment-timezone';
import Avatar, { AvatarSize } from '../theme/avatar';
import theme from '../../../assets/styles/theme';

interface Props {
  item: DecoratedAppointment;
}

class AppointmentItem extends React.Component<Props> {
  getMatchedUser = () => {
    const { item } = this.props;

  }

  renderTitle = () => {
    const { item } = this.props;
    const { name, users, event_at, match } = item;
    const now = moment();
    if (moment(event_at).isSameOrAfter(now)) {
      return (
        <Title>{name} at <Strong>{moment(event_at).format('h:mma')}</Strong> with {match.first_name}</Title>
      );
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
          <Avatar
            circle
            uri={item.match.images.length ? item.match.images[0].url : null}
            size={AvatarSize.md}
          />
          <SmallText style={{ marginTop: 10 }}>Leave Review</SmallText>
        </View>
        <View style={styles.contentContainer}>
          {this.renderTitle()}
          <SubTitle>{moment(item.event_at).format('Do, MMMM YYYY')}</SubTitle>
          <SmallText>{item.location}</SmallText>
          <IconButton icon="comments" size={24} iconSize={24} primary={theme.colors.primaryLight} secondary="transparent" />
        </View>
      </TouchableOpacity>
    );
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
    paddingRight: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center'
  }
});