import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Title } from '../theme';
import { ChatListItem } from '.';

interface ChatListProps {
  chats?: any[];
}

class ChatList extends React.Component<ChatListProps> {
  static defaultProps = {
    chats: []
  };

  keyExtractor = (item: any, index) => {
    return index;
  }

  renderItem = ({ item: chat }: { item: any }) => <ChatListItem chat={chat} />;

  renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Title>No Chats</Title>
      </View>
    );
  }

  render() {
    const { chats } = this.props;
    if (!chats || chats.length) {
      return (
        <FlatList
          data={chats}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      );
    }
    return this.renderEmpty();
  }
}

export default ChatList;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1
  }
});

