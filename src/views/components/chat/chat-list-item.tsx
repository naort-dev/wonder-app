import React from 'react';
import { Text, Title, SmallText } from '../theme';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import TouchableOpacityOnPress from '../../../types/touchable-on-press';
import Conversation from '../../../types/conversation';
import Avatar from '../theme/avatar';
import theme from '../../../assets/styles/theme';

interface ChatListItemProps {
  chat: Conversation;
  onPress: TouchableOpacityOnPress;
}

class ChatListItem extends React.Component<ChatListItemProps> {

  render() {
    const { chat, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View flex={5}>
          <Avatar
            circle
            uri={(chat.partner.images && chat.partner.images.length) ? chat.partner.images[0].url : null}
          />
        </View>
        <View flex={10} style={styles.textContainer}>
          <Title style={{ color: '#000' }}>{chat.partner.first_name}</Title>
          <SmallText>{chat.messages[0] || 'No Messages'}</SmallText>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textColor,
    padding: 10,
    flexDirection: 'row',
  },
  textContainer: {
    justifyContent: 'space-between'
  }
});
