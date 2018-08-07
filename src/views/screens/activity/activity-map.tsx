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
import { getPartnerActivities, getActivityDetails } from '../../../store/sagas/partner';
import { NavigationScreenProp, NavigationParams } from '../../../../node_modules/@types/react-navigation';
import ActivityDetailsModal from '../../components/modals/activity-details-modal';
import ActivityDetails from '../../../types/activity-details';
import { persistActivity } from '../../../store/reducers/chat';
import { GeolocationReturnType, Alert } from 'react-native';

const GENEVA = {
  latitude: 41.8875,
  longitude: -88.3054,
};

const mapState = (state: WonderAppState) => ({
  currentUser: state.user.profile,
  activities: state.chat.activities,
  details: state.chat.activity
});

const mapDispatch = (dispatch: Dispatch) => ({
  onGetActivities: (id: number) => dispatch(getPartnerActivities({ id })),
  onGetActivity: (id: string) => dispatch(getActivityDetails({ id })),
  clearActivity: () => dispatch(persistActivity(null))
});

interface Props {
  navigation: NavigationScreenProp<any, NavigationParams>;
  currentUser: User;
  activities: Activity[];
  details: ActivityDetails | null;
  onGetActivities: Function;
  onGetActivity: Function;
  clearActivity: Function;
}

interface State {
  position: any;
}

class ActivityMapScreen extends React.Component<Props, State> {
  state: State = {
    position: {
      lat: 0,
      lng: 0
    }
  };

  componentWillMount() {
    const { navigation, onGetActivities, clearActivity, currentUser } = this.props;
    const partnerId: number = navigation.getParam('id', 0);
    onGetActivities(partnerId);
    clearActivity();
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.updatePosition,
      (error) => Alert.alert(error.message),
      // { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );

    navigator.geolocation.watchPosition(
      this.updatePosition,
      (error) => alert(JSON.stringify(error))
    );
  }

  componentWillUnmount() {

  }

  updatePosition = (position: GeolocationReturnType) => {
    this.setState({
      position: {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      }
    });
  }

  renderMarker = (activity: Activity) => {
    const { onGetActivity } = this.props;
    const { name, latitude, longitude, location, topic, id } = activity;
    return (
      <MarkerContainer
        key={`${name} - ${latitude},${longitude}`}
        coordinate={{ latitude, longitude }}
      >
        <Marker title={topic.name} />
        <Callout>
          <ActivityCallout
            activity={activity}
            onPress={() => onGetActivity(id)}
          />
        </Callout>
      </MarkerContainer>
    );
  }

  render() {
    const { activities, details, clearActivity } = this.props;
    const { position } = this.state;
    return (
      <Screen>
        <MapView
          // provider={PROVIDER_GOOGLE}
          // customMapStyle={MapTheme}
          style={{ flex: 1 }}
          // initialRegion={{
          //   latitude: position.lat,
          //   longitude: position.lng,
          //   latitudeDelta: 0.05,
          //   longitudeDelta: 0.05,
          // }}
          region={{
            latitude: position.lat,
            longitude: position.lng,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
        >
          {activities.map(this.renderMarker)}
        </MapView>
        <ActivityDetailsModal
          onRequestClose={() => clearActivity()}
          details={details}
          onCancel={clearActivity}
          onConfirm={() => clearActivity()}
        />
      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(ActivityMapScreen);