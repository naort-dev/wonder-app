import React from 'react';
import { Text } from '../theme';
import { View, StyleSheet } from 'react-native';

interface ChatListItemProps {
  chat: any;
}

class ChatListItem extends React.Component<ChatListItemProps> {


  render() {
    const { chat } = this.props;
    return (
      <View>
        <Text>Chat</Text>
      </View>
    );
  }
}

export default ChatListItem;
