import React from 'react';
import Screen from '../../components/screen';
import { ChatList } from '../../components/chat';
import { Title } from '../../components/theme';

class ChatListScreen extends React.Component {
  render() {
    return (
      <Screen>
        <Title>Latest Matches</Title>
        <ChatList />
      </Screen>
    );
  }
}

export default ChatListScreen;
