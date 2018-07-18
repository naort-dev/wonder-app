import React from 'react';
import { View } from 'react-native';
import Screen from '../../components/screen';
import ProposalSwiper from '../../components/proposal-swiper/proposal-swiper';
import Proposal from '../../../types/proposal';

const proposals: Proposal[] = [
  {
    user: {}
  }
];

class ProposalViewScreen extends React.Component {
  render() {
    return (
      <Screen>
        <ProposalSwiper
          proposals={proposals}
        />
      </Screen>
    )
  }
}

export default ProposalViewScreen;