import React from 'react';
import { DeckSwiper } from 'native-base';
import { Text } from '../theme';
import { View, StyleSheet } from 'react-native';
import Proposal from '../../../types/proposal';

interface Props {
  proposals: Proposal[];
}

class ProposalSwiper extends React.Component<Props> {

  renderCard = (item: Proposal) => {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    )
  }

  render() {
    const { proposals } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <DeckSwiper
          style={{ flex: 1 }}
          onSwipeLeft={undefined}
          onSwipeRight={undefined}
          dataSource={proposals}
          renderItem={this.renderCard}
        />
      </View>
    );
  }
}

export default ProposalSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD'
  }
});