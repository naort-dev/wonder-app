import _ from 'lodash';
import React from 'react';

import { View, StyleSheet, Alert, AlertButton, AlertOptions, Linking } from 'react-native';
import Screen from 'src/views/components/screen';
import ElevatedButton from 'src/views/components/theme/elevated-button';
import { PrimaryButton, Text, SecondaryButton as Button, Title } from 'src/views/components/theme';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { logoutUser, getUser, deactivateAccount } from 'src/store/sagas/user';
import Avatar, { AvatarSize } from 'src/views/components/theme/avatar';

import { selectCurrentUser, selectAuth } from 'src/store/selectors/user';
import User from 'src/models/user';
import TouchableOpacityOnPress from 'src/models/touchable-on-press';
import WonderAppState from 'src/models/wonder-app-state';
import { HTTP_DOMAIN } from "src/services/api";

interface AuthToken {
  uid: number;
  token: string;
}
interface Props {
  navigation: NavigationScreenProp<any, NavigationParams>;
  currentUser: User;
  onLogout: (id: number, token: string) => void;
  onRefreshProfile: () => void;
  deactivateUsersAccount: () => void;
  auth: AuthToken;
}

const mapState = (state: WonderAppState) => ({
  currentUser: selectCurrentUser(state),
  auth: selectAuth(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
  onLogout: (id: number, token: string) => dispatch(logoutUser({ id, token })),
  onRefreshProfile: () => dispatch(getUser()),
  deactivateUsersAccount: () => dispatch(deactivateAccount())
});

class ProfileViewScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    this.props.onRefreshProfile();
  }

  goTo = (key: string, params?: any) => {
    const { navigation } = this.props;
    return () => navigation.navigate(key);
  }

  getProfileImage = () => {
    const { currentUser } = this.props;
    if (currentUser.images && currentUser.images.length) {
      return currentUser.images[0].url;
    }
    return null;
  }
  deactivateAccount = () => {
    const { currentUser } = this.props;

    const options = [
      { text: 'Cancel' },
      { text: 'Yes', onPress: this.props.deactivateUsersAccount },
    ];

    Alert.alert('Confirm Deactivate Account', 'Are you sure you want to deactivate your account?', options);
  }

  showFaq = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert("Sorry! This link cannot be opened on your device");
      }
    });
  }

  promptLogout = () => {
    const { onLogout, auth } = this.props;
    const options = [
      { text: 'Cancel', onPress: _.noop },
      { text: 'Yes, Logout', onPress: () => onLogout(auth.uid, auth.token) },
    ];

    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', options);
  }

  render() {
    const { currentUser, onLogout } = this.props;
    return (
      <Screen horizontalPadding={10}>
        <View flex={1} style={styles.row}>
          <View style={[styles.col, styles.heading]}>
            <Avatar
              rounded
              uri={this.getProfileImage()}
              size={AvatarSize.md}
            />
          </View>
        </View>
        <View flex={1}>
          <View style={styles.row}>
            <View style={styles.col}>
              <ElevatedButton
                icon="user"
                title={currentUser.first_name}
                onPress={this.goTo('ProfileEdit')}
              />
            </View>
            <View style={styles.col}>
              <ElevatedButton
                icon="heart"
                title="Activities"
                onPress={this.goTo('ProfileWonders')}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <ElevatedButton
                icon="image"
                title="Photos"
                onPress={this.goTo('ProfileMedia')}
              />
            </View>
            <View style={styles.col}>
              <ElevatedButton
                icon="envelope-o"
                title="Contact"
                onPress={this.goTo('Feedback')}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <ElevatedButton
                icon="gear"
                title="Settings"
                onPress={this.goTo('ProfilePreferences')}
              />
            </View>
            <View style={styles.col}>
              <ElevatedButton
                icon="question"
                title="FAQ"
                onPress={() => this.showFaq(`${HTTP_DOMAIN}/faq.html`)}
              />
            </View>
          </View>
        </View>

        <View style={{ marginVertical: 10 }}>
          <View style={styles.row}>
            <PrimaryButton
              fullWidth
              title="UPGRADE TO WONDER PREMIUM"
              onPress={_.noop}
            />
          </View>
          <View style={styles.row}>

            <View style={styles.col}>
              <Button
                rounded
                title="Logout"
                onPress={this.promptLogout}
              />
            </View>
            <View style={styles.col}>
              <Button
                rounded
                title="Deactivate"
                onPress={this.deactivateAccount}
              />
            </View>
          </View>
        </View>
      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(ProfileViewScreen);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  col: {
    flex: 1,
    padding: 5,
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
