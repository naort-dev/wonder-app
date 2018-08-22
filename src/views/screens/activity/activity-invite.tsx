import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import WonderAppState from 'src/types/wonder-app-state';
import Screen from 'src/views/components/screen';
import { selectCurrentUser } from 'src/store/selectors/user';

const mapState = (state: WonderAppState) => ({
  currentUser: selectCurrentUser(state)
});

const mapDispatch = (dispatch: Dispatch) => ({

});

class ActivityInviteScreen extends React.Component {
  render() {
    return (
      <Screen horizontalPadding={20}>

      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(ActivityInviteScreen);