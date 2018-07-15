import React from 'react';
import { View, FlatList } from 'react-native';
import AppointmentItem from './appointment-item';

interface Props {
  data: any[]
}

class AppointmentList extends React.Component<Props> {
  keyExtractor = (item: any, index: number) => index.toString()

  renderRow = ({ item }: { item: any }) => {
    return (
      <AppointmentItem item={item} />
    );
  }

  render() {
    const { data } = this.props;
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={data}
        renderItem={this.renderRow}
      />
    );
  }
}

export default AppointmentList;