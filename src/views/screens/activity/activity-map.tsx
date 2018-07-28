import React from 'react';
import Screen from '../../components/screen';
import MapView, { Marker as MarkerContainer, Callout } from 'react-native-maps';
import Marker from '../../components/map/marker';
import ActivityCallout from '../../components/map/activity-callout';
import Activity from '../../../types/activity';
import WonderAppState from '../../../types/wonder-app-state';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import User from '../../../types/user';
import { getPartnerActivities } from '../../../store/sagas/partner';
import { NavigationScreenProp, NavigationParams } from '../../../../node_modules/@types/react-navigation';

const GENEVA = {
  latitude: 41.8875,
  longitude: -88.3054,
};

const mapState = (state: WonderAppState) => ({
  currentUser: state.user.profile,
  activities: state.chat.activities
});
const mapDispatch = (dispatch: Dispatch) => ({
  onGetActivities: (id: number) => dispatch(getPartnerActivities({ id }))
});

interface Props {
  navigation: NavigationScreenProp<any, NavigationParams>;
  currentUser: User;
  activities: Activity[];
  onGetActivities: Function;
}

class ActivityMapScreen extends React.Component<Props> {
  componentWillMount() {
    const { navigation, onGetActivities } = this.props;
    const partnerId: number = navigation.getParam('id', 0);
    onGetActivities(partnerId);
  }

  renderMarker = (activity: Activity) => {
    const { name, latitude, longitude, location, topic } = activity;
    return (
      <MarkerContainer
        key={`${name} - ${latitude},${longitude}`}
        coordinate={{ latitude, longitude }}
      >
        <Marker title={topic.name} />
        <Callout>
          <ActivityCallout activity={activity} />
        </Callout>
      </MarkerContainer>
    );
  }

  render() {
    const { activities } = this.props;
    return (
      <Screen>
        <MapView
          // provider={PROVIDER_GOOGLE}
          // customMapStyle={MapTheme}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 41.8875,
            longitude: -88.3054,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {activities.map(this.renderMarker)}
        </MapView>
      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(ActivityMapScreen);