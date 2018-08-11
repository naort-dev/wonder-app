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
import { GeolocationReturnType, Alert, PermissionsAndroid, Platform } from 'react-native';
import { persistAppointmentData, AppointmentState } from '../../../store/reducers/appointment';

const mapState = (state: WonderAppState) => ({
  currentUser: state.user.profile,
  activities: state.chat.activities,
  details: state.chat.activity
});

const mapDispatch = (dispatch: Dispatch) => ({
  onGetActivities: (id: number) => dispatch(getPartnerActivities({ id })),
  onGetActivity: (id: string) => dispatch(getActivityDetails({ id })),
  onUpdateAppointment: (data: AppointmentState) => dispatch(persistAppointmentData(data)),
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
  onUpdateAppointment: (data: AppointmentState) => any;
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
    const { navigation, onGetActivities, clearActivity } = this.props;
    const partnerId: number = navigation.getParam('id', 0);
    onGetActivities(partnerId);
    clearActivity();
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Wonder would like your location',
          message: 'Use your location to find activities near you'
        }
      ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
      });
    } else {
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
  }

  updatePosition = (position: GeolocationReturnType) => {
    this.setState({
      position: {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      }
    });
  }

  onInviteMatch = () => {
    const { details, navigation, clearActivity, onUpdateAppointment } = this.props;
    clearActivity();

    onUpdateAppointment({ activity: details });
    navigation.navigate('AppointmentInvite');
  }

  renderMarker = (activity: Activity) => {
    const { onGetActivity, onUpdateAppointment } = this.props;
    const { name, latitude, longitude, location, topic, id } = activity;
    return (
      <MarkerContainer
        key={`${name} - ${latitude},${longitude}`}
        coordinate={{ latitude, longitude }}
      // onPress={() => onGetActivity(id)}
      >
        <Marker
          title={topic.name}
        />
        <Callout
          onPress={() => {
            onGetActivity(id);
            onUpdateAppointment({ topic: activity.topic });
          }}
        >
          <ActivityCallout
            activity={activity}
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
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
          rotateEnabled={false}
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
          onConfirm={this.onInviteMatch}
        />
      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(ActivityMapScreen);