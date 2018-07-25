import React from 'react';
import { View, Alert } from 'react-native';
import Screen from '../../components/screen';
import ProposalSwiper from '../../components/proposal-swiper/proposal-swiper';
import Proposal from '../../../types/proposal';
import WonderAppState from '../../../types/wonder-app-state';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getNewProposal, rateProposal } from '../../../store/sagas/proposal';
import User from '../../../types/user';
import ProfileModal from '../../components/modals/profile-modal';

const mapState = (state: WonderAppState) => ({
  proposal: state.wonder.proposal
});

const mapDispatch = (dispatch: Dispatch) => ({
  onGetNewProposal: () => dispatch(getNewProposal()),
  onLeftSwipe: (proposal: Proposal) => dispatch(rateProposal({ proposal, liked: false })),
  onRightSwipe: (proposal: Proposal) => dispatch(rateProposal({ proposal, liked: true }))
});

type Candidate = Partial<User>;

interface Props {
  onGetNewProposal: Function;
  onLeftSwipe: Function;
  onRightSwipe: Function;
  proposal: Proposal | null;
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

  setCandidate = (candidate?: Candidate | null) => {
    this.setState({ candidate });
  }

  clearCandidate = () => {
    this.setState({ candidate: null });
  }

  componentWillMount() {
    // Get a new proposal if it has been voted for or if none exist
    if (!this.props.proposal || this.props.proposal.id) {
      this.props.onGetNewProposal();
      this.setCandidate(null);
    }
  }

  render() {
    const { proposal, onLeftSwipe, onRightSwipe } = this.props;
    const { candidate, isModalOpen } = this.state;
    return (
      <Screen horizontalPadding={10}>
        <View style={{ flex: 1 }}>
          <ProposalSwiper
            proposal={proposal}
            onSwipeRight={onRightSwipe}
            onSwipeLeft={onLeftSwipe}
            onTap={this.setCandidate}
          />
        </View>
        <ProfileModal
          animationType="slide"
          visible={!!candidate}
          candidate={candidate}
          onCancel={this.clearCandidate}
          onRequestClose={this.clearCandidate}
        />
      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(ProposalViewScreen);