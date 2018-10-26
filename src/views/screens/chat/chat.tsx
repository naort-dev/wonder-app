import React from "react";
import _ from 'lodash';
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import Screen from "src/views/components/screen";
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import ChatActionButton from "src/views/components/chat/chat-action-button";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  getConversation,
  ghostContact
} from "src/store/sagas/conversations";
import {
  blockUser
} from "src/store/sagas/partner";
import { getDecoratedConversation, decorateMessagesForGiftedChat } from "src/store/selectors/conversation";
import { selectCurrentUser } from "src/store/selectors/user";
import User from "src/models/user";
import {
  DecoratedConversation,
  ConversationNewMessage
} from "src/models/conversation";
import GiftedChatMessage from "src/models/chat-message";
import ChatGhostingModal from "../../components/modals/chat-ghosting-modal";
import WonderAppState from "src/models/wonder-app-state";
import ChatResponseMessage from "src/models/chat-response-message";
import {
  AppointmentState,
  persistAppointmentData
} from "src/store/reducers/appointment";
import { persistNewChatMessage, persistMessageAsRead, persistGhostMessage } from "src/store/reducers/chat";
import Assets from "src/assets/images";
import Topic from "src/models/topic";
import ImagePicker from 'react-native-image-picker';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Color from 'color';
import { Options, Response } from "../../../models/image-picker";
import { ImageSource } from "react-native-vector-icons/Icon";
import Wonder from "src/views/components/theme/wonder/wonder";
import { IconButton } from "src/views/components/theme";
import VideoPlayer from "react-native-video-player";
import theme from 'src/assets/styles/theme';
const { height } = Dimensions.get('window');

const gradient = [lighten(theme.colors.primaryLight, 0.5), lighten(theme.colors.primary, 0.5)];

function lighten(color: string, value: number) {
  return Color(color).fade(value).toString();
}

interface DispatchProps {
  onGetMessage: (userId: number) => void;
  onSendMessage: (chatMessage: ConversationNewMessage) => void;
  onUpdateAppointment: (data: AppointmentState) => void;
  onGhostContact: (data: User) => void;
  onReadMessages: (data: any) => void;
  onSendGhostMessage: (data: any) => void;
  onReportUser: (data: object) => void;
}

interface StateProps {
  currentUser: User;
  token: string | null;
  conversation: DecoratedConversation;
}

interface Props extends DispatchProps, StateProps {
  navigation: NavigationScreenProp<any, NavigationParams>;
}

interface ChatViewState {
  isGhostingModalOpen: boolean;
  selectedSendImage: ImageSource;
  conversationMessages: GiftedChatMessage[];
  profileModalOpen: boolean;
  showVideo: boolean;
}

const mapState = (state: WonderAppState): StateProps => ({
  token: state.user.auth.token,
  currentUser: selectCurrentUser(state),
  conversation: getDecoratedConversation(state),
});

const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
  onGetMessage: (userId: number) => dispatch(getConversation({ id: userId })),
  onUpdateAppointment: (data: AppointmentState) =>
    dispatch(persistAppointmentData(data)),
  onGhostContact: (data: User) => dispatch(ghostContact(data)),
  onSendMessage: (message: any) => dispatch(persistNewChatMessage(message)),
  onReadMessages: (data: object) => dispatch(persistMessageAsRead(data)),
  onSendGhostMessage: (data: object) => dispatch(persistGhostMessage(data)),
  onReportUser: (data: object) => dispatch(blockUser(data))
});

class ChatScreen extends React.Component<Props> {
  cable: any;
  appChat: any;

  static navigationOptions = ({
    navigation
  }: {
      navigation: NavigationScreenProp<any, NavigationParams>;
    }) => {
    return {
      title: navigation.getParam('title', 'Chat'),
      headerRight: (
        <View style={{ marginRight: 10 }}>
          <Menu>
            <MenuTrigger>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: 40 }}>
                <Icon name="ellipsis-v" size={20} color="#9292ad" />
              </View>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => navigation.state.params.openProfileModal()} >
                <Text style={{ fontSize: 16, color: 'black' }}>View profile</Text>
              </MenuOption>
              <MenuOption onSelect={() => navigation.state.params.onBlockConversation()} >
                <Text style={{ fontSize: 16, color: 'black' }}>Block and report</Text>
              </MenuOption>

              <MenuOption onSelect={() => navigation.state.params.onGhostPartner()} >
                <Text style={{ fontSize: 16, color: 'black' }}>Unmatch</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      )

    };
  }

  state: ChatViewState = {
    isGhostingModalOpen: false,
    selectedSendImage: '',
    conversationMessages: [],
    profileModalOpen: false,
    showVideo: false
  };

  componentWillMount() {
    const { conversation, navigation } = this.props;
    navigation.setParams(
      {
        title: conversation.partner.first_name,
        onGhostPartner: this.showAlert,
        onBlockConversation: this.showBlockAlert,
        openProfileModal: this.openProfileModal
      });

  }

  componentDidMount() {
    const { currentUser, conversation } = this.props;
    const chats = decorateMessagesForGiftedChat(currentUser, conversation);
    this.setState({ conversationMessages: chats.giftedChatMessages });
  }

  componentDidUpdate(prevProps: any) {
    const { currentUser, conversation } = this.props;
    if (conversation.messages &&
      conversation.messages.length !== prevProps.conversation.messages.length) {
      const chats = decorateMessagesForGiftedChat(currentUser, conversation);
      this.setState({ conversationMessages: chats.giftedChatMessages });
    }
  }

  componentWillUnmount() {
    const { currentUser, conversation } = this.props;
    if (this.appChat) {
      this.cable.subscriptions.remove(this.appChat);
    }
    this.props.onReadMessages({ user: currentUser.id, conversation_id: conversation.id });
  }

  scheduleWonder = () => {
    const { navigation, conversation, onUpdateAppointment } = this.props;
    onUpdateAppointment({ match: conversation.partner });
    navigation.navigate("WonderMap", { id: conversation.partner.id });
  }

  openGhostingModal = () => {
    this.setState({ isGhostingModalOpen: true });
  }

  closeGhostingModal = () => {
    this.setState({ isGhostingModalOpen: false });
  }

  openProfileModal = () => {
    this.setState({ profileModalOpen: !this.state.profileModalOpen });
  }

  showBlockAlert = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to remove this conversation?',
      [
        { text: 'Cancel' },
        { text: 'YES', onPress: this.blockPartner },
      ],
      { cancelable: false }
    );
  }

  // could refactor these two alerts
  showAlert = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to remove this conversation?',
      [
        { text: 'Cancel' },
        { text: 'YES', onPress: this.ghostPartner },
      ],
      { cancelable: false }
    );
  }

  onSend = (messages: ChatResponseMessage[] = []) => {
    const { conversation } = this.props;
    messages.forEach((message: ChatResponseMessage) => {
      this.props.onSendMessage(
        {
          message,
          recipient_id: conversation.partner.id,
          recipient: conversation.partner,
          sender: this.props.currentUser,
          conversation_id: this.props.conversation.id
        });
    });

    this.setState({ selectedSendImage: '' });
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

  renderSend = (props: any) => {
    return (
      <Send
        {...props}
      >
        <View style={{ marginRight: 12, marginBottom: 15 }}>
          <Icon name="paper-plane" size={20} color="#9292ad" />
        </View>
      </Send>
    );
  }

  renderActions = (props: any) => {
    return (
      <TouchableOpacity onPress={this.getImage}>
        <View style={{ marginLeft: 12, marginBottom: 15 }}>
          <Icon name="plus" size={20} color="#9292ad" />
        </View>
      </TouchableOpacity>
    );
  }

  getImage = () => {
    const options: Options = {
      title: 'Upload a Photo',
      mediaType: 'photo'
    };

    ImagePicker.showImagePicker(options, (res: Response) => {
      if (res.didCancel) {
        // console.log("User cancelled!");
      } else if (res.error) {
        // console.log("Error", res.error);
      } else {
        const source = { uri: res.uri.replace('file://', '') };
        this.setState({ selectedSendImage: source });
      }
    });
  }

  blockPartner = () => {
    const { conversation, navigation, onGhostContact } = this.props;

    this.props.onReportUser({ id: conversation.partner.id });
    this.props.onSendGhostMessage(
      { ghostMessage: '', conversation_id: conversation.id, partner: conversation.partner }
    );
    navigation.navigate("ChatList");
  }

  ghostPartner = (ghostMessage: string) => {
    const { navigation, onGhostContact, conversation } = this.props;

    this.props.onSendGhostMessage({ ghostMessage, conversation_id: conversation.id, partner: conversation.partner });
    onGhostContact({ partner: conversation.partner, message: ghostMessage });
    this.closeGhostingModal();
    navigation.navigate("ChatList");
  }

  getTopics = () => {
    const { currentUser, conversation } = this.props;
    const candidate = conversation.partner;
    const candidateTopics = candidate.topics || [];
    const userTopics = currentUser.topics;

    return (
      <View style={{ flexDirection: "row" }}>
        {candidate &&
          candidateTopics.map((x: Topic) => {
            if (userTopics) {
              const active: boolean = !!userTopics.find((i: Topic) => i.name === x.name);
              return (
                <Wonder key={x.name} topic={x} size={60} active={active} />
              );
            }
          })}
      </View>
    );
  }

  renderFooter = () => {
    return (
      <View
        style={{
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <View style={{ width: "50%" }} flexDirection={"row"}>
          <ChatActionButton
            title="Schedule Wonder"
            onPress={this.scheduleWonder}
          />
          <TouchableOpacity
            onPress={this.openGhostingModal}
            style={styles.ghostButtonStyle}
          >
            <Image
              source={Assets.GhostButton}
              style={{ width: 28, height: 32 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { currentUser, conversation } = this.props;
    const { partner } = conversation;

    return (
      <Screen>
        <GiftedChat
          renderAvatarOnTop
          user={{ _id: currentUser.id }}
          renderSend={this.renderSend}
          renderBubble={this.renderBubble}
          messages={this.state.conversationMessages}
          renderFooter={this.renderFooter}
          onSend={this.onSend}
          renderActions={this.renderActions}
          dateFormat={'LLL'}
          renderTime={() => null}
          onPressAvatar={this.openProfileModal}
        />
        <ChatGhostingModal
          visible={this.state.isGhostingModalOpen}
          onSuccess={this.ghostPartner}
          onCancel={this.closeGhostingModal}
          conversation={conversation}
        />
        <Modal
          transparent={true}
          animationType='fade'
          visible={this.state.profileModalOpen}
          onRequestClose={this.openProfileModal}
        >
          <LinearGradient
            colors={gradient}
            style={styles.modalContainer}
          >
            <View
              style={styles.modalInnerContainer}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.5)', 'transparent']}
                style={styles.topGradient}
              >
                <View style={styles.iconContainer} >
                  {partner.video ? <View>
                    {this.state.showVideo ? <IconButton
                      size={35}
                      icon={"camera"}
                      onPress={() => this.setState({ showVideo: false })}
                      primary={'#fff'}
                      secondary="transparent"
                    /> : <IconButton
                        size={35}
                        icon={"video-camera"}
                        onPress={() => this.setState({ showVideo: true })}
                        primary={'#fff'}
                        secondary="transparent"
                      />
                    }
                  </View> : <View />}
                  <IconButton
                    size={35}
                    icon={"close"}
                    onPress={this.openProfileModal}
                    primary={'#fff'}
                    secondary="transparent"
                  />
                </View>

              </LinearGradient>
              <View style={styles.scrollContainer}>
                <ScrollView >
                  {partner.video && this.state.showVideo ? <View style={styles.containerHeight}>
                    <VideoPlayer
                      customStyles={{ videoWrapper: styles.videoStyles }}
                      videoHeight={height / 3 * 2 * 4.5}
                      pauseOnPress={true}
                      disableFullscreen={true}
                      autoplay={true}
                      video={{
                        uri: `${partner.video}`
                      }}
                    />
                  </View> :
                    <View style={styles.imageContainer}>
                      {partner.images.map((i, index) => {
                        if (index === 0) {
                          return (
                            <ImageBackground
                              key={i.url}
                              style={styles.containerHeight}
                              source={{ uri: i.url }}
                            >
                              <LinearGradient
                                colors={['transparent', 'black']}
                                style={styles.imageTopGradient}
                              >
                                <Text allowFontScaling={false} style={styles.firstNameText}>
                                  {partner.first_name}, {partner.age}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  {this.getTopics()}
                                </View>
                              </LinearGradient>
                            </ImageBackground>
                          );
                        } else {
                          return (
                            <ImageBackground
                              key={i.url}
                              style={styles.regularImageStyles}
                              source={{ uri: i.url }}
                            />
                          );
                        }
                      })}
                    </View>}
                </ScrollView>
              </View>
            </View>
          </LinearGradient>
        </Modal>
      </Screen>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(ChatScreen);

const bubbleTextStyle = StyleSheet.create({
  right: {
    color: "#FFF",
    fontWeight: "bold"
  },
  left: {
    color: "#000",
    fontWeight: "bold"
  }
});

const bubbleWrapperStyle = StyleSheet.create({
  right: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "blue",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 3,
      height: 1
    },
    backgroundColor: '#fcb26a',
    marginVertical: 5
  },
  left: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: -3,
      height: 1
    },
    backgroundColor: "#FFF",
    marginVertical: 5
  }
});

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  ghostButtonStyle: {
    marginLeft: 20,
    marginTop: 2,
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center",
    width: 46,
    height: 46,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#fcbd77"
  },
  // BELOW THIS LINE = PROFILE MODAL STYLES
  modalContainer: {
    flex: 1,
    // marginLeft: 15,
    // marginRight: 15,
    justifyContent: 'flex-end',
    // marginBottom: 15,

  },
  modalInnerContainer: {
    position: 'relative', height: height / 3 * 2,
    borderRadius: 10, backgroundColor: '#f1f1f1',
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    padding: 5,
    zIndex: 999,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  iconContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  scrollContainer: { borderRadius: 10, overflow: 'hidden' },
  containerHeight: { height: height / 3 * 2, zIndex: 1 },
  imageContainer: { borderRadius: 10, overflow: 'hidden' },
  videoStyles: { backgroundColor: 'black', borderRadius: 10 },
  imageTopGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    padding: 10,
    zIndex: 999,
  },
  firstNameText: {
    fontSize: 26,
    color: '#fff',
    marginLeft: 10,
    marginBottom: 5
  },
  regularImageStyles: { height: height / 3 * 2, zIndex: 1 }
});
//  videoHeight={Platform.OS === 'ios' ? height / 3 * 2 * 4.5 : 1790}
