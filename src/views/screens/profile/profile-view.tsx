import React from 'react';
import { View, StyleSheet } from 'react-native';
import Screen from '../../components/screen';
import ElevatedButton from '../../components/theme/elevated-button';
import { PrimaryButton, Text, Button, Title } from '../../components/theme';

interface Props {
  navigation: any;
}

class ProfileViewScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  }

  goTo = (key: string) => {
    const { navigation } = this.props;
    return () => navigation.navigate(key);
  }

  render() {
    return (
      <Screen horizontalPadding={20}>
        <View style={styles.row}>
          <View style={[styles.col, styles.heading]}>
            <Title style={{ textAlign: 'center' }}>{'Ben Condon'}</Title>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <ElevatedButton
              title="Filters"
              onPress={this.goTo('ProfileFilters')}
            />
          </View>
          <View style={styles.col}>
            <ElevatedButton
              title="Activities"
              onPress={() => { }}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <ElevatedButton
              title="Photos"
              onPress={() => { }}
            />
          </View>
          <View style={styles.col}>
            <ElevatedButton
              title="Contact"
              onPress={() => { }}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <ElevatedButton
              title="Notifications"
              onPress={this.goTo('ProfileNotifications')}
            />
          </View>
          <View style={styles.col}>
            <ElevatedButton
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
            <Button rounded title="Delete Account" />
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