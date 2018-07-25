import React from 'react';
import { View } from 'react-native';
import Screen from '../../components/screen';
import ProposalSwiper from '../../components/proposal-swiper/proposal-swiper';
import Proposal from '../../../types/proposal';
import WonderAppState from '../../../types/wonder-app-state';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getNewProposal, rateProposal } from '../../../store/sagas/proposal';

const mapState = (state: WonderAppState) => ({
  proposal: state.wonder.proposal
});

const mapDispatch = (dispatch: Dispatch) => ({
  onGetNewProposal: () => dispatch(getNewProposal()),
  onLeftSwipe: (proposal: Proposal) => dispatch(rateProposal({ proposal, liked: false })),
  onRightSwipe: (proposal: Proposal) => dispatch(rateProposal({ proposal, liked: true }))
});

interface Props {
  onGetNewProposal: Function;
  onLeftSwipe: Function;
  onRightSwipe: Function;
  proposal: Proposal | null;
}

class ProposalViewScreen extends React.Component<Props> {
  componentWillMount() {
    if (!this.props.proposal) {
      this.props.onGetNewProposal();
    }
  }

  render() {
    const { proposal, onLeftSwipe, onRightSwipe } = this.props;
    return (
      <Screen>
        <ProposalSwiper
          proposal={proposal}
          onSwipeRight={onRightSwipe}
          onSwipeLeft={onLeftSwipe}
        />
      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(ProposalViewScreen);