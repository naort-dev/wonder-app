import React from 'react';
import WonderAppState from "../../types/wonder-app-state";
import { Dispatch } from "redux";
import { connect } from 'react-redux';

const mapState = (state: WonderAppState) => ({
  token: state.user.auth.token
});

const mapDispatch = (dispatch: Dispatch) => ({

});

interface Props {
  navigation: any;
  token?: string;
}

class AppLoadingScreen extends React.Component<Props> {
  componentDidMount() {
    if (this.props.token) {
      this.props.navigation.navigate('Main');
      return;
    }
    this.props.navigation.navigate('onboarding');
  }
  render() {
    return null;
  }
}

export default connect(mapState, mapDispatch)(AppLoadingScreen);