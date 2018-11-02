import React from "react";
import { View } from "react-native";
import Screen from "src/views/components/screen";
import ProposalSwiper from "src/views/components/proposal-swiper/proposal-swiper";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getNewProposal, rateProposal } from "src/store/sagas/proposal";

import FoundMatchModal from "src/views/components/modals/found-match-modal";
import { persistCurrentMatch } from "src/store/reducers/wonder";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import { selectCurrentUser } from "src/store/selectors/user";
import WonderAppState from "src/models/wonder-app-state";
import Proposal from "src/models/proposal";
import User from "src/models/user";
import pushNotification from "../../../services/push-notification";
import { updateUser } from "../../../store/sagas/user";
import {
  getConversations,
  getConversation
} from "src/store/sagas/conversations";

const mapState = (state: WonderAppState) => ({
  currentUser: selectCurrentUser(state),
  proposal: state.wonder.proposal,
  currentMatch: state.wonder.currentMatch
});

const mapDispatch = (dispatch: Dispatch) => ({
  updatePushToken: (data: {
    push_device_id: string;
    push_device_type: string;
  }) => dispatch(updateUser(data)),
  onGetNewProposal: () => dispatch(getNewProposal()),
  onLeftSwipe: (proposal: Proposal) =>
    dispatch(rateProposal({ proposal, liked: false })),
  onRightSwipe: (proposal: Proposal) =>
    dispatch(rateProposal({ proposal, liked: true })),
  onClearCurrentMatch: () => dispatch(persistCurrentMatch({})),
  onRefreshConversations: () => dispatch(getConversations()),
  onGetConversation: (partnerId: number) =>
    dispatch(getConversation({ id: partnerId, successRoute: "Chat" })),
});

type Candidate = Partial<User>;

interface Props {
  navigation: NavigationScreenProp<any, NavigationParams>;
  onGetNewProposal: Function;
  onClearCurrentMatch: Function;
  onLeftSwipe: Function;
  onRightSwipe: Function;
  proposal: Proposal | null;
  currentUser: User;
  currentMatch: Proposal;
  onGetConversation: Function;
  onRefreshConversations: Function;
  updatePushToken: (
    data: {
      push_device_id: string;
      push_device_type: string;
    }
  ) => void;
}

interface State {
  candidate?: Candidate | null;
  isModalOpen: boolean;
}

class ProposalViewScreen extends React.Component<Props, State> {
  state: State = {
    candidate: null,
    isModalOpen: false
  };

  componentWillMount() {
    const { updatePushToken, currentUser } = this.props;
    // Get a new proposal if it has been voted for or if none exist
    if (!this.props.proposal || this.props.proposal.id) {
      this.props.onGetNewProposal();
      this.setCandidate(null);
    }

    if (pushNotification.token && !currentUser.push_device_id) {
      updatePushToken({
        push_device_id: pushNotification.token.token,
        push_device_type: pushNotification.token.os === "ios" ? "apns" : "fcm"
      });
    }
  }

  setCandidate = (candidate?: Candidate | null) => {
    this.setState({ candidate });
  }

  clearCandidate = () => {
    this.setState({ candidate: null });
  }

  clearCurrentMatch = () => {
    this.props.onClearCurrentMatch();
    this.props.onRefreshConversations();
  }

  goToChat = () => {
    const { onGetConversation, currentMatch } = this.props;
    this.props.onClearCurrentMatch();
    this.props.onRefreshConversations();
    onGetConversation(currentMatch.candidate.id);
  }

  render() {
    const {
      proposal,
      onLeftSwipe,
      onRightSwipe,
      currentMatch,
      currentUser
    } = this.props;

    return (
      <Screen>
        <View style={{ flex: 1 }}>
          <ProposalSwiper
            currentUser={currentUser}
            proposal={proposal}
            onSwipeRight={onRightSwipe}
            onSwipeLeft={onLeftSwipe}
          />
        </View>
        <FoundMatchModal
          currentUser={currentUser}
          onSuccess={this.goToChat}
          onRequestClose={this.clearCurrentMatch}
          visible={Object.keys(currentMatch).length > 0}
          proposal={currentMatch}
        />
      </Screen>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(ProposalViewScreen);
