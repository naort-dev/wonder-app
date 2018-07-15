import React from 'react';
import { View, StyleSheet, Platform, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, PrimaryButton, TextArea } from '../../components/theme';
import ShadowBox from '../../components/theme/shadow-box';
import Screen from '../../components/screen';
import Theme from '../../../assets/styles/theme';
import { MediaGrid, MediaGridItem } from '../../components/theme/media-grid';

interface Props {
  navigation: any;
}

interface State {

}

export default class Register3 extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'CREATE ACCOUNT',
    ...Theme.NavBar.transparent
  }

  onDateChange = (date: Date) => {
    alert(date)
  }

  render() {
    const { navigation } = this.props;

    return (
      <Screen horizontalPadding={20}>
        <ShadowBox>
          <MediaGrid

          />
          <TextArea
            label="About Me"
            placeholder={`Take this time to describe yourself, life experience, hobbies, and anything else that makes you wonderful.`}
          />
          <View style={{marginTop: 10}}>
            <PrimaryButton title="Next" onPress={() => navigation.navigate('Register4')} />
          </View>
        </ShadowBox>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});