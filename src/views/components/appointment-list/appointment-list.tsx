import React from 'react';
import { View, FlatList, FlatListProps, RefreshControl } from 'react-native';
import AppointmentItem from './appointment-item';
import Appointment, { DecoratedAppointment } from '../../../types/appointment';

interface Props {
  data: DecoratedAppointment[];
  onRefresh?: () => void;
  isLoading?: boolean;
}

class AppointmentList extends React.Component<Props> {
  static defaultProps = {
    isLoading: false
  };

  keyExtractor = (item: any, index: number) => item.id.toString();

  renderRow = ({ item }: { item: any }) => {
    return (
      <AppointmentItem
        item={item}
      />
    );
  }

  render() {
    const { data, onRefresh, isLoading } = this.props;
    return (
      <FlatList
        refreshing={isLoading || false}
        onRefresh={onRefresh}
        keyExtractor={this.keyExtractor}
        data={data}
        renderItem={this.renderRow}
      />
    );
  }
}

export default AppointmentList;
