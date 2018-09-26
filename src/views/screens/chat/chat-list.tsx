import React from "react";
import Screen from "src/views/components/screen";
import { ChatList } from "src/views/components/chat";
import { Title } from "src/views/components/theme";
import { NavigationScreenProp, NavigationParams } from "react-navigation";

import { Dispatch } from "redux";
import {
  getConversations,
  getConversation
} from "src/store/sagas/conversations";

import { connect } from "react-redux";
import { selectCurrentUser } from "src/store/selectors/user";
import Conversation from "src/models/conversation";
import WonderAppState from "src/models/wonder-app-state";
import Chat from "src/models/chat";

interface Props {
  navigation: NavigationScreenProp<any, NavigationParams>;
  conversations: Conversation[];
  onRefreshConversations: () => void;
  onGetConversation: (partnerId: number) => void;
}

const mapState = (state: WonderAppState) => ({
  currentUser: selectCurrentUser(state),
  conversations: state.chat.conversations
});

const mapDispatch = (dispatch: Dispatch) => ({
  onRefreshConversations: () => dispatch(getConversations()),
  onGetConversation: (partnerId: number) =>
    dispatch(getConversation({ id: partnerId, successRoute: "Chat" }))
});

class ChatListScreen extends React.Component<Props> {
  componentWillMount() {
    this.props.onRefreshConversations();
    this.props.navigation.navigate('AppointmentInvite');
  }

  goToChat = (chat: Chat) => {
    const { navigation, onGetConversation } = this.props;
    onGetConversation(chat.partner.id);
  }

  render() {
    const { conversations, onRefreshConversations } = this.props;
    return (
      <Screen horizontalPadding={20}>
        <Title>Latest Matches</Title>
        <ChatList
          onRefresh={onRefreshConversations}
          chats={conversations}
          onPressChat={this.goToChat}
        />
      </Screen>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(ChatListScreen);
