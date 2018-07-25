import React from 'react';
import Screen from '../../components/screen';
import MapView, { Marker as MarkerContainer, Callout } from 'react-native-maps';
import Marker from '../../components/map/marker';
import ActivityCallout from '../../components/map/activity-callout';

import Activity from '../../../types/activity';
import MapTheme from '../../../assets/map-theme';

const GENEVA = {
  latitude: 41.8875,
  longitude: -88.3054,
};

class ActivityMapScreen extends React.Component {
  renderMarker = (activity: Activity) => {
    const { name, latitude, longitude, location } = activity;
    return (
      <MarkerContainer
        key={`${latitude},${longitude}`}
        coordinate={{ latitude, longitude }}
      >
        <Marker />
        <Callout>
          <ActivityCallout activity={activity} />
        </Callout>
      </MarkerContainer>
    );
  }

  render() {
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
          {/* {mockActivities.map(this.renderMarker)} */}
        </MapView>
      </Screen>
    );
  }
}

export default ActivityMapScreen;