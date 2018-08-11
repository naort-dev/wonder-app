import React from 'react';
import { NavigationScreenProp, NavigationParams } from '../../../../node_modules/@types/react-navigation';
import Screen from '../../components/screen';
import Chat from '../../../types/chat';
import theme from '../../../assets/styles/theme';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import ChatActionButton from '../../components/chat/chat-action-button';
import ChatMessage from '../../../types/chat-message';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import WonderAppState from '../../../types/wonder-app-state';
import User from '../../../types/user';
import { persistAppointmentData, AppointmentState } from '../../../store/reducers/appointment';

interface Props {
  navigation: NavigationScreenProp<any, NavigationParams>;
  currentUser: User;
  messages: ChatMessage[];
  onSendMessage: Function;
  onUpdateAppointment: Function;
}

interface State {
  messages: ChatMessage[];
}

const mapState = (state: WonderAppState) => ({
  currentUser: state.user.profile
});

const mapDispatch = (dispatch: Dispatch) => ({
  onSendMessage: (message: string) => { },
  onUpdateAppointment: (data: AppointmentState) =>
    dispatch(persistAppointmentData(data)),
  onScheduleWonder: (match: Partial<User>) => { }
});

class ChatScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<any, NavigationParams> }) => ({
    title: (navigation.getParam('chat') as Chat).partner ? (navigation.getParam('chat') as Chat).partner.first_name : 'Chat',
  })

  getChat(): Chat {
    const { navigation } = this.props;
    return (navigation.getParam('chat') as Chat);
  }

  componentWillMount() {
    const { currentUser } = this.props;
    this.setState({
      messages: [
        {
          _id: 7,
          text: `Chat started with ${this.getChat().partner.first_name}`,
          createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
          system: true,
          // Any additional custom parameters are passed through
        },
        {
          _id: 6,
          text: '1',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.getChat().partner.first_name || 'User',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 5,
          text: '2',
          createdAt: new Date(),
          user: {
            _id: currentUser.id,
            name: currentUser.first_name,
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 4,
          text: '3',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.getChat().partner.first_name || 'User',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 3,
          text: '4',
          createdAt: new Date(),
          user: {
            _id: currentUser.id,
            name: currentUser.first_name,
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: '5',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: this.getChat().partner.first_name || 'User',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 1,
          text: '6',
          createdAt: new Date(),
          user: {
            _id: currentUser.id,
            name: currentUser.first_name,
            avatar: 'https://placeimg.com/140/140/any',
          },
        }
      ],
    });
  }

  scheduleWonder = () => {
    const { onUpdateAppointment, navigation } = this.props;
    const partner = this.getChat().partner;
    onUpdateAppointment({ match: partner });
    navigation.navigate('WonderMap', { id: partner.id });
  }

  renderBubble(props: any) {
    return (
      <Bubble
        {...props}
        textStyle={bubbleTextStyle}
        wrapperStyle={bubbleWrapperStyle}
      />
    );
  }

  renderFooter = () => {
    return (
      <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center' }}>
        <View style={{ width: '50%' }}>
          <ChatActionButton
            title="Schedule Wonder"
            onPress={this.scheduleWonder}
          />
        </View>
      </View>
    );
  }

  render() {
    const { currentUser } = this.props;
    return (
      <Screen>
        <GiftedChat
          user={{ _id: currentUser.id }}
          renderBubble={this.renderBubble}
          messages={this.state.messages}
          renderFooter={this.renderFooter}
        />
      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(ChatScreen);
const bubbleTextStyle = StyleSheet.create({
  right: {
    color: '#000'
  },
  left: {
    color: '#FFF',
  }
});

const bubbleWrapperStyle = StyleSheet.create({
  right: {
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 1
    },
    backgroundColor: '#FFF',
  },
  left: {
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: 'blue',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: -3,
      height: 1
    },
    backgroundColor: theme.colors.primaryLight,
  },
});

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});
