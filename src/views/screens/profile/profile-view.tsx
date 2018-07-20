import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '../../components/screen';
import ElevatedButton from '../../components/theme/elevated-button';
import { PrimaryButton, Text, Button, Title } from '../../components/theme';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, NavigationParams>;
}

class ProfileViewScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  goTo = (key: string, params?: any) => {
    const { navigation } = this.props;
    return () => navigation.navigate(key);
  }

  render() {
    return (
      <Screen horizontalPadding={10}>
        <View style={styles.row}>
          <View style={[styles.col, styles.heading]}>
            <Title style={{ textAlign: 'center' }}>{'Ben Condon'}</Title>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <ElevatedButton
              fullWidth
              icon="user"
              title="Me"
              onPress={this.goTo('ProfileFilters')}
            />
          </View>
          <View style={styles.col}>
            <ElevatedButton
              icon="heart"
              title="Activities"
              onPress={() => { }}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <ElevatedButton
              icon="image"
              title="Photos"
              onPress={this.goTo('ProfileEdit', { media: 'camera', front: true })}
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
              onPress={() => { }}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <PrimaryButton
              title="UPGRADE TO WONDER PREMIUM"
              onPress={() => { }}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Button rounded title="Logout" />
          </View>
          <View style={styles.col}>
            <Button rounded title="Deactivate" />
          </View>
        </View>
      </Screen>
    )
  }
}

export default ProfileViewScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  col: {
    flex: 1,
    padding: 5
  },
  heading: {
    padding: 20
  }
});