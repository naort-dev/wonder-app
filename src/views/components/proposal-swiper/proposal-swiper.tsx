import React from 'react';
import { DeckSwiper } from 'native-base';
import { Text, Title } from '../theme';
import { View, StyleSheet } from 'react-native';
import Proposal from '../../../types/proposal';

interface Props {
  proposal: Proposal | null;
  onSwipeLeft: Function;
  onSwipeRight: Function;
}

class ProposalSwiper extends React.Component<Props> {

  renderCard = (item: Proposal) => {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(item, null, 2)}</Text>
      </View>
    );
  }

  render() {
    const { proposal, onSwipeLeft, onSwipeRight } = this.props;
    const data = [proposal];
    if (proposal) {
      return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <DeckSwiper
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            dataSource={data}
            renderItem={this.renderCard}
          />
        </View>
      );
    }
    return (
      <View style={styles.noMatchesContainer}>
        <Title style={[styles.messageText, styles.titleText]}>Looks like you&apos;re out of people...</Title>
        <Text style={styles.messageText}>Check back soon!</Text>
      </View>
    );
  }
}

export default ProposalSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD'
  },
  noMatchesContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  titleText: {
    fontSize: 24
  },
  messageText: {
    textAlign: 'center'
  }
});
